export const MAIN_BOX_PADDING_X = [2, 3, 4]

export const NODE_ENV = process.env.NODE_ENV ?? 'development'

export const FIREBASE_CONFIG = {
  apiKey:
    process.env.NEXT_PUBLIC_FB_API_KEY ??
    'AIzaSyDltmOfBGWKCR4ltboWrr7nGirP5vGu-Dg',
  authDomain:
    process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN ?? 'opthub-portal.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? 'opthub-portal',
  storageBucket:
    process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET ??
    'opthub-portal.firebasestorage.app',
  messagingSenderId:
    process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID ?? '456622558044',
  appId:
    process.env.NEXT_PUBLIC_FB_APP_ID ??
    '1:456622558044:web:1e3518677a5281c3a54f99',
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID ?? 'G-CYMF9TJ2QX'
}

export const USE_EMULATOR = process.env.NEXT_PUBLIC_USE_EMULATOR === 'true'
