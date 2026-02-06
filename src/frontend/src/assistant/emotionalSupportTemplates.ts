import { addEmotionalSupportDisclaimer } from './safetyGuardrails';

export function generateAffirmation(): string {
  const affirmations = [
    "You are capable of amazing things. Believe in yourself! 💫",
    "Every small step forward is progress. Be proud of yourself! 🌟",
    "You are stronger than you think. Keep going! 💪",
    "Your efforts matter, even when results aren't immediate. Stay patient! 🌱",
    "You deserve kindness, especially from yourself. Be gentle! 💝",
    "Challenges help you grow. You're becoming stronger every day! 🌈",
    "You are enough, exactly as you are. Remember that! ✨",
    "Your journey is unique. Don't compare yourself to others! 🦋",
    "You have overcome difficulties before. You can do it again! 🌄",
    "Taking care of yourself isn't selfish - it's necessary! 🌸",
  ];

  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

export function generateVentingResponse(userInput: string): string {
  const responses = [
    `I hear you, and what you're feeling is valid. It's okay to feel this way.

Sometimes life can be overwhelming, and it's important to acknowledge your feelings. You're not alone in this.

**Things that might help:**
• Take a few deep breaths
• Talk to someone you trust
• Do something small that brings you comfort
• Remember that feelings pass, even difficult ones

I'm here to listen. Would you like to talk more about it, or would you prefer some calming exercises?`,

    `Thank you for sharing this with me. It takes courage to express how you're feeling.

Your feelings are important and deserve to be heard. It's completely normal to have difficult moments.

**Gentle reminders:**
• Be kind to yourself right now
• You don't have to have everything figured out
• It's okay to ask for help
• This feeling won't last forever

Is there anything specific I can help you with right now?`,

    `I'm listening, and I want you to know that your feelings matter.

Life can be really challenging sometimes, and it's okay to not be okay. You're doing your best, and that's enough.

**You might find it helpful to:**
• Write down your thoughts
• Take a short walk or stretch
• Listen to calming music
• Reach out to a friend or family member

Would you like to try a breathing exercise, or would you prefer to talk more?`,
  ];

  const response = responses[Math.floor(Math.random() * responses.length)];
  return addEmotionalSupportDisclaimer(response);
}

export function generateMoodCheckInPrompt(): string {
  return `**How are you feeling today?**

Rate your mood from 1-5:
• 1 - Very difficult
• 2 - Struggling
• 3 - Okay
• 4 - Good
• 5 - Great

You can also share what's on your mind. I'm here to listen and support you! 💙`;
}

export function generateMoodResponse(rating: number): string {
  if (rating <= 2) {
    return addEmotionalSupportDisclaimer(`I'm sorry you're having a tough time. Your feelings are valid, and it's okay to not be okay.

**Gentle suggestions:**
• Take things one moment at a time
• Be extra kind to yourself today
• Reach out to someone you trust
• Consider talking to a counselor if feelings persist

**Immediate comfort:**
• Try a breathing exercise (I can guide you)
• Do something small that usually brings you comfort
• Remember: This feeling is temporary

Would you like to try a calming exercise, or would you prefer to talk more? I'm here for you. 💙`);
  }

  if (rating === 3) {
    return `You're doing okay, and that's perfectly fine! Not every day has to be amazing.

**To help your day:**
• Acknowledge what you've accomplished so far
• Take short breaks when needed
• Stay hydrated and nourished
• Be gentle with yourself

Is there anything specific I can help you with today? 🌟`;
  }

  return `That's wonderful! I'm glad you're feeling ${rating === 5 ? 'great' : 'good'} today! 🌈

**Keep the positive momentum:**
• Celebrate this feeling
• Share your good mood with others
• Take note of what's working well
• Use this energy for things that matter to you

What would you like to focus on today? ✨`;
}
