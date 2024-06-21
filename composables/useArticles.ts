import type {Article} from "@prisma/client";

export default function useArticles(){
    async function getArticles(fetchUnpublished: boolean = false) {
        //@ts-ignore
        return await $fetch('/api/v1/articles', {
            method: 'GET',
            query: {
                unpublished: fetchUnpublished,
            }
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

    async function getArticlesBySlug(slug: string){
        return await $fetch('/api/v1/article/get-slug', {
            method: 'GET',
            query: {
                slug: slug
            }
        }) as any as Article
    }

    async function editArticle(articleId: number, newTitle: string, newDesc: string, newContent: string, newPublish: boolean, token: string){
        return await $fetch('/api/v1/article/edit', {
            method: 'POST',
            body: JSON.stringify({
                id: articleId,
                title: newTitle,
                description: newDesc,
                content: newContent,
                published: newPublish
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Article
    }

    async function deleteArticle(id: number, token: string){
        return await $fetch('/api/v1/article/delete', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Article
    }

    async function newArticle(newSlug: string, newTitle: string, newDesc: string, newContent: string, newPublish: boolean, token: string){
        return await $fetch('/api/v1/article/new', {
            method: 'POST',
            body: JSON.stringify({
                slug: newSlug,
                title: newTitle,
                description: newDesc,
                content: newContent,
                published: newPublish
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Article
    }

    async function publishArticle(id: number, token: string) {
        return await $fetch('/api/v1/article/publish', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Article
    }

    async function unpublishArticle(id: number, token: string) {
        return await $fetch('/api/v1/article/unpublish', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Article
    }

    return {
        getArticles,
        getArticlesByIDs,
        getArticlesBySlug,
        editArticle,
        newArticle,
        publishArticle,
        unpublishArticle,
        deleteArticle
    }
}