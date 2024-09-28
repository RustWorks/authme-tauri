<script lang="ts">
	import build from "../../../../../build.json"

	const about = () => {
		alert(
			`Authme: ${build.version} \n\nRelease date: ${build.date} \nBuild number: ${build.number} \n\nCreated by: Lőrik Levente`,
		)
	}
</script>

<div class="min-h-screen flex justify-center items-start">
	<div class="transparent-900 p-5 rounded-xl main m-auto my-20 w-[95%] lg:w-2/3">
		<div class="flex flex-col justify-start items-start">
			<h1 class="text-2xl">About Authme</h1>
			<h2 class="text-xl text-gray-200">Information about your Authme build and your computer.</h2>
			<input class="hidden" type="file" id="fileUpload" accept=".authme" />
			<button class="button mt-3" on:click={about}>About</button>
		</div>
	</div>
</div>
