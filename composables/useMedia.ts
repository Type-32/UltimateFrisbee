import type { Media } from "@prisma/client";

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

export default function useMedia() {
    const config = useRuntimeConfig();

    const createDirectory = async (dirPath: string) => {
        return useFetch<CreateDirectoryResponse>('/api/v1/media/new-dir', {
            method: 'POST',
            body: { dirPath },
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

    const uploadFile = async (file: File, name: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        return useFetch<UploadFileResponse>('/api/v1/media/upload', {
            method: 'POST',
            body: formData,
        });
    };

    const getMediaUrl = (media: Media) => {
        return `${config.public.siteUrl}${media.url}`;
    };

    const listMedia = async () => {
        return useFetch<StructuredMedia>('/api/media/list');
    };

    const listDirectory = async (directory: string = '/') => {
        return useFetch<DirectoryContent>('/api/media/listDirectory', {
            params: { directory }
        });
    };

    const deleteBatch = async (ids: number[]) => {
        return useFetch<{ success: boolean; message: string }>('/api/media/delete-batch', {
            method: 'POST',
            body: { ids },
        });
    };

    const moveBatch = async (ids: number[], destination: string) => {
        return useFetch<{ success: boolean; message: string }>('/api/media/move-batch', {
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
        moveBatch
    };
}