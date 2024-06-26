// middleware/authMiddleware.js
export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const auth = useAuth();

        // console.log(auth.isAuthenticated)
        await auth.validateToken()

        if (!auth.isAuthenticated) {
            return navigateTo('/auth');
        }

        console.log("checked middleware")
    } catch (e: any){
        const $toast = useToast()
        console.log("there is error in middleware")
        $toast.add({description: e.message, color:'red'})
        return navigateTo('/auth');
    }
});