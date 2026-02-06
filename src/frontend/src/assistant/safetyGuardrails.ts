export function checkForHighRiskInput(input: string): { isHighRisk: boolean; response?: string } {
  const lower = input.toLowerCase();

  // Crisis keywords
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
    'self harm', 'hurt myself', 'cut myself',
    'chest pain', 'heart attack', 'can\'t breathe', 'severe pain',
    'heavy bleeding', 'overdose', 'poisoning'
  ];

  for (const keyword of crisisKeywords) {
    if (lower.includes(keyword)) {
      return {
        isHighRisk: true,
        response: `I'm really concerned about what you're sharing. Please reach out for immediate help:

**Emergency Services:** Call 911 (or your local emergency number)
**Crisis Hotline:** 988 (Suicide & Crisis Lifeline - US)
**Crisis Text Line:** Text HOME to 741741

You deserve support from trained professionals who can help you right now. Please don't wait - reach out immediately.

I'm here to support you with daily life tasks, but this situation needs professional care. Your safety matters.`
      };
    }
  }

  return { isHighRisk: false };
}

export function addWellnessDisclaimer(response: string): string {
  return `${response}

*Note: I'm not a medical professional. This is general wellness guidance only. For health concerns, please consult a doctor.*`;
}

export function addEmotionalSupportDisclaimer(response: string): string {
  return `${response}

*I'm here to listen and support you, but I'm not a therapist. For ongoing mental health support, consider speaking with a professional counselor.*`;
}
