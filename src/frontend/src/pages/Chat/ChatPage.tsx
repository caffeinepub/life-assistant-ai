import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../state/chatStore';
import { useGetCallerUserProfile, useGetTasks } from '../../hooks/useQueries';
import { generateAssistantResponse } from '../../assistant/assistantBrain';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles } from 'lucide-react';
import QuickActionsBar from '../../components/chat/QuickActionsBar';
import { FadeIn } from '../../components/animation/MicroMotion';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, addMessage } = useChatStore();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: tasks = [] } = useGetTasks();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    addMessage({ role: 'user', content: messageText });
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateAssistantResponse(messageText, {
        tasks,
        onboardingInfo: userProfile?.onboardingInfo,
      });
      addMessage({ role: 'assistant', content: response });
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col">
      <FadeIn>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-1">Chat Assistant</h2>
          <p className="text-muted-foreground text-sm">
            I'm here to help with your daily life, study, work, and well-being
          </p>
        </div>
      </FadeIn>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Sparkles className="h-16 w-16 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Welcome! How can I help you today?</h3>
              <p className="text-muted-foreground mb-6">
                Use the quick actions below or type your question
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        <div className="border-t border-border p-4 space-y-3">
          <QuickActionsBar onActionClick={handleSend} />
          
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="min-h-[60px] resize-none"
              rows={2}
            />
            <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping} size="icon" className="h-[60px] w-[60px]">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
