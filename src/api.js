import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from './router'

const axiosApiInstance = axios.create();

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE;

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url;

  if (!url.includes('signInWithPassword') && !url.includes('signUp')) {
    const authStore = useAuthStore();
    let params = new URLSearchParams();
    params.append('auth', authStore.userInfo.token);
    config.params = params;
  }

  return config;
})

axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const authStore = useAuthStore();
  const originalRequest = error.config;
  console.log(error.response.status);
  console.log(originalRequest);
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const newTokens = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
        grant_type: 'refresh-token',
        refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
      })
      authStore.userInfo.token = newTokens.data.access_token;
      authStore.userInfo.refreshToken = newTokens.data.refresh_token;
      localStorage.setItem('userTokens', JSON.stringify({
        token: newTokens.data.access_token,
        refreshToken: newTokens.data.refresh_token
      }));
    } catch (err) {
      console.error(err)
      localStorage.removeItem('userTokens');
      router.push('/signin');
      authStore.userInfo.token = '';
      authStore.userInfo.refreshToken = '';
    }
    console.log(originalRequest)
  }
  
})


export default axiosApiInstance;


// Интерсепторы - это перехватчики, которые срабатывают при каждом запросе.

// interceptors.request - это то, что происходит, когда запрос отправляется.

// interceptors.response - это то, что происходит, когда к нам приходит ответ на запрос.
