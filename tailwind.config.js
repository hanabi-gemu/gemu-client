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
			fontWeight: {
				450: "450",
			},
			boxShadow:
				{ 'drop-shadow-dark': '0px -8px 47px 0px rgba(255, 255, 255, 0.25), 0px 8px 16px 0px rgba(0, 0, 0, 0.60)' },
			colors: {
				'shadow': 'rgba(113, 113, 113, 0.2)',
				'shadow2': 'rgba(113, 113, 113, 0.4)',
				'low-contrast': 'rgba(111, 111, 111, 1)',
				'low-contrast2': 'rgba(150, 150, 150, 1)',
				'hight-contrast': '#1D1D1D',
				'light-box': 'rgba(255, 255, 255, 0.6)',
			},
			letterSpacing: {
				'-tight-custom': '-0.72px',
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

