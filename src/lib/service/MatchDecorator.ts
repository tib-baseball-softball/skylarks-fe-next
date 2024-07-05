import type {Match} from "bsm.js";
import {PUBLIC_TEAM_NAME} from "$env/static/public";
import {GameWinner} from "$lib/enum/GameWinner";
import {MatchState} from "$lib/enum/MatchState";

/**
 * This class exists so that I can have methods on the BSM interface `Match` which is a POJO when deserialized from JSON.
 */
export class MatchDecorator {
    private readonly match: Match

    constructor(match: Match) {
        this.match = match
    }

    public isDerby(): boolean {
        return this.match.home_team_name.includes(PUBLIC_TEAM_NAME) && this.match.away_team_name.includes(PUBLIC_TEAM_NAME)
    }

    public getWinnerForMatch(): GameWinner {
        if (!this.match?.home_runs || !this.match?.away_runs) {
            return GameWinner.none
        }

        if ((this.match.home_runs) > (this.match.away_runs)) {
            return GameWinner.home
        } else if ((this.match.away_runs) > (this.match.home_runs)) {
            return GameWinner.away
        } else {
            return GameWinner.none
        }
    }

    public getMatchState(): MatchState {
        if (this.match.state === "planned") {
            return MatchState.notYetPlayed
        }

        if (this.match.state === "cancelled" || this.match.state === "canceled") {
            return MatchState.cancelled
        }

        if (this.isDerby()) {
            return MatchState.derby
        }

        const winner = this.getWinnerForMatch()
        if (
            (winner === GameWinner.home && this.match.home_team_name.includes(PUBLIC_TEAM_NAME)) ||
            (winner === GameWinner.away && this.match.away_team_name.includes(PUBLIC_TEAM_NAME))
        ) {
            return MatchState.won
        } else if (
            (winner === GameWinner.away && this.match.home_team_name.includes(PUBLIC_TEAM_NAME)) ||
            (winner === GameWinner.home && this.match.away_team_name.includes(PUBLIC_TEAM_NAME))
        ) {
            return MatchState.lost
        } else {
            return MatchState.final
        }
    }
}