export const dashboardStore = defineStore('dashboardStore', {
    state: () => ({
        articles: [] as any[]
    }),
    actions: {
        async fetch() {

        },
        async fetchArticles(force: boolean = false){
            const $util = useArticles()
            if(!this.articles || force){
                this.articles = await $util.getArticles()
            }

            return this.articles
        }
    }
})
