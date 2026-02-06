import { useState } from 'react';
import { useGetWellnessEntries, useAddWellnessEntry, useSubmitMood, useGetMoodEntries } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplets, Moon, Heart, Wind } from 'lucide-react';
import { toast } from 'sonner';
import BreathingExercise from '../../components/wellness/BreathingExercise';
import { FadeIn } from '../../components/animation/MicroMotion';

export default function WellnessPage() {
  const [hydration, setHydration] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [moodRating, setMoodRating] = useState<number | null>(null);
  const [showBreathing, setShowBreathing] = useState(false);

  const { data: wellnessEntries = [] } = useGetWellnessEntries();
  const { data: moodEntries = [] } = useGetMoodEntries();
  const addWellness = useAddWellnessEntry();
  const submitMood = useSubmitMood();

  const handleLogWellness = async () => {
    if (!hydration || !sleepHours) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await addWellness.mutateAsync({
        hydration: BigInt(parseInt(hydration)),
        sleepHours: BigInt(parseInt(sleepHours)),
      });
      setHydration('');
      setSleepHours('');
      toast.success('Wellness logged! 🌟');
    } catch (error) {
      toast.error('Failed to log wellness data');
    }
  };

  const handleSubmitMood = async (rating: number) => {
    try {
      await submitMood.mutateAsync(BigInt(rating));
      setMoodRating(rating);
      toast.success('Mood recorded! 💙');
    } catch (error) {
      toast.error('Failed to record mood');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-bold mb-1">Wellness & Habits</h2>
          <p className="text-muted-foreground text-sm">
            Track your health habits and emotional well-being
          </p>
        </div>
      </FadeIn>

      <Tabs defaultValue="track" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="track" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Log Today's Wellness
              </CardTitle>
              <CardDescription>
                Track your hydration and sleep
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hydration">Glasses of Water (8oz each)</Label>
                <Input
                  id="hydration"
                  type="number"
                  min="0"
                  max="20"
                  value={hydration}
                  onChange={(e) => setHydration(e.target.value)}
                  placeholder="e.g., 8"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleep">Hours of Sleep</Label>
                <Input
                  id="sleep"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(e.target.value)}
                  placeholder="e.g., 7.5"
                />
              </div>

              <Button onClick={handleLogWellness} disabled={addWellness.isPending} className="w-full">
                Log Wellness
              </Button>

              <p className="text-xs text-muted-foreground italic">
                *This is for general wellness tracking only. For health concerns, please consult a doctor.*
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              {wellnessEntries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No entries yet. Start tracking above! 💧</p>
              ) : (
                <div className="space-y-2">
                  {wellnessEntries.slice(-5).reverse().map((entry, i) => (
                    <div key={i} className="flex justify-between p-3 bg-muted rounded-lg">
                      <span className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        {entry.hydration.toString()} glasses
                      </span>
                      <span className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-purple-500" />
                        {entry.sleepHours.toString()}h sleep
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500" />
                How are you feeling today?
              </CardTitle>
              <CardDescription>
                Rate your mood from 1 (difficult) to 5 (great)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={moodRating === rating ? 'default' : 'outline'}
                    onClick={() => handleSubmitMood(rating)}
                    className="flex-1"
                  >
                    {rating}
                  </Button>
                ))}
              </div>

              <p className="text-xs text-muted-foreground italic">
                *I'm here to listen and support you, but I'm not a therapist. For ongoing mental health support, consider speaking with a professional counselor.*
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Mood Check-ins</CardTitle>
            </CardHeader>
            <CardContent>
              {moodEntries.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No mood entries yet. Check in above! 💙</p>
              ) : (
                <div className="space-y-2">
                  {moodEntries.slice(-7).reverse().map((entry, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">
                        {new Date(Number(entry.timestamp) / 1000000).toLocaleDateString()}
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Heart
                            key={j}
                            className={`h-4 w-4 ${
                              j < Number(entry.rating)
                                ? 'fill-rose-500 text-rose-500'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-teal-500" />
                Breathing Exercise
              </CardTitle>
              <CardDescription>
                Take a moment to relax and center yourself
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowBreathing(!showBreathing)} className="w-full mb-4">
                {showBreathing ? 'Hide Exercise' : 'Start Breathing Exercise'}
              </Button>
              {showBreathing && <BreathingExercise />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
