// middleware/authMiddleware.js
export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuth();

    // console.log(auth.isAuthenticated)
    await auth.validateToken()

    if (!auth.isAuthenticated) {
        return navigateTo('/auth');
    }
});