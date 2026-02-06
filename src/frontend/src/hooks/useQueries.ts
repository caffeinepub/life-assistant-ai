import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  UserProfile, 
  OnboardingInfo, 
  Task, 
  Reminder, 
  WellnessEntry, 
  MoodEntry,
  FeedbackRequest
} from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSubmitOnboardingInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (info: OnboardingInfo) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitOnboardingInfo(info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetTasks() {
  const { actor, isFetching } = useActor();

  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createTask(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useCompleteTask() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.completeTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useGetReminders() {
  const { actor, isFetching } = useActor();

  return useQuery<Reminder[]>({
    queryKey: ['reminders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReminders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReminder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ description, time, isRecurring }: { description: string; time: bigint; isRecurring: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addReminder(description, time, isRecurring);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });
}

export function useGetWellnessEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<WellnessEntry[]>({
    queryKey: ['wellnessEntries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWellnessEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddWellnessEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: WellnessEntry) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addWellnessEntry(entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wellnessEntries'] });
    },
  });
}

export function useGetMoodEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<MoodEntry[]>({
    queryKey: ['moodEntries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMoodEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitMood() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rating: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitMood(rating);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moodEntries'] });
    },
  });
}

export function useGetUserFeedbackRequests() {
  const { actor, isFetching } = useActor();

  return useQuery<FeedbackRequest[]>({
    queryKey: ['feedbackRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserFeedbackRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitFeedbackRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitFeedbackRequest(text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbackRequests'] });
    },
  });
}
