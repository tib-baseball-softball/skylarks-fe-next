<script lang="ts">
    export let logo: string
    export let teamName: string
    export let score: string | null
    export let subduedScore: boolean
</script>

<div class="flex justify-between items-center">
    <img src="{logo}" alt="team logo for {teamName}" width="50"/>
    <span>{teamName}</span>
    <span class:text-surface-600-300-token={subduedScore} class="text-2xl font-extrabold ">{score ?? " "}</span>
</div>