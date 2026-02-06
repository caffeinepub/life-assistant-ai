import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import LoginButton from '../auth/LoginButton';

export default function Header() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  const userName = userProfile?.onboardingInfo?.preferredName || 'Friend';
  const isAuthenticated = !!identity;

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/life-assistant-ai-logo.dim_512x512.png" 
            alt="Life Assistant AI" 
            className="h-10 w-10"
          />
          <div>
            <h1 className="text-lg font-bold text-foreground">Life Assistant AI</h1>
            {isAuthenticated && (
              <p className="text-xs text-muted-foreground">Hello, {userName}!</p>
            )}
          </div>
        </div>
        
        <LoginButton />
      </div>
    </header>
  );
}
