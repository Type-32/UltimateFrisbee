import type {Match} from "@prisma/client";

export default function useMatches(){
    async function getMatches(pageIndex: number = 0, pageSize: number = 9){
        //@ts-ignore
        return await $fetch('/api/v1/matches', {
            method: 'GET',
            query: {
                pagination: pageIndex,
                paginationPerPage: pageSize,
            }
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

    async function editMatch(matchId: number, homeId: number, guestId: number, homeScore: number, guestScore: number, token: string){
        return await $fetch('/api/v1/match/edit', {
            method: 'POST',
            body: ({
                id: matchId,
                homeId: homeId,
                guestId: guestId,
                homeScore: homeScore,
                guestScore: guestScore,
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Match
    }

    async function deleteMatch(id: number, token: string){
        return await $fetch('/api/v1/match/delete', {
            method: 'POST',
            body: ({
                id: id
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Match
    }

    async function newMatch(homeTeamId: number, guestTeamId: number, token: string){
        return await $fetch('/api/v1/match/new', {
            method: 'POST',
            body: ({
                home: homeTeamId,
                guest: guestTeamId,
                homeScore: 0,
                guestScore: 0,
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