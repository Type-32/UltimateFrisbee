import type {Article} from "@prisma/client";

export default function useArticles(){
    async function getArticles() {
        return await $fetch('/api/v1/articles', {
            method: 'GET'
        }) as any[] as Article[];
    }

    async function getArticlesByIDs(ids: number[]){
        return await $fetch('/api/v1/articles', {
            method: 'GET',
            query: {
                ids: ids
            }
        }) as any[] as Article[]
    }

    async function editArticle(articleId: number, newTitle: string, newDesc: string, newContent: string, newPublish: boolean){
        return await $fetch('/api/v1/article/edit', {
            method: 'POST',
            body: JSON.stringify({
                id: articleId,
                title: newTitle,
                description: newDesc,
                content: newContent,
                published: newPublish
            })
        }) as any as Article
    }

    async function deleteArticle(id: number){
        return await $fetch('/api/v1/article/delete', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        }) as any as Article
    }

    async function newArticle(newSlug: string, newTitle: string, newDesc: string, newContent: string, newPublish: boolean){
        return await $fetch('/api/v1/article/edit', {
            method: 'POST',
            body: JSON.stringify({
                slug: newSlug,
                title: newTitle,
                description: newDesc,
                content: newContent,
                published: newPublish
            })
        }) as any as Article
    }

    async function publishArticle(id: number) {
        return await $fetch('/api/v1/article/publish', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            })
        }) as any as Article
    }

    async function unpublishArticle(id: number) {
        return await $fetch('/api/v1/article/unpublish', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            })
        }) as any as Article
    }

    return {
        getArticles,
        getArticlesByIDs,
        editArticle,
        newArticle,
        publishArticle,
        unpublishArticle,
    }
}