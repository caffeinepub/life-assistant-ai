import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Shield, Lock, Heart, AlertTriangle } from 'lucide-react';

export default function SafetyPrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold mb-1">Safety & Privacy</h2>
          <p className="text-muted-foreground text-sm">
            How we protect you and your data
          </p>
        </div>
      </div>

      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <AlertTriangle className="h-5 w-5" />
            Important Safety Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="font-medium">Life Assistant AI is NOT a substitute for professional medical, mental health, or legal advice.</p>
          
          <div className="space-y-2">
            <p className="font-medium">If you are experiencing:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Thoughts of self-harm or suicide</li>
              <li>Severe physical symptoms (chest pain, difficulty breathing, etc.)</li>
              <li>Mental health crisis</li>
              <li>Medical emergency</li>
            </ul>
          </div>

          <div className="p-3 bg-background rounded-lg border border-amber-300 dark:border-amber-700">
            <p className="font-bold mb-2">Please seek immediate help:</p>
            <ul className="space-y-1">
              <li>🚨 <strong>Emergency:</strong> Call 911</li>
              <li>💙 <strong>Crisis Hotline:</strong> 988 (US)</li>
              <li>💬 <strong>Crisis Text:</strong> Text HOME to 741741</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            What We Do
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="guidance">
              <AccordionTrigger>General Guidance & Support</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>Life Assistant AI provides:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Daily task management and organization</li>
                  <li>Study and learning assistance</li>
                  <li>Work productivity tips</li>
                  <li>General wellness habit tracking</li>
                  <li>Emotional support and encouragement</li>
                  <li>Stress management techniques</li>
                </ul>
                <p className="italic mt-2">All guidance is general in nature and based on widely accepted practices.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="not-do">
              <AccordionTrigger>What We Don't Do</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>Life Assistant AI does NOT:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Provide medical diagnoses or treatment recommendations</li>
                  <li>Prescribe medications or medical interventions</li>
                  <li>Offer professional mental health therapy</li>
                  <li>Give legal advice or representation</li>
                  <li>Replace professional healthcare providers</li>
                  <li>Handle medical emergencies</li>
                </ul>
                <p className="font-medium mt-2">For any health concerns, always consult qualified healthcare professionals.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-600" />
            Your Data & Privacy
          </CardTitle>
          <CardDescription>What we store and how we protect it</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="stored">
              <AccordionTrigger>What Data We Store</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>We store the following data to provide personalized assistance:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Profile:</strong> Your role, preferred name, and preferences</li>
                  <li><strong>Tasks:</strong> Your to-do items and completion status</li>
                  <li><strong>Reminders:</strong> Your scheduled reminders</li>
                  <li><strong>Wellness Logs:</strong> Hydration and sleep tracking data</li>
                  <li><strong>Mood Check-ins:</strong> Your mood ratings over time</li>
                  <li><strong>Chat History:</strong> Your conversations with the assistant (stored locally in your browser session)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="protected">
              <AccordionTrigger>How Your Data is Protected</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>All data is stored securely on the Internet Computer blockchain</li>
                  <li>Your data is tied to your Internet Identity and cannot be accessed by other users</li>
                  <li>We never share your personal data with third parties</li>
                  <li>Chat history is stored locally in your browser and cleared when you log out</li>
                  <li>You can delete your account and all associated data at any time</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="control">
              <AccordionTrigger>Your Control Over Data</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>You have full control over your data:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>View all your stored data at any time</li>
                  <li>Update or delete individual entries</li>
                  <li>Change your preferences whenever you want</li>
                  <li>Log out to clear local chat history</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-600" />
            Our Commitment to You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>Life Assistant AI is designed to:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Support you in organizing daily life</li>
            <li>Encourage healthy habits and self-care</li>
            <li>Provide a judgment-free space for reflection</li>
            <li>Respect your privacy and autonomy</li>
            <li>Direct you to professional help when needed</li>
          </ul>
          <p className="font-medium mt-4">We're here to help you thrive, one day at a time. 🌟</p>
        </CardContent>
      </Card>

      <div className="flex justify-center pb-8">
        <Link to="/settings">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
        </Link>
      </div>
    </div>
  );
}
