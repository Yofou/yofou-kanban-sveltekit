/** @type {import('tailwindcss').Config} */
module.exports = {
darkMode: "class",
	content: ["./src/**/*.{svelte,html}"],
	theme: {
		colors: {
			purple: {
				300: "#A8A4FF",
				600: "#635FC7",
			},
			grey: {
				100: "#F4F7FD",
				200: "#E4EBFA",
				300: "#828FA3",
				400: "#3E3F4E",
				500: "#2B2C37",
				600: "#20212C",
				700: "#000112",
			},
			white: "#FFFFFF",
			red: {
				300: "#FF9898",
				600: "#EA5555",
			},
		},
		fontFamily: {
			"font-jaka": ["'Plus Jakarta Sans'", "sans-serif"],
		},
		boxShadow: {
			"task-shadow": "0px 4px 6px rgba(54, 78, 126, 0.101545)",
		},
	}
}
