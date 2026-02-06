import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import ChatPage from './pages/Chat/ChatPage';
import TodayPage from './pages/Today/TodayPage';
import WellnessPage from './pages/Wellness/WellnessPage';
import HistoryPage from './pages/History/HistoryPage';
import SettingsPage from './pages/Settings/SettingsPage';
import SafetyPrivacyPage from './pages/Settings/SafetyPrivacyPage';
import FeedbackPage from './pages/Feedback/FeedbackPage';
import LoginButton from './components/auth/LoginButton';

function Layout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isInitializing = loginStatus === 'initializing';

  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600 mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4">
        <div className="max-w-md text-center space-y-6">
          <img 
            src="/assets/generated/life-assistant-ai-logo.dim_512x512.png" 
            alt="Life Assistant AI" 
            className="h-24 w-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-foreground">Life Assistant AI</h1>
          <p className="text-lg text-muted-foreground">
            Your friendly companion for daily life, study, work, and well-being
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  const showOnboarding = isAuthenticated && isFetched && !userProfile?.onboardingInfo;

  if (showOnboarding) {
    return <OnboardingPage />;
  }

  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: () => (
    <AuthGate>
      <Layout />
    </AuthGate>
  ),
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ChatPage,
});

const todayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/today',
  component: TodayPage,
});

const wellnessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wellness',
  component: WellnessPage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: HistoryPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
});

const safetyPrivacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/safety-privacy',
  component: SafetyPrivacyPage,
});

const feedbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings/feedback',
  component: FeedbackPage,
});

const routeTree = rootRoute.addChildren([
  chatRoute,
  todayRoute,
  wellnessRoute,
  historyRoute,
  settingsRoute,
  safetyPrivacyRoute,
  feedbackRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
