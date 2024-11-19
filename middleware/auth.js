// middleware/auth.js
export default defineNuxtRouteMiddleware(() => {
    const token = useLocalStorage('token'); // استرجاع التوكن من localStorage
  
    if (!token.value) {
      // إذا لم يوجد توكن، اعادة التوجيه إلى صفحة تسجيل الدخول
      return navigateTo('/login');
    }
  });
  