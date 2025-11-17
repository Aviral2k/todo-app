import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      default:
        return web;
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: "AIzaSyBh7o896GRwAZh2YoYrTQHVpSwpc0LU6rU",
    appId: "1:984870223694:web:674a3f6c56901d5664281f",
    messagingSenderId: "984870223694",
    projectId: "todo-app-master-ff749",
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: "AIzaSyBh7o896GRwAZh2YoYrTQHVpSwpc0LU6rU",
    appId: "1:984870223694:android:59c297433cb9dca064281f", // Update with Android app ID
    messagingSenderId: "984870223694",
    projectId: "todo-app-master-ff749",
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: "AIzaSyBh7o896GRwAZh2YoYrTQHVpSwpc0LU6rU",
    appId: "1:984870223694:ios:98ff0f423930cf6d64281f", // Update with iOS app ID
    messagingSenderId: "984870223694",
    projectId: "todo-app-master-ff749",
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: "AIzaSyBh7o896GRwAZh2YoYrTQHVpSwpc0LU6rU",
    appId: "1:984870223694:ios:98ff0f423930cf6d64281f", // Same as iOS
    messagingSenderId: "984870223694",
    projectId: "todo-app-master-ff749",
  );
}