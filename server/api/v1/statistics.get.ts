import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const teams = await prisma.team.findMany({
        include: {
            homeMatches: true,
            guestMatches: true,
        },
    });

    const teamStats = teams.map(team => {
        const homeMatches = team.homeMatches;
        const guestMatches = team.guestMatches;

        const totalMatches = [...homeMatches, ...guestMatches];

        let wins: number = 0;
        let draws: number = 0;
        let loses: number = 0;
        let totalPoints: number = 0;

        totalMatches.forEach(match => {
            if (match.homeTeamId === team.id) {
                totalPoints += parseInt(match.home_score as any as string);
                if (match.home_score > match.guest_score) {
                    wins++;
                } else if (match.home_score < match.guest_score) {
                    loses++;
                } else {
                    draws++;
                }
            } else if (match.guestTeamId === team.id) {
                totalPoints += parseInt(match.guest_score as any as string);
                if (match.guest_score > match.home_score) {
                    wins++;
                } else if (match.guest_score < match.home_score) {
                    loses++;
                } else {
                    draws++;
                }
            }
        });

        return {
            teamName: team.team_name,
            wins,
            draws,
            loses,
            totalPoints,
            rank: 0
        };
    });

    teamStats.sort((a, b) => {
        return b.totalPoints - a.totalPoints; // Descending order
    });

    // Assign ranks after sorting
    teamStats.forEach((team, index) => {
        team.rank = index + 1;
    });

    return teamStats;
})