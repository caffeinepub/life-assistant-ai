import { useGetMoodEntries, useGetWellnessEntries, useGetTasks } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Droplets, Moon, CheckSquare } from 'lucide-react';
import { FadeIn, SlideIn } from '../../components/animation/MicroMotion';

export default function HistoryPage() {
  const { data: moodEntries = [] } = useGetMoodEntries();
  const { data: wellnessEntries = [] } = useGetWellnessEntries();
  const { data: tasks = [] } = useGetTasks();

  const completedTasks = tasks.filter(t => t.completed);
  const recentMoods = moodEntries.slice(-7).reverse();
  const recentWellness = wellnessEntries.slice(-7).reverse();

  const avgMood = recentMoods.length > 0
    ? (recentMoods.reduce((sum, entry) => sum + Number(entry.rating), 0) / recentMoods.length).toFixed(1)
    : 'N/A';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-bold mb-1">History & Insights</h2>
          <p className="text-muted-foreground text-sm">
            Review your progress and patterns
          </p>
        </div>
      </FadeIn>

      <SlideIn delay={100}>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                Avg Mood (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgMood}</div>
              <p className="text-xs text-muted-foreground mt-1">out of 5</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-green-500" />
                Tasks Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedTasks.length}</div>
              <p className="text-xs text-muted-foreground mt-1">total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                Wellness Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{wellnessEntries.length}</div>
              <p className="text-xs text-muted-foreground mt-1">entries</p>
            </CardContent>
          </Card>
        </div>
      </SlideIn>

      <SlideIn delay={200}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Mood Trends</CardTitle>
            <CardDescription>Your mood check-ins over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            {recentMoods.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No mood data yet. Start tracking in the Wellness section! 💙
              </p>
            ) : (
              <div className="space-y-3">
                {recentMoods.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">
                      {new Date(Number(entry.timestamp) / 1000000).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Heart
                          key={j}
                          className={`h-4 w-4 ${
                            j < Number(entry.rating)
                              ? 'fill-rose-500 text-rose-500'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </SlideIn>

      <SlideIn delay={300}>
        <Card>
          <CardHeader>
            <CardTitle>Recent Wellness Logs</CardTitle>
            <CardDescription>Your hydration and sleep tracking</CardDescription>
          </CardHeader>
          <CardContent>
            {recentWellness.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No wellness data yet. Start logging in the Wellness section! 💧
              </p>
            ) : (
              <div className="space-y-2">
                {recentWellness.map((entry, i) => (
                  <div key={i} className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      {entry.hydration.toString()} glasses
                    </span>
                    <span className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-purple-500" />
                      {entry.sleepHours.toString()}h sleep
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </SlideIn>
    </div>
  );
}
