# Detailed Setup Guide

This guide provides detailed instructions for setting up the Detox Starter project on different platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [macOS Setup (iOS + Android)](#macos-setup)
- [Linux Setup (Android only)](#linux-setup)
- [Windows Setup (Android only)](#windows-setup)
- [BrowserStack Setup](#browserstack-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### All Platforms

1. **Node.js and npm**
   - Install Node.js 16 or higher from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Install from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

## macOS Setup

### iOS Testing Setup

1. **Install Xcode**
   - Download from Mac App Store
   - Open Xcode and accept license agreement
   - Install command line tools:
     ```bash
     xcode-select --install
     ```

2. **Install CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

3. **Install Homebrew** (if not already installed)
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

4. **Install applesimutils** (required by Detox)
   ```bash
   brew tap wix/brew
   brew install applesimutils
   ```

5. **Verify iOS Simulator**
   ```bash
   xcrun simctl list devices
   ```

### Android Testing Setup (macOS)

1. **Install Java Development Kit (JDK)**
   ```bash
   brew install openjdk@17
   ```

2. **Install Android Studio**
   - Download from [developer.android.com](https://developer.android.com/studio)
   - Open Android Studio and install:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device

3. **Set up environment variables**
   Add to `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

4. **Create Android Virtual Device (AVD)**
   ```bash
   # Open Android Studio AVD Manager or use command line:
   avdmanager create avd -n Pixel_5_API_31 -k "system-images;android-31;google_apis;x86_64" -d pixel_5
   ```

5. **Verify Android setup**
   ```bash
   adb version
   emulator -list-avds
   ```

## Linux Setup

### Android Testing Setup (Linux)

1. **Install Java Development Kit**
   ```bash
   sudo apt update
   sudo apt install openjdk-17-jdk
   ```

2. **Install Android SDK**
   ```bash
   # Download Android command line tools
   cd ~
   wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip
   unzip commandlinetools-linux-9477386_latest.zip
   mkdir -p ~/Android/Sdk/cmdline-tools
   mv cmdline-tools ~/Android/Sdk/cmdline-tools/latest
   ```

3. **Set up environment variables**
   Add to `~/.bashrc`:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

4. **Install Android SDK packages**
   ```bash
   sdkmanager "platform-tools" "platforms;android-31" "build-tools;31.0.0"
   sdkmanager "system-images;android-31;google_apis;x86_64"
   sdkmanager "emulator"
   ```

5. **Create AVD**
   ```bash
   avdmanager create avd -n Pixel_5_API_31 -k "system-images;android-31;google_apis;x86_64" -d pixel_5
   ```

6. **Install KVM for faster emulation**
   ```bash
   sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils
   sudo adduser $USER kvm
   sudo adduser $USER libvirt
   ```

## Windows Setup

### Android Testing Setup (Windows)

1. **Install Java Development Kit**
   - Download JDK 17 from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [Adoptium](https://adoptium.net/)
   - Install and note the installation path

2. **Install Android Studio**
   - Download from [developer.android.com](https://developer.android.com/studio)
   - Follow installation wizard
   - Install required SDK components

3. **Set up environment variables**
   - Open System Properties → Advanced → Environment Variables
   - Add new user variables:
     ```
     ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
     JAVA_HOME = C:\Program Files\Java\jdk-17
     ```
   - Update Path variable to include:
     ```
     %ANDROID_HOME%\platform-tools
     %ANDROID_HOME%\emulator
     %ANDROID_HOME%\tools
     %ANDROID_HOME%\tools\bin
     ```

4. **Create Android Virtual Device**
   - Open Android Studio → Tools → AVD Manager
   - Create new virtual device (Pixel 5, API 31)

5. **Install Windows Subsystem for Linux** (optional, for better compatibility)
   ```powershell
   wsl --install
   ```

## BrowserStack Setup

### 1. Create BrowserStack Account

1. Sign up at [browserstack.com](https://www.browserstack.com/)
2. Subscribe to App Automate plan
3. Navigate to Account → Settings → Access Key
4. Note your Username and Access Key

### 2. Configure Credentials

Create `.env` file in project root:
```bash
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
```

Or set environment variables:
```bash
# macOS/Linux
export BROWSERSTACK_USERNAME=your_username
export BROWSERSTACK_ACCESS_KEY=your_access_key

# Windows (PowerShell)
$env:BROWSERSTACK_USERNAME="your_username"
$env:BROWSERSTACK_ACCESS_KEY="your_access_key"
```

### 3. Install BrowserStack Local

**macOS:**
```bash
brew install browserstack/tap/browserstack-local
```

**Linux:**
```bash
wget "https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip"
unzip BrowserStackLocal-linux-x64.zip
```

**Windows:**
- Download from [BrowserStack](https://www.browserstack.com/local-testing/automate)
- Extract and run

### 4. Upload Test App

```bash
# Using the utility script
node browserstack-setup.js upload path/to/your/app.apk my-app-id

# Or using curl
curl -u "USERNAME:ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/app.apk"
```

## Project Setup

After setting up your platform:

1. **Clone repository**
   ```bash
   git clone https://github.com/dreamquality/detox-starter.git
   cd detox-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Detox CLI**
   ```bash
   npm install -g detox-cli
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Build app for testing** (if you have a React Native app)
   ```bash
   # iOS
   npm run build:e2e:ios:debug
   
   # Android
   npm run build:e2e:android:debug
   ```

6. **Run first test**
   ```bash
   # iOS
   npm run test:e2e:ios:debug
   
   # Android
   npm run test:e2e:android:debug
   ```

## Troubleshooting

### Common Issues

#### iOS: "applesimutils" not found
```bash
brew tap wix/brew
brew install applesimutils
```

#### Android: Emulator won't start
```bash
# Check available emulators
emulator -list-avds

# Start emulator manually
emulator -avd Pixel_5_API_31

# Check for conflicting processes
adb kill-server
adb start-server
```

#### Permission denied errors (Linux)
```bash
sudo usermod -aG kvm $USER
sudo usermod -aG plugdev $USER
# Log out and log back in
```

#### Node version issues
```bash
# Use nvm to manage Node versions
nvm install 18
nvm use 18
```

#### Port already in use
```bash
# Find and kill process using port 8081
lsof -ti:8081 | xargs kill -9

# Or use different port
RCT_METRO_PORT=8082 npm start
```

## Verifying Setup

Run the verification script:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check Detox
detox --version

# Check iOS setup (macOS only)
xcrun simctl list devices

# Check Android setup
adb version
emulator -list-avds

# Check BrowserStack (if configured)
node browserstack-setup.js devices
```

## Next Steps

- Review [README.md](../README.md) for usage instructions
- Check [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines
- Explore example tests in `e2e/tests/`
- Configure your own test scenarios

## Getting Help

- Check [Detox Documentation](https://wix.github.io/Detox/)
- Review [Troubleshooting Guide](./TROUBLESHOOTING.md)
- Open an issue on GitHub
- Check BrowserStack documentation

---

**Setup completed? Start writing tests!** 🚀
