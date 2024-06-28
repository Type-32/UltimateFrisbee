import type {Match} from "@prisma/client";

export default function useMatches(){
    async function getMatches() {
        //@ts-ignore
        return await $fetch('/api/v1/matches', {
            method: 'GET'
        }) as any[] as Match[];
    }

    async function getMatchesByIDs(ids: number[]){
        //@ts-ignore
        return await $fetch('/api/v1/matches', {
            method: 'GET',
            query: {
                ids: ids
            }
        }) as any[] as Match[]
    }

    async function editMatch(matchId: number, matchName: string, token: string){
        return await $fetch('/api/v1/match/edit', {
            method: 'POST',
            body: JSON.stringify({
                id: matchId,
                name: matchName
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Match
    }

    async function deleteMatch(id: number, token: string){
        return await $fetch('/api/v1/match/delete', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Match
    }

    async function newMatch(matchName: string, matchBanner: File, token: string){
        return await $fetch('/api/v1/match/new', {
            method: 'POST',
            body: JSON.stringify({
                name: matchName,
                banner: matchBanner
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Match
    }

    return {
        getMatches,
        getMatchesByIDs,
        editMatch,
        newMatch,
        deleteMatch
    }
}