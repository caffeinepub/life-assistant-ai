import type { Task, OnboardingInfo } from '../backend';

export function generateDayPlan(tasks: Task[], onboardingInfo?: OnboardingInfo): string {
  const wakeTime = onboardingInfo?.preferences.wakeTime || 7n;
  const sleepTime = onboardingInfo?.preferences.sleepTime || 22n;
  
  const incompleteTasks = tasks.filter(t => !t.completed);
  
  if (incompleteTasks.length === 0) {
    return `Good news! You don't have any pending tasks right now. 

Here's a suggested schedule for today:

**Morning (${wakeTime}:00 - 12:00)**
• Start with a healthy breakfast
• Review your goals for the week
• Plan any new tasks you'd like to accomplish

**Afternoon (12:00 - 17:00)**
• Take breaks every hour
• Stay hydrated
• Focus on personal growth or hobbies

**Evening (17:00 - ${sleepTime}:00)**
• Wind down with relaxing activities
• Prepare for tomorrow
• Get good rest

Remember to take care of yourself! 🌟`;
  }

  const tasksPerBlock = Math.ceil(incompleteTasks.length / 3);
  const morningTasks = incompleteTasks.slice(0, tasksPerBlock);
  const afternoonTasks = incompleteTasks.slice(tasksPerBlock, tasksPerBlock * 2);
  const eveningTasks = incompleteTasks.slice(tasksPerBlock * 2);

  let plan = `Here's your personalized schedule for today:\n\n`;
  
  if (morningTasks.length > 0) {
    plan += `**Morning (${wakeTime}:00 - 12:00)**\n`;
    morningTasks.forEach(task => plan += `• ${task.title}\n`);
    plan += '\n';
  }
  
  if (afternoonTasks.length > 0) {
    plan += `**Afternoon (12:00 - 17:00)**\n`;
    afternoonTasks.forEach(task => plan += `• ${task.title}\n`);
    plan += '\n';
  }
  
  if (eveningTasks.length > 0) {
    plan += `**Evening (17:00 - ${sleepTime}:00)**\n`;
    eveningTasks.forEach(task => plan += `• ${task.title}\n`);
    plan += '\n';
  }

  plan += `**Tips:**\n• Take 5-minute breaks between tasks\n• Stay hydrated throughout the day\n• Don't forget to eat regular meals\n\nYou've got this! 💪`;

  return plan;
}

export function generateEndOfDaySummary(tasks: Task[]): string {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const pending = total - completed;

  let summary = `## End of Day Summary\n\n`;
  
  if (total === 0) {
    summary += `You didn't have any tasks scheduled today. That's okay! Rest is important too. 🌙\n\n`;
  } else if (completed === total) {
    summary += `🎉 Amazing! You completed all ${total} tasks today!\n\n`;
  } else if (completed > 0) {
    summary += `Great work! You completed ${completed} out of ${total} tasks.\n`;
    if (pending > 0) {
      summary += `${pending} task${pending > 1 ? 's' : ''} remaining - you can tackle ${pending > 1 ? 'them' : 'it'} tomorrow!\n\n`;
    }
  } else {
    summary += `You had ${total} tasks today. Tomorrow is a fresh start! 🌅\n\n`;
  }

  const motivations = [
    "Every day is progress, no matter how small. Be proud of yourself!",
    "You showed up today, and that's what matters. Rest well!",
    "Tomorrow brings new opportunities. Sleep well and recharge!",
    "You're doing your best, and that's enough. Sweet dreams!",
    "Celebrate your efforts today. You deserve rest!",
  ];

  summary += `**${motivations[Math.floor(Math.random() * motivations.length)]}**`;

  return summary;
}
