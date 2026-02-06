export function generateExplanation(topic: string, level: 'simple' | 'detailed' = 'simple'): string {
  if (level === 'simple') {
    return `Let me explain **${topic}** in simple terms:

I'd be happy to help you understand this topic! However, I need you to provide the specific content or concept you'd like me to explain.

**How I can help:**
• Break down complex ideas into simple language
• Use everyday examples
• Explain step-by-step
• Answer follow-up questions

Just share what you'd like to learn about, and I'll explain it clearly! 📚`;
  }

  return `Here's a detailed explanation of **${topic}**:

To give you a thorough explanation, I'll need more context about what specific aspect you'd like to explore.

**I can provide:**
• In-depth analysis with technical details
• Multiple perspectives on the topic
• Related concepts and connections
• Advanced examples and applications

Share more details, and I'll give you a comprehensive explanation! 🎓`;
}

export function generateExamPrepPlan(subject: string, daysUntilExam: number): string {
  if (daysUntilExam < 1) {
    return `**Last-Minute Exam Tips for ${subject}:**

• Review your notes and highlight key points
• Focus on topics you're least confident about
• Do practice questions if available
• Get good sleep tonight - rest is crucial!
• Stay calm and believe in your preparation

You've got this! 💪`;
  }

  const dailyHours = Math.min(4, Math.ceil(8 / daysUntilExam));
  
  return `**${daysUntilExam}-Day Exam Prep Plan for ${subject}:**

**Daily Study Schedule:**
• Study ${dailyHours} hours per day
• Take 10-minute breaks every hour
• Review previous day's material each morning

**Study Strategy:**
${daysUntilExam >= 7 ? '• Days 1-3: Review all topics and make notes\n• Days 4-5: Practice problems and past papers\n• Days 6-7: Focus on weak areas and final review' : ''}
${daysUntilExam >= 3 && daysUntilExam < 7 ? '• Day 1: Review main concepts\n• Day 2: Practice questions\n• Day 3+: Focus on difficult topics' : ''}
${daysUntilExam < 3 ? '• Focus on key concepts and formulas\n• Do quick practice questions\n• Review your notes thoroughly' : ''}

**Tips:**
• Stay hydrated and eat well
• Get 7-8 hours of sleep
• Don't cram - space out your study sessions
• Stay positive and confident!

Good luck with your preparation! 🌟`;
}

export function convertToNotes(content: string): string {
  if (!content || content.length < 50) {
    return `**Quick Notes:**

Please share the content you'd like me to convert into short notes. I'll help you create:

• Key points in bullet format
• Important concepts highlighted
• Easy-to-review summaries
• Organized by topic

Just paste the text, and I'll make it concise! 📝`;
  }

  // Simple note generation
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const keyPoints = sentences.slice(0, Math.min(5, sentences.length));

  return `**Key Notes:**

${keyPoints.map((point, i) => `${i + 1}. ${point.trim()}`).join('\n')}

*These are the main points from your content. Review them regularly for better retention!* 📚`;
}
