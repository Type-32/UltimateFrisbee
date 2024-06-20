import type {Article} from "@prisma/client";

export default function useArticles(){
    async function getArticles(){
        return await $fetch('/api/v1/articles', {
            method: 'GET'
        })
    }

    async function getArticlesByIDs(ids: number[]){
        return await $fetch('/api/v1/articles', {
            method: 'GET',
            query: {
                ids: ids
            }
        })
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
        })
    }

    async function deleteArticle(id: number){
        return await $fetch('/api/v1/article/delete', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
    }
}