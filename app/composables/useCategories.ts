import type {Category, Gallery, Media} from "@prisma/client";
import {$fetch} from "ofetch";

export const useCategories = () => {
    const getCategories = async () =>{
        return await $fetch<Category[]>('/api/v1/categories')
    }
    const getCategory = async (ids: number[]) => {
        return await $fetch<Category[]>('/api/v1/categories', {
            method: 'GET',
            params: {
                ids: ids
            }
        })
    }
    const newCategory = async (name: string, token: string) => {
        return await $fetch('/api/v1/category/new', {
            method: 'POST',
            body: {
                name: name
            },
            headers: {
                'Authorization': token
            }
        })
    }
    const deleteCategory = async (ids: number[], token: string) => {
        return await $fetch('/api/v1/category/delete', {
            method: 'POST',
            body: {
                ids: ids
            },
            headers: {
                'Authorization': token
            }
        })
    }
    const editCategory = async (id: number, name: string, galleries: number[], token: string) => {
        return await $fetch('/api/v1/category/edit', {
            method: 'POST',
            body: {
                id: id,
                name: name,
                galleries: galleries
            },
            headers: {
                'Authorization': token
            }
        })
    }

    const getCategoryGalleries = async (id: number) => {
        return await $fetch<Gallery[]>(`/api/v1/category/gallery`, {
            method: 'GET',
            query: {
                id: id
            }
        })
    }

    return {
        getCategory,
        getCategories,
        editCategory,
        deleteCategory,
        newCategory,
        getCategoryGalleries
    }
}