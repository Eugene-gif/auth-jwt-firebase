// import './assets/main.css'
import "primevue/resources/themes/lara-light-indigo/theme.css"
import "primevue/resources/primevue.min.css"
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from "firebase/app";
import PrimeVue from 'primevue/config';
import '@/api'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: "AIzaSyAdqkWrQ-vkBazmTwrTkJvU9gUcBC0cqMc",
  authDomain: "auth-jwt-aa869.firebaseapp.com",
  projectId: "auth-jwt-aa869",
  storageBucket: "auth-jwt-aa869.appspot.com",
  messagingSenderId: "417140207220",
  appId: "1:417140207220:web:c9d46afa69f576c5b6ab21"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')



