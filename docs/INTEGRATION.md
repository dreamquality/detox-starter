# Integration Guide

This guide explains how to integrate Detox Starter with your existing React Native or native mobile application.

## Table of Contents

- [React Native Integration](#react-native-integration)
- [Native iOS Integration](#native-ios-integration)
- [Native Android Integration](#native-android-integration)
- [Expo Integration](#expo-integration)
- [Configuration Updates](#configuration-updates)

## React Native Integration

### 1. Update package.json

Copy the Detox configuration from this starter's `package.json` to your React Native app's `package.json`:

```json
{
  "scripts": {
    "test:e2e:ios:debug": "detox test --configuration ios.sim.debug",
    "test:e2e:android:debug": "detox test --configuration android.emu.debug",
    "build:e2e:ios:debug": "detox build --configuration ios.sim.debug",
    "build:e2e:android:debug": "detox build --configuration android.emu.debug"
  },
  "detox": {
    "test-runner": "jest",
    "runner-config": "e2e/config.json",
    "configurations": {
      "ios.sim.debug": {
        "device": {
          "type": "iPhone 14"
        },
        "app": "ios.debug"
      },
      "android.emu.debug": {
        "device": {
          "avdName": "Pixel_5_API_31"
        },
        "app": "android.debug"
      }
    },
    "apps": {
      "ios.debug": {
        "type": "ios.app",
        "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/YourAppName.app",
        "build": "xcodebuild -workspace ios/YourAppName.xcworkspace -scheme YourAppName -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build"
      },
      "android.debug": {
        "type": "android.apk",
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug"
      }
    }
  }
}
```

### 2. Update Binary Paths

Replace `YourAppName` with your actual app name:
- iOS: Check `ios/YourAppName.xcworkspace` and scheme name
- Android: Usually `app-debug.apk` but verify in `android/app/build/outputs/apk/`

### 3. Copy Test Files

```bash
# Copy the entire e2e directory to your project
cp -r detox-starter/e2e /path/to/your-app/

# Copy configuration files
cp detox-starter/.env.example /path/to/your-app/
cp detox-starter/.eslintrc.js /path/to/your-app/
cp detox-starter/.prettierrc.js /path/to/your-app/
```

### 4. Add Test IDs to Components

Update your React Native components to include `testID` props:

```jsx
// Before
<Button onPress={handleLogin} title="Login" />

// After
<Button testID="loginButton" onPress={handleLogin} title="Login" />
```

```jsx
// Before
<TextInput
  placeholder="Username"
  onChangeText={setUsername}
/>

// After
<TextInput
  testID="usernameInput"
  placeholder="Username"
  onChangeText={setUsername}
/>
```

### 5. Install Dependencies

```bash
cd your-app
npm install --save-dev detox jest jest-html-reporters
npm install -g detox-cli
```

### 6. Initialize Detox

```bash
# iOS
cd ios && pod install && cd ..

# Verify setup
detox test --configuration ios.sim.debug --loglevel trace
```

## Native iOS Integration

### 1. Update Xcode Project

1. Open your project in Xcode
2. Add the Detox framework to your test target
3. Update the scheme for testing

### 2. Configure Detox

Update the iOS configuration in `package.json`:

```json
{
  "detox": {
    "apps": {
      "ios.debug": {
        "type": "ios.app",
        "binaryPath": "path/to/YourApp.app",
        "build": "xcodebuild -workspace YourApp.xcworkspace -scheme YourApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build"
      }
    }
  }
}
```

### 3. Add Test IDs

In your iOS native code, set accessibility identifiers:

```swift
// Swift
button.accessibilityIdentifier = "loginButton"
textField.accessibilityIdentifier = "usernameInput"
```

```objc
// Objective-C
button.accessibilityIdentifier = @"loginButton";
textField.accessibilityIdentifier = @"usernameInput";
```

## Native Android Integration

### 1. Update Gradle Configuration

Add to `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
}

dependencies {
    androidTestImplementation('com.wix:detox:+')
    implementation 'androidx.appcompat:appcompat:1.1.0'
}
```

### 2. Configure Detox

Update the Android configuration in `package.json`:

```json
{
  "detox": {
    "apps": {
      "android.debug": {
        "type": "android.apk",
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug"
      }
    }
  }
}
```

### 3. Add Test IDs

In your Android native code, set view IDs or content descriptions:

```java
// Java
button.setAccessibilityIdentifier("loginButton");
// or
button.setTag("loginButton");
```

```kotlin
// Kotlin
button.accessibilityIdentifier = "loginButton"
// or
button.tag = "loginButton"
```

## Expo Integration

### Important Note
Detox requires direct access to native code. If you're using Expo:

### Option 1: Use Expo Dev Client (Recommended)

```bash
# Install Expo Dev Client
npx expo install expo-dev-client

# Create development build
eas build --profile development --platform ios
eas build --profile development --platform android
```

Update `package.json`:

```json
{
  "detox": {
    "apps": {
      "ios.debug": {
        "type": "ios.app",
        "binaryPath": "path/to/your-expo-dev-client.app"
      }
    }
  }
}
```

### Option 2: Eject from Expo

```bash
# Eject to bare workflow
npx expo prebuild

# Then follow React Native integration steps
```

### Option 3: Use Expo Go (Limited)

Note: This is not recommended as Expo Go has limitations with Detox. Use Options 1 or 2 for better results.

## Configuration Updates

### Update App Paths

After integration, update these paths in `package.json`:

```json
{
  "detox": {
    "apps": {
      "ios.debug": {
        "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/YOUR_APP_NAME.app"
      },
      "android.debug": {
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk"
      }
    }
  }
}
```

### Update Device Configuration

Choose simulators/emulators you have available:

```bash
# List iOS simulators
xcrun simctl list devices

# List Android emulators
emulator -list-avds
```

Update in `package.json`:

```json
{
  "detox": {
    "configurations": {
      "ios.sim.debug": {
        "device": {
          "type": "iPhone 15 Pro"  // Update to available simulator
        }
      },
      "android.emu.debug": {
        "device": {
          "avdName": "Your_AVD_Name"  // Update to available emulator
        }
      }
    }
  }
}
```

## Verify Integration

### 1. Build the App

```bash
# iOS
npm run build:e2e:ios:debug

# Android
npm run build:e2e:android:debug
```

### 2. Run Tests

```bash
# iOS
npm run test:e2e:ios:debug

# Android
npm run test:e2e:android:debug
```

### 3. Check Test Reports

Test reports will be generated in:
```
e2e/artifacts/html-report/report.html
```

## Troubleshooting Integration

### iOS Issues

**App binary not found:**
```bash
# Verify build output
ls -la ios/build/Build/Products/Debug-iphonesimulator/
# Update binaryPath in package.json
```

**CocoaPods issues:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Issues

**APK not found:**
```bash
# Verify APK location
find android/app/build/outputs -name "*.apk"
# Update binaryPath in package.json
```

**Gradle issues:**
```bash
cd android
./gradlew clean
./gradlew assembleDebug
cd ..
```

### Build Configuration Issues

**Wrong scheme/build type:**
- iOS: Check in Xcode → Product → Scheme → Edit Scheme
- Android: Check `android/app/build.gradle` buildTypes

## Migration Checklist

- [ ] Copy e2e directory to your project
- [ ] Update package.json with Detox configuration
- [ ] Install Detox dependencies
- [ ] Update app binary paths
- [ ] Update device configuration
- [ ] Add testID props to components
- [ ] Build app for testing
- [ ] Run sample test
- [ ] Update GitHub Actions workflows
- [ ] Configure BrowserStack (optional)
- [ ] Update documentation

## Example: Complete React Native Integration

Here's a complete example for a React Native app called "MyApp":

### package.json

```json
{
  "name": "MyApp",
  "scripts": {
    "test:e2e:ios": "detox test --configuration ios.sim.debug",
    "test:e2e:android": "detox test --configuration android.emu.debug",
    "build:e2e:ios": "detox build --configuration ios.sim.debug",
    "build:e2e:android": "detox build --configuration android.emu.debug"
  },
  "detox": {
    "test-runner": "jest",
    "runner-config": "e2e/config.json",
    "configurations": {
      "ios.sim.debug": {
        "device": { "type": "iPhone 14" },
        "app": "ios.debug"
      },
      "android.emu.debug": {
        "device": { "avdName": "Pixel_5_API_31" },
        "app": "android.debug"
      }
    },
    "apps": {
      "ios.debug": {
        "type": "ios.app",
        "binaryPath": "ios/build/Build/Products/Debug-iphonesimulator/MyApp.app",
        "build": "xcodebuild -workspace ios/MyApp.xcworkspace -scheme MyApp -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build"
      },
      "android.debug": {
        "type": "android.apk",
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug"
      }
    }
  }
}
```

### App.js with Test IDs

```jsx
import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default function App() {
  const [username, setUsername] = React.useState('');

  return (
    <View testID="appContainer" style={{ flex: 1, padding: 20 }}>
      <Text testID="welcomeText">Welcome to MyApp!</Text>
      <TextInput
        testID="usernameInput"
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <Button
        testID="submitButton"
        title="Submit"
        onPress={() => console.log('Submitted')}
      />
    </View>
  );
}
```

## Next Steps

1. Write tests specific to your app's features
2. Set up CI/CD with GitHub Actions
3. Configure BrowserStack for cloud testing
4. Review [BEST_PRACTICES.md](BEST_PRACTICES.md) for testing patterns
5. Add more test coverage

## Resources

- [Detox Documentation](https://wix.github.io/Detox/)
- [React Native Testing](https://reactnative.dev/docs/testing-overview)
- [Expo Dev Client](https://docs.expo.dev/development/create-development-builds/)
- [BrowserStack App Automate](https://www.browserstack.com/app-automate)

---

**Integration complete? Start testing!** 🚀
