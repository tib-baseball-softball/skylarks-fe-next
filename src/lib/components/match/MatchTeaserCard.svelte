<script lang="ts">
    import type {Match} from "../../../../../bsm.js/src/model/Match";
    import {LogoUtility} from "$lib/service/LogoUtility";
    import MatchTeaserCardRow from "$lib/components/match/MatchTeaserCardRow.svelte";
    import {MatchUtility} from "$lib/service/MatchUtility";
    import {GameWinner} from "$lib/enum/GameWinner";
    import {DateTimeUtility} from "$lib/service/DateTimeUtility";

    export let match: Match

    const awayLogo = LogoUtility.getLogoPathForTeamName(match.away_team_name)
    const homeLogo = LogoUtility.getLogoPathForTeamName(match.home_team_name)

    const winner = MatchUtility.getWinnerForMatch(match)
    const matchDate = DateTimeUtility.parseDateFromBSMString(match.time)
</script>

<a class="block card card-hover variant-ghost-surface" href="gamecenter/game-detail/{match.id}">
    <header class="card-header">
        <h3 class="text-lg font-medium">{match.league.name}</h3>
        <p>{DateTimeUtility.dateTimeFormatMedium.format(matchDate)}</p>
    </header>
    <hr class="mt-2 mx-3"/>
    <section class="p-4 flex flex-col gap-2">
        <MatchTeaserCardRow logo="{awayLogo}" teamName="{match.away_team_name}" score="{match.away_runs}" subduedScore="{winner === GameWinner.home}"/>
        <MatchTeaserCardRow logo="{homeLogo}" teamName="{match.home_team_name}" score="{match.home_runs}" subduedScore="{winner === GameWinner.away}"/>
    </section>
</a>