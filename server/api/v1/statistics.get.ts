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

        let wins = 0;
        let draws = 0;
        let loses = 0;
        let totalPoints = 0;

        totalMatches.forEach(match => {
            if (match.homeTeamId === team.id) {
                totalPoints += match.home_score;
                if (match.home_score > match.guest_score) {
                    wins++;
                } else if (match.home_score < match.guest_score) {
                    loses++;
                } else {
                    draws++;
                }
            } else if (match.guestTeamId === team.id) {
                totalPoints += match.guest_score;
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
        };
    });

    return teamStats;
})