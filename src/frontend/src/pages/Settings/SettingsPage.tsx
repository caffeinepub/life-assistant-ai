import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, ChevronRight, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import type { UserRoleSetting } from '../../backend';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const [role, setRole] = useState<UserRoleSetting | ''>(userProfile?.onboardingInfo?.role || '');
  const [preferredName, setPreferredName] = useState(userProfile?.onboardingInfo?.preferredName || '');
  const [wakeTime, setWakeTime] = useState(userProfile?.onboardingInfo?.preferences.wakeTime.toString() || '7');
  const [sleepTime, setSleepTime] = useState(userProfile?.onboardingInfo?.preferences.sleepTime.toString() || '22');
  const [reminderFrequency, setReminderFrequency] = useState(
    userProfile?.onboardingInfo?.preferences.reminderFrequency.toString() || '60'
  );
  const [goals, setGoals] = useState(userProfile?.onboardingInfo?.preferences.goals.join(', ') || '');

  const handleSave = async () => {
    if (!role) {
      toast.error('Please select your role');
      return;
    }

    const goalsArray = goals.split(',').map(g => g.trim()).filter(g => g.length > 0);

    try {
      await saveProfile.mutateAsync({
        onboardingInfo: {
          role: role as UserRoleSetting,
          preferredName: preferredName || undefined,
          preferences: {
            wakeTime: BigInt(parseInt(wakeTime)),
            sleepTime: BigInt(parseInt(sleepTime)),
            reminderFrequency: BigInt(parseInt(reminderFrequency)),
            goals: goalsArray,
          },
        },
        createdAt: userProfile?.createdAt || BigInt(Date.now() * 1000000),
      });
      toast.success('Settings saved! ✨');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your preferences and account
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
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
            <Label htmlFor="name">Preferred Name</Label>
            <Input
              id="name"
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your daily schedule and reminders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Your Goals</Label>
            <Input
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Separate with commas"
            />
          </div>

          <Button onClick={handleSave} disabled={saveProfile.isPending} className="w-full">
            {saveProfile.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>Share your thoughts or request changes</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => navigate({ to: '/settings/feedback' })}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback / Request a Change
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy & Safety</CardTitle>
          <CardDescription>Learn about how your data is used</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/settings/safety-privacy">
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety & Privacy Information
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center text-sm text-muted-foreground pb-8">
        <p>© 2026. Built with 💙 using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">caffeine.ai</a></p>
      </div>
    </div>
  );
}
