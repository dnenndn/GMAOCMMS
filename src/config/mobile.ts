export const mobileConfig = {
  api: {
    version: 'v1',
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    }
  },
  features: {
    qrScanning: true,
    offlineMode: true,
    pushNotifications: false,
    cameraUpload: true,
    locationTracking: true
  }
};
