import { useState } from 'react';
import { useGetUserFeedbackRequests, useSubmitFeedbackRequest } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function FeedbackPage() {
  const { data: feedbackRequests = [], isLoading } = useGetUserFeedbackRequests();
  const submitFeedback = useSubmitFeedbackRequest();
  const [feedbackText, setFeedbackText] = useState('');

  const MAX_LENGTH = 1000;

  const handleSubmit = async () => {
    const trimmedText = feedbackText.trim();

    if (!trimmedText) {
      toast.error('Please enter your feedback or change request');
      return;
    }

    if (trimmedText.length > MAX_LENGTH) {
      toast.error(`Feedback must be ${MAX_LENGTH} characters or less`);
      return;
    }

    try {
      await submitFeedback.mutateAsync(trimmedText);
      setFeedbackText('');
      toast.success('Thank you! Your feedback has been submitted ✨');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Sort requests by timestamp (most recent first)
  const sortedRequests = [...feedbackRequests].sort((a, b) => {
    return Number(b.timestamp - a.timestamp);
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Feedback / Request a Change</h2>
        <p className="text-muted-foreground text-sm">
          Share your thoughts or suggest improvements
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Submit Feedback
          </CardTitle>
          <CardDescription>
            Tell us what you'd like to see improved or changed in the app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="I would like to suggest..."
              className="min-h-[120px] resize-none"
              maxLength={MAX_LENGTH}
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Be specific and constructive</span>
              <span>
                {feedbackText.length}/{MAX_LENGTH}
              </span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitFeedback.isPending || !feedbackText.trim()}
            className="w-full"
          >
            {submitFeedback.isPending ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Your Submitted Requests</h3>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600 mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading your feedback...</p>
          </div>
        ) : sortedRequests.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                You haven't submitted any feedback yet
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sortedRequests.map((request, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <Badge variant="outline" className="shrink-0">
                      Open
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(request.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {request.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Separator />

      <div className="text-center text-sm text-muted-foreground pb-8">
        <p>© 2026. Built with 💙 using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">caffeine.ai</a></p>
      </div>
    </div>
  );
}
