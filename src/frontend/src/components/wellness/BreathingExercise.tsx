import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wind } from 'lucide-react';

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [cycle, setCycle] = useState(0);

  const phaseDurations: Record<Phase, number> = {
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 2,
  };

  const phaseLabels: Record<Phase, string> = {
    inhale: 'Breathe In',
    hold: 'Hold',
    exhale: 'Breathe Out',
    rest: 'Rest',
  };

  useEffect(() => {
    if (!isActive) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    // Move to next phase
    const phases: Phase[] = ['inhale', 'hold', 'exhale', 'rest'];
    const currentIndex = phases.indexOf(phase);
    const nextIndex = (currentIndex + 1) % phases.length;
    const nextPhase = phases[nextIndex];

    if (nextPhase === 'inhale') {
      setCycle(cycle + 1);
      if (cycle >= 3) {
        setIsActive(false);
        setCycle(0);
        return;
      }
    }

    setPhase(nextPhase);
    setCountdown(phaseDurations[nextPhase]);
  }, [isActive, countdown, phase, cycle]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCountdown(4);
    setCycle(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(4);
    setCycle(0);
  };

  return (
    <div className="space-y-4">
      <Card className="p-8 text-center bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950">
        <Wind className="h-16 w-16 mx-auto mb-4 text-teal-500" />
        
        {isActive ? (
          <>
            <h3 className="text-3xl font-bold mb-2">{phaseLabels[phase]}</h3>
            <div className="text-6xl font-bold text-teal-600 dark:text-teal-400 my-8">
              {countdown}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Cycle {cycle + 1} of 4
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4">4-7-8 Breathing</h3>
            <p className="text-muted-foreground mb-6">
              A calming technique to reduce stress and anxiety
            </p>
            <div className="text-left max-w-sm mx-auto space-y-2 mb-6">
              <p className="text-sm">• Breathe in for 4 seconds</p>
              <p className="text-sm">• Hold for 7 seconds</p>
              <p className="text-sm">• Breathe out for 8 seconds</p>
              <p className="text-sm">• Rest for 2 seconds</p>
              <p className="text-sm">• Repeat 4 times</p>
            </div>
          </>
        )}
      </Card>

      <div className="flex gap-2">
        {!isActive ? (
          <Button onClick={handleStart} className="flex-1">
            Start Exercise
          </Button>
        ) : (
          <Button onClick={handleStop} variant="outline" className="flex-1">
            Stop
          </Button>
        )}
      </div>
    </div>
  );
}
