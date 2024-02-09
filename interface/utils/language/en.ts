export const localeEN = {
	common: {
		confirm: "Confirm",
		continue: "Continue",
		cancel: "Cancel",
		close: "Close",
		copy: "Copy",
		copied: "Copied",
		moreOptions: "More options",
		name: "Name",
		description: "Description",
		edit: "Edit",
		delete: "Delete",
	},

	menu: {
		codes: "Codes",
		import: "Import",
		export: "Export",
		edit: "Edit",
		settings: "Settings",
		show: "Show Authme",
		exit: "Exit Authme",
	},

	landing: {
		welcome: "Welcome!",
		gettingStarted: "Getting started",
		gettingStartedText: "Choose how you want to use Authme.",
		passwordAuth: "Password authentication",
		passwordAuthText: "You have to type in a password every time you launch Authme.",
		noAuth: "No authentication",
		noAuthText: "If you don't want to type in a password every time you launch Authme.",
		hardwareAuth: "Hardware authentication",
		hardwareAuthText: "Confirm important actions with Windows Hello, Touch ID or any WebAuthn compatible hardware key.",
		createPass: "Create password",
		createPassText: "Create a strong password to encrypt your codes.",
		password: "Password",
		confirmPassword: "Confirm password",
		chooseDifferent: "Choose a different authentication",
		chooseDifferentText: "Go back to the previous page and choose a different authentication method.",
		goBack: "Go back",
		dialog: {
			passwordsNotMatch: "Passwords don't match. \n\nPlease try again!",
			passwordMinLength: "Minimum password length is 8 characters. \n\nPlease try again!",
			passwordMaxLength: "Maximum password length is 64 characters. \n\nPlease try again!",
			commonPassword: "This password is on the list of the top 1000 most common passwords. Please choose a more secure password!",
		},
	},

	confirm: {
		welcomeBack: "Welcome back!",
		confirmPassword: "Confirm password",
		confirmPasswordText: "Please enter your password to continue.",
		password: "Password",
		forgotPassword: "Forgot password?",
		forgotPasswordText: "Your codes are protected by your password. If you forgot your password you can't access your codes.",
		dialog: {
			wrongPassword: "Wrong password! \n\nPlease try again!",
		},
	},

	codes: {
		importCodes: "Import your 2FA codes",
		importCodesText: "Import your existing 2FA codes on the Import page.",
		importCodesButton: "Import codes",
		noSearchResultsFound: "No search results found",
		noSearchResultsFoundText: "Not found search results for",
		dialog: {
			noSaveFileFound: "No save file found. \n\nGo to the codes or the import page and import your codes!",
			codesImported: "Codes imported. \n\nYou can edit your codes on the edit page.",
		},
	},

	import: {
		supportedTypes: "Supported 2FA types",
		totpQRCode: "TOTP QR code",
		totpQRCodeText: "A TOTP QR code is what you find mostly everywhere, if you want to setup 2FA. Consist of 6 digits which are changing every 30 seconds.",
		instructions: "Instructions",
		googleAuthQRCode: "Google Authenticator QR code",
		googleAuthQRCodeText: "If you are using Google Authenticator you can export all of your exiting codes and import them to Authme.",
		chooseImportMethod: "Choose import method",
		importFromImage: "Import from image",
		importFromImageText: "Choose an image that contains a compatible QR code.",
		chooseImageButton: "Choose image",
		enterSecretManually: "Enter a setup key",
		enterSecretManuallyText: "Enter a TOTP secret key and name.",
		enterSecretManuallyButton: "Setup a key",
		screenCapture: "Screen capture",
		screenCaptureText: "Capture a 2FA QR code from your screen.",
		screenCaptureButton: "Capture screen",
		webcam: "Webcam",
		webcamText: "Use your webcam to scan a 2FA QR code.",
		webcamButton: "Use webcam",
		authmeFile: "Authme file",
		authmeFileText: "Import all codes from an existing Authme import file.",
		authmeFileButton: "Choose file",
		// html dialogs
		captureScreenTitle: "Capture screen import",
		captureScreenWaiting: "Waiting for a QR code...",
		manualEntry: "Setup a key",
		manualEntryText: "Please enter a name and a 2FA secret key.",
		manualEntryName: "Name (Required)",
		manualEntrySecret: "Secret (Required)",
		manualEntryDescription: "Description",
		// tutorial
		googleAuthTutorialTitle: "Short tutorial on how to import your codes into Authme from Google Authenticator.",
		googleAuthTutorial0: "Export the 2FA codes from the Google Authenticator app: Tap on the hamburger menu in the top left corner of the screen: Transfer Accounts > Export Accounts",
		googleAuthTutorial1: "Save the migration QR code(s) with a screenshot or take a picture with another phone if you are on Android. Transfer these pictures to your computer",
		googleAuthTutorial2: "In Authme, go to the Import page: Sidebar > Import",
		googleAuthTutorial3: "Click the Choose images button and select the picture(s) you transferred from your phone",
		totpTutorialTitle: "Short tutorial on how to import your codes into Authme from any TOTP 2FA QR code.",
		totpTutorial0: "Go to the website where you want to setup 2FA",
		totpTutorial1: "Take a screenshot (Windows key + Shift + S key combination on Windows, Cmd + Shift + 3 on macOS) of the QR code, and save the picture",
		totpTutorial2: "In Authme, go to the Import page: Sidebar > Import",
		totpTutorial3: "Click the Choose images button and select the picture",
	},

	export: {
		exportCodes: "Export codes",
		exportAuthmeFile: "Export Authme file",
		exportAuthmeFileText: "Ideal to import for Authme or other Authme apps.",
		exportHTMlFile: "Export HTML file",
		exportHTMlFileText: "Ideal for scanning the QR codes or for security backup.",
		exportFileButton: "Export file",
	},

	edit: {
		editCodes: "Edit codes",
		dialog: {
			saveChanges: "Do you want to save your changes?",
			deleteCode: "Are you sure you want to delete this code?",
		},
	},

	settings: {
		general: "General",
		launchOnStartup: "Launch on startup",
		launchOnStartupText: "Launch Authme automatically upon system startup on the system tray.",
		minimizeToTray: "Minimize to tray",
		minimizeToTrayText: "When closing the app Authme will not quit. You can open Authme from the system tray.",
		optionalAnalytics: "Optional analytics",
		optionalAnalyticsText: "The sent payload is completely anonymous. The send data includes your Authme version and information about your computer.",
		windowCapture: "Window capture",
		windowCaptureText: "By default Authme can't be captured by outside programs. If you turn this on it applies until you restart Authme.",
		clearData: "Clear data",
		clearDataText: "Clear password, 2FA codes and all other settings. Be careful, this can not be undone!",
		clearDataButton: "Clear data",
		codes: "Codes",
		codesDescription: "Codes description",
		codesDescriptionText: "2FA codes description will be visible. You can copy it after clicking it.",
		blurCodes: "Blur codes",
		blurCodesText: "Blur the saved codes. You can still copy the codes or hover over the codes to show them.",
		codesLayout: "Codes layout",
		codesLayoutText: "You can choose your preferred layout. Grid displays more items and adapts to the screen size.",
		sortCodes: "Sort codes",
		sortCodesText: "You can choose how to sort the codes. By default codes are sorted by importing order.",
		shortcuts: "Shortcuts",
		shortcutsEditButton: "Edit",
		shortcutsResetButton: "Reset",
		shortcutsDeleteButton: "Delete",
		about: "About",
		feedback: "Feedback",
		feedbackText: "Thank you for providing feedback! Please report issues or feature requests on GitHub or by Email (authme@levminer.com).",
		logs: "Logs",
		logsText: "You can view the logs for debugging.",
		showLogsButton: "Show logs",
		aboutAuthme: "About Authme",
		aboutAuthmeText: "Information about your Authme build and your computer.",
	},
}
