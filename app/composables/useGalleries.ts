import type {Gallery} from "@prisma/client";

export const useGalleries = () => {
    const getGalleries = async () =>{
        return useFetch<Gallery[]>('/api/v1/galleries')
    }
}