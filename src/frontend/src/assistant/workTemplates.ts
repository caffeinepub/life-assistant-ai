export function generatePrioritizationAdvice(tasks: string[]): string {
  if (tasks.length === 0) {
    return `**Task Prioritization Guide:**

To help you prioritize, I'll need your task list. Once you share it, I'll help you organize using:

**Eisenhower Matrix:**
• Urgent & Important → Do first
• Important but not urgent → Schedule
• Urgent but not important → Delegate if possible
• Neither → Consider removing

Share your tasks, and I'll help you prioritize! 📋`;
  }

  return `**Your Prioritized Task List:**

**High Priority (Do First):**
${tasks.slice(0, Math.ceil(tasks.length / 3)).map((t, i) => `${i + 1}. ${t}`).join('\n')}

**Medium Priority (Schedule):**
${tasks.slice(Math.ceil(tasks.length / 3), Math.ceil(tasks.length * 2 / 3)).map((t, i) => `${i + 1}. ${t}`).join('\n')}

**Lower Priority (When time allows):**
${tasks.slice(Math.ceil(tasks.length * 2 / 3)).map((t, i) => `${i + 1}. ${t}`).join('\n')}

**Tips:**
• Focus on one task at a time
• Break large tasks into smaller steps
• Celebrate completing each item!

You've got this! 💼`;
}

export function generateEmailDraft(context?: { recipient?: string; purpose?: string; tone?: string }): string {
  if (!context?.recipient || !context?.purpose) {
    return `**Email Drafting Assistant:**

To help you draft an email, I need a few details:

• **Who is the recipient?** (colleague, client, professor, etc.)
• **What's the purpose?** (request, update, thank you, etc.)
• **What tone?** (formal, friendly, professional)
• **Key points to include?**

Share these details, and I'll draft a clear email for you! ✉️`;
  }

  const { recipient, purpose, tone = 'professional' } = context;

  return `**Email Draft:**

Subject: [Your Subject Here]

Dear ${recipient},

[Opening greeting based on ${tone} tone]

[Main content addressing: ${purpose}]

[Closing with appropriate sign-off]

Best regards,
[Your Name]

---

*Feel free to customize this draft to match your style!* ✉️`;
}

export function generateFocusTips(): string {
  return `**Focus & Time Management Tips:**

**Pomodoro Technique:**
• Work for 25 minutes
• Take a 5-minute break
• After 4 sessions, take a 15-30 minute break

**Time Blocking:**
• Assign specific time slots to tasks
• Protect your focus time
• Schedule breaks between blocks

**Minimize Distractions:**
• Turn off notifications
• Use website blockers if needed
• Keep your workspace organized
• Let others know you're in focus mode

**Energy Management:**
• Do difficult tasks when you're most alert
• Take regular breaks to recharge
• Stay hydrated and eat well
• Get enough sleep

**Quick Wins:**
• Start with a small, easy task to build momentum
• Break large projects into smaller steps
• Celebrate progress along the way

You're capable of great focus! 🎯`;
}

export function summarizeMeetingNotes(notes: string): string {
  if (!notes || notes.length < 50) {
    return `**Meeting Notes Summarizer:**

Paste your meeting notes here, and I'll help you create:

• Key discussion points
• Decisions made
• Action items with owners
• Follow-up needed

Share your notes, and I'll organize them! 📝`;
  }

  return `**Meeting Summary:**

**Key Points:**
• [Main discussion topics from your notes]
• [Important decisions]
• [Agreements reached]

**Action Items:**
• [Task 1] - [Owner]
• [Task 2] - [Owner]
• [Task 3] - [Owner]

**Follow-up:**
• [Next steps]
• [Deadlines]

*Review and adjust based on your specific meeting content!* 📋`;
}
