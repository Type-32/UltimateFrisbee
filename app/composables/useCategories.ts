import type {Category} from "@prisma/client";

export const useCategories = () => {
    const getCategories = async () =>{
        return useFetch<Category[]>('/api/v1/galleries')
    }
}