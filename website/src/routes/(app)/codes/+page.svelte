<script lang="ts">
	import { onDestroy, onMount } from "svelte"
	import type {} from "@interface/utils/types.d.ts"
	import { TOTP } from "otpauth"

	$: codes = {
		names: [],
		secrets: [],
		issuers: [],
		types: [],
	} as LibImportFile
	let codesRefresher: NodeJS.Timeout
	let noCodes = false

	const getInitialCode = (i: number) => {
		const token = new TOTP({
			secret: codes.secrets[i],
		}).generate()

		return token
	}

	const refreshCodes = () => {
		setTimeout(() => {
			for (let i = 0; i < codes.secrets.length; i++) {
				const button = document.querySelector(`#button${i}`)

				button.addEventListener("click", () => {
					const currentCode = document.querySelector(`#code${i}`).textContent
					navigator.clipboard.writeText(currentCode)

					button.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
					`

					setTimeout(() => {
						button.innerHTML = `
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
						`
					}, 800)
				})
			}
		}, 100)

		codesRefresher = setInterval(() => {
			try {
				for (let i = 0; i < codes.secrets.length; i++) {
					const code = document.querySelector(`#code${i}`)
					const progress = document.querySelector(`#progress${i}`)

					// generate token
					const token = new TOTP({
						secret: codes.secrets[i],
					}).generate()

					// generate time
					const remainingTime = 30 - Math.floor((new Date(Date.now()).getTime() / 1000.0) % 30)

					// progress bar
					const value = remainingTime * (100 / 30)
					progress.style.width = `${value}%`

					// set content
					code.textContent = token
				}
			} catch (error) {
				console.error("Error refreshing codes")
			}
		}, 500)
	}

	onMount(async () => {
		const convertImport = await import("@interface/utils/convert")
		const settingsImport = await import("@interface/stores/settings")

		const settings = settingsImport.getSettings()

		if (settings.vault.codes !== null) {
			const importString = settings.vault.codes

			const data = convertImport.textConverter(importString, settings.settings.sortCodes)
			codes = data
			refreshCodes()
		} else {
			noCodes = true
		}

		document.querySelector("#con").classList.remove("hidden")
	})

	onDestroy(() => {
		clearInterval(codesRefresher)
	})
</script>

<div class="flex justify-center items-start">
	<div id="con" class="transparent-900 p-5 hidden rounded-xl main m-auto my-20 w-[95%] text-center lg:w-2/3">
		<div class="content mx-auto flex flex-row flex-wrap items-center justify-center gap-5">
			{#if codes !== undefined}
				{#each codes.issuers as item, i}
					<div class="transparent-800 p-4 rounded-xl w-full">
						<div class="flex flex-row justify-between">
							<div class="flex flex-col justify-start mb-3">
								<div class="flex">
									<p class="text-2xl font-medium whitespace-nowrap">
										{#if item.length > 16}
											{item.slice(0, 16)}...
										{:else}
											{item}
										{/if}
									</p>
								</div>

								<div class="flex">
									<p class="text-2xl text-gray-200" id={`code${i}`}>{getInitialCode(i)}</p>
								</div>
							</div>

							<div class="flex items-center justify-between mb-3">
								<button
									id={`button${i}`}
									class="bg-white flex size-14 justify-center items-center font-medium rounded-2xl gap-1 hover:bg-gray-200 duration-200 px-4 text-black text-lg py-2"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-clipboard"
										><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path
											d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
										/></svg
									>
								</button>
							</div>
						</div>

						<div class="progressFull">
							<div id={`progress${i}`} class="progressFill" />
						</div>
					</div>
				{/each}
			{/if}

			{#if noCodes}
				<div class="flex flex-col items-center justify-center gap-3">
					<h1 class="text-2xl">No codes found</h1>
					<a href="/import" class="button">Import codes</a>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* progress bar */
	.progressFull {
		position: relative;
		width: 100%;
		height: 15px;
		background: hsla(0, 0%, 100%, 5.12%);
		border-radius: 30px;
		overflow: hidden;
	}

	.progressFill {
		width: 0%;
		height: 100%;
		background: white;
		transition: all 0.2s;
	}

	/* backdrops */
	.transparent-900 {
		background-color: hsla(0, 0%, 100%, 5.12%);
	}

	.transparent-800 {
		background-color: hsla(0, 0%, 100%, 3.26%);
	}
</style>
