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
		console.log(fileUpload)
		fileUpload.addEventListener("change", fileChange)

		return () => {
			fileUpload.removeEventListener("change", fileChange)
		}
	})
</script>

<div class="min-h-screen flex justify-center items-start">
	<div
		class="transparent-900 p-3 sm:p-10 rounded-xl main m-auto my-20 w-[95%] text-center lg:w-2/3"
	>
		<h1>import</h1>
		<input type="file" id="fileUpload" accept=".authme" />
	</div>
</div>
