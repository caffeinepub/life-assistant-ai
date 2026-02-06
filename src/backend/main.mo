import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserRoleSetting = {
    #student;
    #professional;
    #homemaker;
    #elder;
    #other;
  };

  public type Preferences = {
    wakeTime : Nat;
    sleepTime : Nat;
    reminderFrequency : Nat;
    goals : [Text];
  };

  public type OnboardingInfo = {
    role : UserRoleSetting;
    preferredName : ?Text;
    preferences : Preferences;
  };

  public type UserProfile = {
    onboardingInfo : ?OnboardingInfo;
    createdAt : Time.Time;
  };

  public type Task = {
    id : Nat;
    title : Text;
    timestamp : Time.Time;
    completed : Bool;
  };

  public type Reminder = {
    id : Nat;
    description : Text;
    time : Nat;
    isRecurring : Bool;
  };

  public type WellnessEntry = {
    hydration : Nat;
    sleepHours : Nat;
  };

  public type MoodEntry = {
    rating : Nat;
    timestamp : Time.Time;
  };

  public type FeedbackRequest = {
    text : Text;
    timestamp : Time.Time;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userTasks = Map.empty<Principal, [Task]>();
  let userReminders = Map.empty<Principal, [Reminder]>();
  let wellnessEntries = Map.empty<Principal, [WellnessEntry]>();
  let moodEntries = Map.empty<Principal, [MoodEntry]>();
  let feedbackRequests = Map.empty<Principal, [FeedbackRequest]>();

  var nextTaskId : Nat = 0;
  var nextReminderId : Nat = 0;

  // Feedback/Change Requests
  public shared ({ caller }) func submitFeedbackRequest(text : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit feedback requests");
    };
    let request : FeedbackRequest = {
      text;
      timestamp = Time.now();
    };
    let existingRequests = switch (feedbackRequests.get(caller)) {
      case (null) { [] };
      case (?requests) { requests };
    };
    let updatedRequests = existingRequests.concat([request]);
    feedbackRequests.add(caller, updatedRequests);
  };

  public query ({ caller }) func getUserFeedbackRequests() : async [FeedbackRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access feedback requests");
    };
    switch (feedbackRequests.get(caller)) {
      case (null) { [] };
      case (?requests) { requests };
    };
  };

  // User Profile Management (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Onboarding
  public shared ({ caller }) func submitOnboardingInfo(info : OnboardingInfo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit onboarding info");
    };
    let profile : UserProfile = {
      onboardingInfo = ?info;
      createdAt = Time.now();
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getOnboardingInfo(user : Principal) : async ?OnboardingInfo {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access onboarding info");
    };
    if (caller != user) {
      Runtime.trap("Unauthorized: Can only view your own onboarding info");
    };
    switch (userProfiles.get(user)) {
      case (null) { null };
      case (?profile) { profile.onboardingInfo };
    };
  };

  // Tasks
  public shared ({ caller }) func createTask(title : Text) : async Task {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create tasks");
    };
    let id = nextTaskId;
    nextTaskId += 1;
    let task = { id; title; timestamp = Time.now(); completed = false };
    let existingTasks = switch (userTasks.get(caller)) {
      case (null) { [] };
      case (?tasks) { tasks };
    };
    let updatedTasks = existingTasks.concat([task]);
    userTasks.add(caller, updatedTasks);
    task;
  };

  public shared ({ caller }) func completeTask(taskId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete tasks");
    };
    let existingTasks = switch (userTasks.get(caller)) {
      case (null) { [] };
      case (?tasks) { tasks };
    };
    let updatedTasks = existingTasks.map(
      func(task) {
        if (task.id == taskId) { { task with completed = true } } else {
          task;
        };
      }
    );
    userTasks.add(caller, updatedTasks);
  };

  public query ({ caller }) func getTasks() : async [Task] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access tasks");
    };
    switch (userTasks.get(caller)) {
      case (null) { [] };
      case (?tasks) { tasks };
    };
  };

  // Reminders
  public shared ({ caller }) func addReminder(description : Text, time : Nat, isRecurring : Bool) : async Reminder {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reminders");
    };
    let id = nextReminderId;
    nextReminderId += 1;
    let reminder = { id; description; time; isRecurring };
    let existingReminders = switch (userReminders.get(caller)) {
      case (null) { [] };
      case (?reminders) { reminders };
    };
    let updatedReminders = existingReminders.concat([reminder]);
    userReminders.add(caller, updatedReminders);
    reminder;
  };

  public query ({ caller }) func getReminders() : async [Reminder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access reminders");
    };
    switch (userReminders.get(caller)) {
      case (null) { [] };
      case (?reminders) { reminders };
    };
  };

  // Wellness Entries
  public shared ({ caller }) func addWellnessEntry(entry : WellnessEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add wellness entries");
    };
    let existingEntries = switch (wellnessEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };
    let updatedEntries = existingEntries.concat([entry]);
    wellnessEntries.add(caller, updatedEntries);
  };

  public query ({ caller }) func getWellnessEntries() : async [WellnessEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access wellness entries");
    };
    switch (wellnessEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };
  };

  // Mood Entries
  public shared ({ caller }) func submitMood(rating : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit mood entries");
    };
    let mood = { rating; timestamp = Time.now() };
    let existingMoods = switch (moodEntries.get(caller)) {
      case (null) { [] };
      case (?moods) { moods };
    };
    let updatedMoods = existingMoods.concat([mood]);
    moodEntries.add(caller, updatedMoods);
  };

  public query ({ caller }) func getMoodEntries() : async [MoodEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access mood entries");
    };
    switch (moodEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };
  };
};
