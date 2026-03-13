import Map "mo:core/Map";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Random "mo:core/Random";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";


actor {
  include MixinStorage();

  public type UserProfile = {
    name : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let otpRecords = Map.empty<Text, OtpRecord>();

  type OtpRecord = {
    otp : Text;
    expirySeconds : Int;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
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

  public shared ({ caller }) func addFile(blob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload files");
    };
  };

  public shared ({ caller }) func generateOtp(contact : Text) : async Text {
    // No authorization check - must be accessible to unauthenticated users for login
    let rng = Random.crypto();
    let randomNumber = await* rng.natRange(0, 1000000);

    let paddedOtp = randomNumber.toText();
    let expirySeconds = Time.now() / 1_000_000_000 + 300;

    let otpRecord : OtpRecord = {
      otp = paddedOtp;
      expirySeconds;
    };

    otpRecords.add(contact, otpRecord);
    paddedOtp;
  };

  public shared ({ caller }) func verifyOtp(contact : Text, otp : Text) : async Bool {
    // No authorization check - must be accessible to unauthenticated users for login
    switch (otpRecords.get(contact)) {
      case (null) { false };
      case (?record) {
        let currentTimeSeconds = Time.now() / 1_000_000_000;
        if (record.otp == otp and record.expirySeconds > currentTimeSeconds) {
          otpRecords.remove(contact);
          true;
        } else {
          false;
        };
      };
    };
  };
};
