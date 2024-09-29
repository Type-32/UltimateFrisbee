import type {Category} from "@prisma/client";
import {$fetch} from "ofetch";

export const useCategories = () => {
    const getCategories = async () =>{
        return useFetch<Category[]>('/api/v1/categories')
    }
    const getCategory = async (ids: number[]) => {
        return useFetch<Category[]>('/api/v1/categories', {
            method: 'GET',
            params: {
                ids: ids
            }
        })
    }
    const newCategory = async (name: string, token: string) => {
        return $fetch('/api/v1/category/new', {
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
        return $fetch('/api/v1/category/delete', {
            method: 'POST',
            body: {
                ids: ids
            },
            headers: {
                'Authorization': token
            }
        })
    }
    const editCategory = async (id: number, name: string, published: boolean, galleries: number[], token: string) => {
        return $fetch('/api/v1/category/edit', {
            method: 'POST',
            body: {
                id: id,
                name: name,
                published: published,
                galleries: galleries
            },
            headers: {
                'Authorization': token
            }
        })
    }

    return {
        getCategory,
        getCategories,
        editCategory,
        deleteCategory,
        newCategory,
    }
}