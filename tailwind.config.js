/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			animation: {
				'fade-out': 'fadeOut 1s ease-in-out forwards', // Matches duration
				'scale-up': 'scaleUp 1s ease-in-out',
			},
			keyframes: {
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
				scaleUp: {
					'0%': { transform: 'scale(0.8)', opacity: 0 },
					'100%': { transform: 'scale(1)', opacity: 1 },
				},
			},
		},
	},
	plugins: [],
}

