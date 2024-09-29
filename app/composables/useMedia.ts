import type { Media } from "@prisma/client";
import {$fetch} from "ofetch";

interface DirectoryContent {
    currentDirectory: string;
    parentDirectory: string | null;
    items: (Media & { type: 'file' | 'folder' })[];
}

interface StructuredMedia {
    [key: string]: {
        files: Media[];
        folders: StructuredMedia;
    };
}

interface CreateDirectoryResponse {
    success: boolean;
    message: string;
}

interface MoveFileResponse {
    success: boolean;
    message: string;
}

interface DeleteFileResponse {
    success: boolean;
    message: string;
}

interface UploadFileResponse {
    success: boolean;
    permalink: string;
}

export const useMedia = () => {
    const config = useRuntimeConfig();

    const createDirectory = async (targetPath: string, folderName: string) => {
        return useFetch<CreateDirectoryResponse>('/api/v1/media/new-dir', {
            method: 'POST',
            body: { targetPath: targetPath, folderName: folderName },
            headers: {
                'Authorization': useCookie('session_token').value || ''
            }
        });
    };

    const moveFile = async (sourcePath: string, destPath: string) => {
        return useFetch<MoveFileResponse>('/api/v1/media/move', {
            method: 'POST',
            body: { sourcePath, destPath },
        });
    };

    const deleteFile = async (targetPath: string) => {
        return useFetch<DeleteFileResponse>('/api/v1/media/delete', {
            method: 'POST',
            body: { targetPath },
        });
    };

    const uploadFile = async (file: File, path: string) => {
        const formData = new FormData();
        formData.append('file', file);

        return useFetch<UploadFileResponse>('/api/v1/media/upload', {
            method: 'POST',
            body: formData,
            query: {
                targetPath: path,
            },
            headers: {
                'Authorization': useCookie('session_token').value || ''
            }
        });
    };

    const getMediaUrl = (media: Media) => {
        return `${config.public.siteUrl}${media.url}`;
    };

    const wrapMediaUrlStump = (url: string) => {
        return `${config.public.siteUrl}${url}`;
    }

    const getMedia = async (id: number) => {
        return await $fetch<Media>(`/api/v1/media/fetch`, {
            method: 'GET',
            query: {
                id: id,
            }
        })
    }

    const listMedia = async () => {
        return useFetch<StructuredMedia>('/api/v1/media/list');
    };

    const listDirectory = async (directory: string = '', lazy: boolean = true, realtime: boolean = false) => {
        if(!realtime)
            return useFetch<DirectoryContent>('/api/v1/media/list-dir', {
                params: { directory },
                lazy: lazy
            });
        else
            return await $fetch('/api/v1/media/list-dir', {
                query: {
                    directory: directory,
                }
            })
    };

    const deleteBatch = async (ids: number[]) => {
        return useFetch<{ success: boolean; message: string }>('/api/v1/media/delete-batch', {
            method: 'POST',
            body: { ids },
        });
    };

    const moveBatch = async (ids: number[], destination: string) => {
        return useFetch<{ success: boolean; message: string }>('/api/v1/media/move-batch', {
            method: 'POST',
            body: { ids, destination },
        });
    };

    return {
        createDirectory,
        moveFile,
        deleteFile,
        uploadFile,
        getMediaUrl,
        listMedia,
        listDirectory,
        deleteBatch,
        moveBatch,
        getMedia,
        wrapMediaUrlStump
    };
}