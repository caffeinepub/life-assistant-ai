import { useState } from 'react';
import { useGetTasks, useCreateTask, useCompleteTask, useGetCallerUserProfile } from '../../hooks/useQueries';
import { generateDayPlan, generateEndOfDaySummary } from '../../assistant/planningTemplates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Calendar, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { FadeIn, SlideIn } from '../../components/animation/MicroMotion';

export default function TodayPage() {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showPlan, setShowPlan] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const { data: tasks = [], isLoading } = useGetTasks();
  const { data: userProfile } = useGetCallerUserProfile();
  const createTask = useCreateTask();
  const completeTask = useCompleteTask();

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    try {
      await createTask.mutateAsync(newTaskTitle);
      setNewTaskTitle('');
      toast.success('Task added! 🎯');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleToggleTask = async (taskId: bigint, completed: boolean) => {
    if (completed) return; // Already completed
    
    try {
      await completeTask.mutateAsync(taskId);
      toast.success('Great job! ✨');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const dayPlan = generateDayPlan(tasks, userProfile?.onboardingInfo);
  const daySummary = generateEndOfDaySummary(tasks);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-bold mb-1">Today's Tasks</h2>
          <p className="text-muted-foreground text-sm">
            Manage your daily to-do list and stay organized
          </p>
        </div>
      </FadeIn>

      <SlideIn delay={100}>
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>What would you like to accomplish today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="Enter task title..."
                className="flex-1"
              />
              <Button onClick={handleAddTask} disabled={createTask.isPending}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </SlideIn>

      <SlideIn delay={200}>
        <Card>
          <CardHeader>
            <CardTitle>Your Tasks ({incompleteTasks.length} pending)</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No tasks yet. Add your first task above! 🎯
              </p>
            ) : (
              <div className="space-y-4">
                {incompleteTasks.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">To Do</h4>
                    {incompleteTasks.map((task) => (
                      <div key={task.id.toString()} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task.id, task.completed)}
                        />
                        <span className="flex-1">{task.title}</span>
                      </div>
                    ))}
                  </div>
                )}

                {completedTasks.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Completed</h4>
                    {completedTasks.map((task) => (
                      <div key={task.id.toString()} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <Checkbox checked={true} disabled />
                        <span className="flex-1 line-through text-muted-foreground">{task.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </SlideIn>

      <SlideIn delay={300}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Day Plan
              </CardTitle>
              <CardDescription>Get a suggested schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowPlan(!showPlan)} variant="outline" className="w-full">
                {showPlan ? 'Hide Plan' : 'Generate Plan'}
              </Button>
              {showPlan && (
                <div className="mt-4 p-4 bg-muted rounded-lg whitespace-pre-wrap text-sm">
                  {dayPlan}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5" />
                End of Day
              </CardTitle>
              <CardDescription>Review your progress and get motivated</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowSummary(!showSummary)} variant="outline" className="w-full">
                {showSummary ? 'Hide Summary' : 'View Summary'}
              </Button>
              {showSummary && (
                <div className="mt-4 p-4 bg-muted rounded-lg whitespace-pre-wrap text-sm">
                  {daySummary}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SlideIn>
    </div>
  );
}
