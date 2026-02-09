import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDE606_BDXR7gJLVliuRIpYn5BcEtxJLfw",
  authDomain: "bookapp-8198b.firebaseapp.com",
  projectId: "bookapp-8198b",
  storageBucket: "bookapp-8198b.firebasestorage.app",
  messagingSenderId: "466075315177",
  appId: "1:466075315177:web:e514a2c87acdbd421d3978",
  measurementId: "G-ZR3J8W9ZC2"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Obligatorio para Firebase
    provideRouter(routes), 
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};