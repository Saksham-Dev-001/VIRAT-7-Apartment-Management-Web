import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAVwrAEwRdfzezhXapOsHGqBBhY6yPv9po",
  authDomain: "maintenance-app-4ecb8.firebaseapp.com",
  projectId: "maintenance-app-4ecb8",
  storageBucket: "maintenance-app-4ecb8.firebasestorage.app",
  messagingSenderId: "502422497802",
  appId: "1:502422497802:web:238d78cfd2f4a5f0b28df3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);