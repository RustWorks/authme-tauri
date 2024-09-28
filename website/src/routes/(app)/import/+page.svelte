<script lang="ts">
	import { goto } from "$app/navigation"
	import { onMount } from "svelte"

	onMount(() => {
		const fileChange = async (event: Event) => {
			const convertImport = await import("@interface/utils/convert")
			const settingsImport = await import("@interface/stores/settings")

			const settings = settingsImport.getSettings()

			// @ts-ignore
			const file = event.target.files[0]

			if (file) {
				const reader = new FileReader()

				reader.onload = (event) => {
					const file: LibAuthmeFile = JSON.parse(event.target.result.toString())

					const importString = convertImport.decodeBase64(file.codes)

					const data = convertImport.textConverter(importString, settings.settings.sortCodes)

					// save data
					settings.vault.codes = importString
					settingsImport.setSettings(settings)
					goto("/codes")
				}

				reader.readAsText(file)
			}
		}

		const fileUpload = document.getElementById("fileUpload")
		fileUpload.addEventListener("change", fileChange)

		return () => {
			fileUpload.removeEventListener("change", fileChange)
		}
	})
</script>

<div class="min-h-screen flex justify-center items-start">
	<div class="transparent-900 p-5 rounded-xl main m-auto my-20 w-[95%] lg:w-2/3">
		<div class="flex flex-col justify-start items-start">
			<h1 class="text-2xl">Import from .authme file</h1>
			<h2 class="text-xl text-gray-200">
				Import all codes from an existing Authme import file you exported from Authme.
			</h2>
			<input class="hidden" type="file" id="fileUpload" accept=".authme" />
			<button class="button mt-3" on:click={() => document.getElementById("fileUpload").click()}
				>Choose file</button
			>
		</div>
	</div>
</div>
