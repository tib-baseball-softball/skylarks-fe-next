import {client} from "$lib/pocketbase";
import {error} from "@sveltejs/kit";

export const load = (async ({ parent, params }) => {
    const data = await parent()
    const teams = await data.teams
    
    let team = teams.find((team) => team.id === params.id)
    
    if (!team) {
        team = await client.collection("teams").getOne(params.id)
    }
    if (!team) throw error(404, "Team nicht gefunden")
    
    const events = client.collection("events").getList(1, 50, {
        filter: `starttime >= @todayStart && team = "${team.id}"`,
        sort: '+starttime',
        expand: "participants",
    })
    
    return {
        team: team,
        events: events,
    }
})