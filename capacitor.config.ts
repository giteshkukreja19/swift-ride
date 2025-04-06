
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6826ecf61c594183bde513eafc891b1a',
  appName: 'swift-ride-rescue-web',
  webDir: 'dist',
  server: {
    url: 'https://6826ecf6-1c59-4183-bde5-13eafc891b1a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#E82127",
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;
