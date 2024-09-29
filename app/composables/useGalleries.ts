import type {Gallery, Media} from "@prisma/client";
import {$fetch} from "ofetch";

export const useGalleries = () => {
    const getGalleries = async (getUnpublished: boolean = false) =>{
        return await $fetch('/api/v1/galleries', {
            method: "GET",
            query: {
                getUnpublished: getUnpublished,
            }
        })
    }
    const getGallery = async (ids: number[], getUnpublished: boolean = false) => {
        return await $fetch<Gallery[]>('/api/v1/galleries', {
            method: 'GET',
            query: {
                ids: ids,
                getUnpublished: getUnpublished
            }
        })
    }
    const getGalleryMedia = async (id: number) => {
        return await $fetch<Media[]>(`/api/v1/gallery/media`, {
            method: 'GET',
            query: {
                id: id
            }
        })
    }
    const newGallery = async (name: string, token: string) => {
        return await $fetch('/api/v1/gallery/new', {
            method: 'POST',
            body: {
                name: name
            },
            headers: {
                'Authorization': token
            }
        })
    }
    const deleteGallery = async (ids: number[], token: string) => {
        return await $fetch('/api/v1/gallery/delete', {
            method: 'POST',
            body: {
                ids: ids
            },
            headers: {
                'Authorization': token
            }
        })
    }
    const editGallery = async (id: number, name: string, published: boolean, medias: number[], token: string) => {
        return await $fetch('/api/v1/gallery/edit', {
            method: 'POST',
            body: {
                id: id,
                name: name,
                published: published,
                medias: medias
            },
            headers: {
                'Authorization': token
            }
        })
    }

    async function publishGallery(id: number, token: string) {
        return await $fetch('/api/v1/gallery/publish', {
            method: 'POST',
            body: ({
                id: id,
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Gallery
    }

    async function unpublishGallery(id: number, token: string) {
        return await $fetch('/api/v1/gallery/unpublish', {
            method: 'POST',
            body: ({
                id: id,
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Gallery
    }

    return {
        getGallery,
        getGalleries,
        editGallery,
        deleteGallery,
        newGallery,
        publishGallery,
        unpublishGallery,
        getGalleryMedia
    }
}