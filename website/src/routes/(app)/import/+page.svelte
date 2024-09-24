<script lang="ts">
	import { onMount } from "svelte"

	onMount(async () => {
		const convertImport = await import("@interface/utils/convert")
		const settingsImport = await import("@interface/stores/settings")

		const settings = settingsImport.getSettings()

		const fileUpload = document.getElementById("fileUpload")

		fileUpload.addEventListener("change", (event) => {
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
				}

				reader.readAsText(file)
			}
		})
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
