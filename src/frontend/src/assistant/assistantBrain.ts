import { detectIntent } from './intents';
import { checkForHighRiskInput, addWellnessDisclaimer } from './safetyGuardrails';
import { generateDayPlan, generateEndOfDaySummary } from './planningTemplates';
import { generateExplanation, generateExamPrepPlan, convertToNotes } from './studyTemplates';
import { generatePrioritizationAdvice, generateEmailDraft, generateFocusTips, summarizeMeetingNotes } from './workTemplates';
import { generateAffirmation, generateVentingResponse, generateMoodCheckInPrompt, generateMoodResponse } from './emotionalSupportTemplates';
import { addEncouragement } from './styleGuide';
import type { Task, OnboardingInfo } from '../backend';

export type AssistantContext = {
  tasks?: Task[];
  onboardingInfo?: OnboardingInfo;
  recentMood?: number;
};

export function generateAssistantResponse(userInput: string, context: AssistantContext = {}): string {
  // First, check for high-risk inputs
  const safetyCheck = checkForHighRiskInput(userInput);
  if (safetyCheck.isHighRisk && safetyCheck.response) {
    return safetyCheck.response;
  }

  const intent = detectIntent(userInput);
  const { tasks = [], onboardingInfo, recentMood } = context;

  // Personalize greeting based on role
  const userName = onboardingInfo?.preferredName || 'friend';
  const role = onboardingInfo?.role;

  switch (intent) {
    case 'plan_day':
      return generateDayPlan(tasks, onboardingInfo);

    case 'add_task':
      return `I can help you add a task! 

Please use the "Add Task" button in the Today section, or tell me what task you'd like to add, and I'll guide you through it.

What would you like to accomplish? 📝`;

    case 'list_tasks':
      if (tasks.length === 0) {
        return `You don't have any tasks yet, ${userName}! 

Ready to add some? Head to the Today section to get started. ${addEncouragement()}`;
      }
      const incompleteTasks = tasks.filter(t => !t.completed);
      const completedTasks = tasks.filter(t => t.completed);
      
      let taskList = `**Your Tasks:**\n\n`;
      if (incompleteTasks.length > 0) {
        taskList += `**To Do (${incompleteTasks.length}):**\n`;
        incompleteTasks.forEach(t => taskList += `• ${t.title}\n`);
        taskList += '\n';
      }
      if (completedTasks.length > 0) {
        taskList += `**Completed (${completedTasks.length}):**\n`;
        completedTasks.forEach(t => taskList += `✓ ${t.title}\n`);
      }
      return taskList + `\n${addEncouragement()}`;

    case 'end_of_day':
      return generateEndOfDaySummary(tasks);

    case 'study_explain':
      return generateExplanation(userInput);

    case 'study_example':
      return `I'd love to give you examples! 

What topic would you like examples for? The more specific you are, the better I can help.

For instance:
• "Give me examples of photosynthesis"
• "Show me examples of metaphors"
• "Examples of Newton's laws in daily life"

What would you like to explore? 📚`;

    case 'study_exam_prep':
      return `**Exam Preparation Helper**

To create a personalized study plan, I need:
• What subject/topic is the exam on?
• How many days until the exam?
• What areas do you find most challenging?

Share these details, and I'll create a focused study plan for you! 🎓`;

    case 'study_notes':
      return convertToNotes(userInput);

    case 'work_prioritize':
      return generatePrioritizationAdvice([]);

    case 'work_draft_email':
      return generateEmailDraft();

    case 'work_summarize_meeting':
      return summarizeMeetingNotes(userInput);

    case 'work_focus_tips':
      return generateFocusTips();

    case 'wellness_hydration':
      return addWellnessDisclaimer(`**Hydration Reminder** 💧

Staying hydrated is essential for your health and energy!

**Daily Goal:** 8 glasses (about 2 liters) of water

**Tips:**
• Keep a water bottle nearby
• Drink a glass when you wake up
• Have water with each meal
• Set hourly reminders
• Track your intake in the Wellness section

**Signs you need more water:**
• Feeling tired or sluggish
• Dry mouth or lips
• Dark yellow urine
• Headaches

You can log your hydration in the Wellness section! Stay refreshed! 💧`);

    case 'wellness_sleep':
      return addWellnessDisclaimer(`**Sleep & Rest Guide** 😴

Quality sleep is crucial for your well-being!

**Recommended:** 7-9 hours per night

**Better Sleep Tips:**
• Keep a consistent sleep schedule
• Avoid screens 1 hour before bed
• Keep your bedroom cool and dark
• Avoid caffeine after 2 PM
• Wind down with calming activities

**Bedtime Routine Ideas:**
• Light reading
• Gentle stretching
• Meditation or breathing exercises
• Warm (not hot) shower

Track your sleep in the Wellness section to see patterns! Sweet dreams! 🌙`);

    case 'wellness_stress':
      return addWellnessDisclaimer(`**Stress Management Tips** 🌿

Feeling stressed is normal, but you can manage it!

**Quick Relief:**
• Take 5 deep breaths
• Step outside for fresh air
• Stretch your body
• Listen to calming music

**Long-term Strategies:**
• Regular exercise (even 10-minute walks help)
• Talk to someone you trust
• Practice saying "no" to extra commitments
• Break big problems into smaller steps
• Schedule time for activities you enjoy

**When to Seek Help:**
If stress is overwhelming or lasting for weeks, please talk to a counselor or doctor. You deserve support!

Would you like to try a breathing exercise? 🌸`);

    case 'mood_checkin':
      return generateMoodCheckInPrompt();

    case 'breathing_exercise':
      return `**Guided Breathing Exercise** 🌬️

Let's take a moment to breathe and relax together.

I'll guide you through a simple 4-7-8 breathing technique:

**Instructions:**
1. Breathe in through your nose for 4 seconds
2. Hold your breath for 7 seconds
3. Breathe out through your mouth for 8 seconds
4. Repeat 3-4 times

**Benefits:**
• Reduces anxiety
• Calms your nervous system
• Helps you feel centered
• Improves focus

Click the "Start Breathing Exercise" button in the Wellness section for a guided timer!

Take your time, and be gentle with yourself. 🌸`;

    case 'affirmation':
      return generateAffirmation();

    case 'venting':
      return generateVentingResponse(userInput);

    case 'general':
    default:
      const greeting = role === 'student' ? 'fellow learner' :
                      role === 'professional' ? 'professional' :
                      role === 'homemaker' ? 'friend' :
                      role === 'elder' ? 'friend' : userName;

      return `Hello ${greeting}! 👋

I'm here to help you with:

**Daily Life:**
• Plan your day
• Manage tasks and reminders
• End-of-day summaries

**Study & Learning:**
• Explain topics simply
• Create study plans
• Make notes from long content

**Work & Productivity:**
• Prioritize tasks
• Draft emails
• Focus tips

**Wellness & Mood:**
• Track hydration and sleep
• Stress management
• Mood check-ins
• Breathing exercises

What would you like help with today? Just ask, or use the quick action buttons below! 🌟`;
  }
}
