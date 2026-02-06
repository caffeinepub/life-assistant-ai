import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WellnessEntry {
    hydration: bigint;
    sleepHours: bigint;
}
export type Time = bigint;
export interface Reminder {
    id: bigint;
    isRecurring: boolean;
    time: bigint;
    description: string;
}
export interface OnboardingInfo {
    role: UserRoleSetting;
    preferences: Preferences;
    preferredName?: string;
}
export interface Preferences {
    sleepTime: bigint;
    wakeTime: bigint;
    goals: Array<string>;
    reminderFrequency: bigint;
}
export interface FeedbackRequest {
    text: string;
    timestamp: Time;
}
export interface Task {
    id: bigint;
    title: string;
    completed: boolean;
    timestamp: Time;
}
export interface UserProfile {
    onboardingInfo?: OnboardingInfo;
    createdAt: Time;
}
export interface MoodEntry {
    timestamp: Time;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserRoleSetting {
    other = "other",
    elder = "elder",
    professional = "professional",
    homemaker = "homemaker",
    student = "student"
}
export interface backendInterface {
    addReminder(description: string, time: bigint, isRecurring: boolean): Promise<Reminder>;
    addWellnessEntry(entry: WellnessEntry): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeTask(taskId: bigint): Promise<void>;
    createTask(title: string): Promise<Task>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMoodEntries(): Promise<Array<MoodEntry>>;
    getOnboardingInfo(user: Principal): Promise<OnboardingInfo | null>;
    getReminders(): Promise<Array<Reminder>>;
    getTasks(): Promise<Array<Task>>;
    getUserFeedbackRequests(): Promise<Array<FeedbackRequest>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWellnessEntries(): Promise<Array<WellnessEntry>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitFeedbackRequest(text: string): Promise<void>;
    submitMood(rating: bigint): Promise<void>;
    submitOnboardingInfo(info: OnboardingInfo): Promise<void>;
}
