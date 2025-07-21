import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b75c104ea5114c5d9c0e02207a7ba798',
  appName: 'Fix it Right',
  webDir: 'dist',
  server: {
    url: 'https://b75c104e-a511-4c5d-9c0e-02207a7ba798.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1976d2',
      showSpinner: false
    }
  }
};

export default config;