import type {LayoutServerLoad} from "../../.svelte-kit/types/src/routes/$types";
import {LeagueGroupAPIRequest} from "bsm.js";
import {BSM_API_KEY} from "$env/static/private";
import {get} from "svelte/store";
import {preferences} from "$lib/stores";
import {ClubTeamsAPIRequest} from "bsm.js";
import {PUBLIC_CLUB_ID} from "$env/static/public";

export const load = (async () => {
    const leagueGroupRequest = new LeagueGroupAPIRequest(BSM_API_KEY)
    const clubTeamRequest = new ClubTeamsAPIRequest(BSM_API_KEY)

    return {
        clubTeams: clubTeamRequest.getTeamsForClub(Number(PUBLIC_CLUB_ID)),
        leagueGroups: leagueGroupRequest.getLeagueGroupsForClub(get(preferences).selectedSeason)
    }
}) satisfies LayoutServerLoad