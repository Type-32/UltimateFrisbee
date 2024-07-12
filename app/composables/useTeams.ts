import type {Team} from "@prisma/client";

export default function useTeams(){
    async function getTeams() {
        //@ts-ignore
        return await $fetch('/api/v1/teams', {
            method: 'GET'
        }) as any[] as Team[];
    }

    async function getTeamsByIDs(ids: number[]){
        //@ts-ignore
        return await $fetch('/api/v1/teams', {
            method: 'GET',
            query: {
                ids: ids
            }
        }) as any[] as Team[]
    }

    async function editTeam(teamId: number, teamName: string, teamDesc: string, teamAbbv: string, token: string){
        return await $fetch('/api/v1/team/edit', {
            method: 'POST',
            body: ({
                id: teamId,
                name: teamName,
                desc: teamDesc,
                abbv: teamAbbv
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Team
    }

    async function editTeamBanner(teamId: number, teamBanner: File, token: string){
        return await $fetch('/api/v1/team/edit-banner', {
            method: 'POST',
            body: ({
                id: teamId,
                banner: teamBanner
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Team
    }

    async function deleteTeam(id: number, token: string){
        return await $fetch('/api/v1/team/delete', {
            method: 'POST',
            body: ({
                id: id
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Team
    }

    async function newTeam(teamName: string, teamDesc: string, teamAbbv: string, token: string){
        return await $fetch('/api/v1/team/new', {
            method: 'POST',
            body: ({
                name: teamName,
                desc: teamDesc || '',
                abbv: teamAbbv
            }),
            headers: {
                'Authorization': token
            }
        }) as any as Team
    }

    return {
        getTeams,
        getTeamsByIDs,
        editTeam,
        editTeamBanner,
        newTeam,
        deleteTeam
    }
}