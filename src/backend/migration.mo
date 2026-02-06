import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  type OldActor = {
    userProfiles : Map.Map<Principal, { onboardingInfo : ?{ role : { #student; #professional; #homemaker; #elder; #other }; preferredName : ?Text; preferences : { wakeTime : Nat; sleepTime : Nat; reminderFrequency : Nat; goals : [Text] } }; createdAt : Time.Time }>;
    userTasks : Map.Map<Principal, [{ id : Nat; title : Text; timestamp : Time.Time; completed : Bool }]>;
    userReminders : Map.Map<Principal, [{ id : Nat; description : Text; time : Nat; isRecurring : Bool }]>;
    wellnessEntries : Map.Map<Principal, [{ hydration : Nat; sleepHours : Nat }]>;
    moodEntries : Map.Map<Principal, [{ rating : Nat; timestamp : Time.Time }]>;
    nextTaskId : Nat;
    nextReminderId : Nat;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, { onboardingInfo : ?{ role : { #student; #professional; #homemaker; #elder; #other }; preferredName : ?Text; preferences : { wakeTime : Nat; sleepTime : Nat; reminderFrequency : Nat; goals : [Text] } }; createdAt : Time.Time }>;
    userTasks : Map.Map<Principal, [{ id : Nat; title : Text; timestamp : Time.Time; completed : Bool }]>;
    userReminders : Map.Map<Principal, [{ id : Nat; description : Text; time : Nat; isRecurring : Bool }]>;
    wellnessEntries : Map.Map<Principal, [{ hydration : Nat; sleepHours : Nat }]>;
    moodEntries : Map.Map<Principal, [{ rating : Nat; timestamp : Time.Time }]>;
    nextTaskId : Nat;
    nextReminderId : Nat;
    feedbackRequests : Map.Map<Principal, [{ text : Text; timestamp : Time.Time }]>;
  };

  public func run(old : OldActor) : NewActor {
    {
      userProfiles = old.userProfiles;
      userTasks = old.userTasks;
      userReminders = old.userReminders;
      wellnessEntries = old.wellnessEntries;
      moodEntries = old.moodEntries;
      nextTaskId = old.nextTaskId;
      nextReminderId = old.nextReminderId;
      feedbackRequests = Map.empty<Principal, [{ text : Text; timestamp : Time.Time }]>();
    };
  };
};
