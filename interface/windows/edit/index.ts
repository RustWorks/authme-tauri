import { textConverter } from "../../utils/convert"
import { dialog } from "@tauri-apps/api"
import { getSettings, setSettings } from "../../stores/settings"
import { navigate } from "../../utils/navigate"
import { decryptData, encryptData } from "interface/utils/encryption"
import { getLanguage } from "@utils/language"

const settings = getSettings()
const language = getLanguage()
let names: string[] = []
let issuers: string[] = []
let secrets: string[] = []
let uniqIds: string[] = []

/**
 * Generate the edit elements from the saved codes
 */
const generateEditElements = () => {
	document.querySelector(".loadedCodes").style.display = "block"

	for (let i = 0; i < names.length; i++) {
		// create div
		const element = document.createElement("div")

		// set div content
		element.innerHTML = `
		<div class="flex flex-wrap gap-3">
				<div>
					<h5>${language.common.name}</h5>
					<input id="issuer${uniqIds[i]}" class="input mt-1" type="text" value="${issuers[i]}" readonly />
				</div>

				<div>
					<h5>${language.common.description}</h5>
					<input id="name${uniqIds[i]}" class="input mt-1 w-96" type="text" value="${names[i]}" readonly />
				</div>
			</div>
			<div class="ml-10 flex gap-3 flex-wrap sm:mt-10 sm:w-full sm:ml-0">
				<button id="editCode${uniqIds[i]}" class="button">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
					${language.common.edit}
				</button>

				<button id="deleteCode${uniqIds[i]}" class="button">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
					${language.common.delete}
				</button>
			</div>`

		// add div
		element.classList.add("edit")
		element.setAttribute("id", `edit${uniqIds[i]}`)

		document.querySelector(".content").appendChild(element)

		document.querySelector(`#editCode${uniqIds[i]}`).addEventListener("click", () => {
			editCode(uniqIds[i])
		})

		document.querySelector(`#deleteCode${uniqIds[i]}`).addEventListener("click", () => {
			deleteCode(uniqIds[i])
		})
	}
}

/**
 * Load the saved codes
 */
export const loadSavedCodes = async () => {
	const codes = settings.vault.codes

	if (codes === null) {
		dialog.message(language.codes.dialog.noSaveFileFound, { type: "error" })

		return navigate("import")
	}

	const decryptedText = await decryptData(codes)
	const data = textConverter(decryptedText, 0)

	names = data.names
	issuers = data.issuers
	secrets = data.secrets
	uniqIds = data.uniqIds

	generateEditElements()
}

/**
 * Save the current changes
 */
export const saveChanges = async () => {
	let saveText = ""

	for (let i = 0; i < names.length; i++) {
		const string = `\nName:   ${names[i]} \nSecret: ${secrets[i]} \nIssuer: ${issuers[i]} \nType:   OTP_TOTP\n`
		saveText += string
	}

	const encryptedText = await encryptData(saveText)

	settings.vault.codes = encryptedText
	setSettings(settings)
}

/**
 * Edit a specific code
 */
export const editCode = async (uniqId: string) => {
	const id = uniqIds.indexOf(uniqId)

	const issuer: HTMLInputElement = document.querySelector(`#issuer${uniqId}`)
	const name: HTMLInputElement = document.querySelector(`#name${uniqId}`)

	issuer.focus()
	const length = issuer.value.length
	issuer.setSelectionRange(length, length)

	if (issuer.readOnly === true) {
		issuer.readOnly = false
		name.readOnly = false

		issuer.style.color = "#28A443"
		name.style.color = "#28A443"
	} else {
		issuer.readOnly = true
		name.readOnly = true

		issuer.style.color = "white"
		name.style.color = "white"

		const newIssuer = document.querySelector(`#issuer${uniqId}`).value
		const newName = document.querySelector(`#name${uniqId}`).value

		const res = await dialog.ask(language.edit.dialog.saveChanges, { type: "warning" })

		if (res === true) {
			issuers[id] = newIssuer
			names[id] = newName

			saveChanges()
		} else {
			issuer.value = issuers[id]
			name.value = names[id]
		}
	}
}

/**
 * Delete a specific code
 */
export const deleteCode = async (uniqId: string) => {
	const id = uniqIds.indexOf(uniqId)

	const res = await dialog.ask(language.edit.dialog.deleteCode, { type: "warning" })

	if (res === true) {
		names.splice(id, 1)
		secrets.splice(id, 1)
		issuers.splice(id, 1)

		document.querySelector(`#edit${uniqId}`).remove()

		saveChanges()
	}
}
