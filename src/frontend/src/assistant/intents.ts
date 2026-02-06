export type Intent =
  | 'plan_day'
  | 'add_task'
  | 'list_tasks'
  | 'end_of_day'
  | 'study_explain'
  | 'study_example'
  | 'study_summary'
  | 'study_exam_prep'
  | 'study_notes'
  | 'work_prioritize'
  | 'work_draft_email'
  | 'work_summarize_meeting'
  | 'work_focus_tips'
  | 'wellness_hydration'
  | 'wellness_sleep'
  | 'wellness_stress'
  | 'mood_checkin'
  | 'breathing_exercise'
  | 'affirmation'
  | 'venting'
  | 'general';

export function detectIntent(input: string): Intent {
  const lower = input.toLowerCase();

  // Daily planning
  if (lower.includes('plan') && (lower.includes('day') || lower.includes('schedule'))) return 'plan_day';
  if (lower.includes('add task') || lower.includes('create task') || lower.includes('new task')) return 'add_task';
  if (lower.includes('list task') || lower.includes('show task') || lower.includes('my task')) return 'list_tasks';
  if (lower.includes('end of day') || lower.includes('day summary')) return 'end_of_day';

  // Study
  if (lower.includes('explain') || lower.includes('what is') || lower.includes('how does')) return 'study_explain';
  if (lower.includes('example') && !lower.includes('email')) return 'study_example';
  if (lower.includes('summarize') || lower.includes('summary')) {
    if (lower.includes('meeting')) return 'work_summarize_meeting';
    return 'study_summary';
  }
  if (lower.includes('exam') || lower.includes('test prep') || lower.includes('revision')) return 'study_exam_prep';
  if (lower.includes('notes') || lower.includes('convert to notes')) return 'study_notes';

  // Work
  if (lower.includes('prioritize') || lower.includes('priority')) return 'work_prioritize';
  if (lower.includes('draft') || lower.includes('write email') || lower.includes('compose')) return 'work_draft_email';
  if (lower.includes('meeting') && lower.includes('note')) return 'work_summarize_meeting';
  if (lower.includes('focus') || lower.includes('time management') || lower.includes('pomodoro')) return 'work_focus_tips';

  // Wellness
  if (lower.includes('water') || lower.includes('hydration') || lower.includes('drink')) return 'wellness_hydration';
  if (lower.includes('sleep') || lower.includes('rest')) return 'wellness_sleep';
  if (lower.includes('stress') || lower.includes('anxious') || lower.includes('overwhelm')) return 'wellness_stress';

  // Emotional
  if (lower.includes('mood') || lower.includes('how am i') || lower.includes('feeling')) return 'mood_checkin';
  if (lower.includes('breath') || lower.includes('relax') || lower.includes('calm')) return 'breathing_exercise';
  if (lower.includes('affirmation') || lower.includes('motivate') || lower.includes('encourage')) return 'affirmation';
  if (lower.includes('vent') || lower.includes('talk') || lower.includes('listen')) return 'venting';

  return 'general';
}
