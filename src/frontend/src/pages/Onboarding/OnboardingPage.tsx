import { useState } from 'react';
import { useSubmitOnboardingInfo } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import type { UserRoleSetting } from '../../backend';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRoleSetting | ''>('');
  const [preferredName, setPreferredName] = useState('');
  const [wakeTime, setWakeTime] = useState('7');
  const [sleepTime, setSleepTime] = useState('22');
  const [reminderFrequency, setReminderFrequency] = useState('60');
  const [goals, setGoals] = useState('');

  const submitOnboarding = useSubmitOnboardingInfo();

  const handleSubmit = async () => {
    if (!role) {
      toast.error('Please select your role');
      return;
    }

    const goalsArray = goals.split(',').map(g => g.trim()).filter(g => g.length > 0);

    try {
      await submitOnboarding.mutateAsync({
        role: role as UserRoleSetting,
        preferredName: preferredName || undefined,
        preferences: {
          wakeTime: BigInt(parseInt(wakeTime)),
          sleepTime: BigInt(parseInt(sleepTime)),
          reminderFrequency: BigInt(parseInt(reminderFrequency)),
          goals: goalsArray,
        },
      });
      toast.success('Welcome! Let\'s get started! 🎉');
    } catch (error) {
      toast.error('Failed to save your preferences. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <img 
            src="/assets/generated/life-assistant-ai-hero.dim_1600x900.png" 
            alt="Welcome" 
            className="w-full max-w-md mx-auto mb-6 rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold mb-2">Welcome to Life Assistant AI! 🌟</h1>
          <p className="text-muted-foreground">Let's personalize your experience</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Step {step} of 2</CardTitle>
            <CardDescription>
              {step === 1 ? 'Tell us about yourself' : 'Set your preferences'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="role">What best describes you? *</Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRoleSetting)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="professional">Working Professional</SelectItem>
                      <SelectItem value="homemaker">Homemaker</SelectItem>
                      <SelectItem value="elder">Elder</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">What should I call you? (Optional)</Label>
                  <Input
                    id="name"
                    placeholder="Your preferred name"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                  />
                </div>

                <Button onClick={() => setStep(2)} disabled={!role} className="w-full">
                  Continue
                </Button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wake">Wake Time (Hour)</Label>
                    <Input
                      id="wake"
                      type="number"
                      min="0"
                      max="23"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sleep">Sleep Time (Hour)</Label>
                    <Input
                      id="sleep"
                      type="number"
                      min="0"
                      max="23"
                      value={sleepTime}
                      onChange={(e) => setSleepTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder">Reminder Frequency (minutes)</Label>
                  <Input
                    id="reminder"
                    type="number"
                    min="15"
                    max="240"
                    value={reminderFrequency}
                    onChange={(e) => setReminderFrequency(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">How often should I remind you about tasks?</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Your Goals (Optional)</Label>
                  <Input
                    id="goals"
                    placeholder="e.g., Stay healthy, Learn new skills, Be productive"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple goals with commas</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={submitOnboarding.isPending}
                    className="flex-1"
                  >
                    {submitOnboarding.isPending ? 'Saving...' : 'Get Started! 🚀'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
