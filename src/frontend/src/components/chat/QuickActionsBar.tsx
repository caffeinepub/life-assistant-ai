import { Button } from '@/components/ui/button';
import { Calendar, CheckSquare, BookOpen, Briefcase, Heart, Wind, Droplets } from 'lucide-react';

type QuickActionsBarProps = {
  onActionClick: (prompt: string) => void;
};

export default function QuickActionsBar({ onActionClick }: QuickActionsBarProps) {
  const actions = [
    { icon: Calendar, label: 'Plan Day', prompt: 'Help me plan my day' },
    { icon: CheckSquare, label: 'Add Task', prompt: 'I want to add a task' },
    { icon: BookOpen, label: 'Study Help', prompt: 'I need help studying' },
    { icon: Briefcase, label: 'Work Help', prompt: 'Help me with work tasks' },
    { icon: Heart, label: 'Mood Check', prompt: 'I want to check in on my mood' },
    { icon: Wind, label: 'Breathe', prompt: 'Guide me through a breathing exercise' },
    { icon: Droplets, label: 'Hydration', prompt: 'Remind me about hydration' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action.prompt)}
            className="flex-shrink-0 gap-2"
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
