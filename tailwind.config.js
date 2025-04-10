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
			fontFamily: {
				circular: ['Circular', 'sans-serif']
			},
			fontWeight: {
				450: "450",
			},
			boxShadow:
				{ 'drop-shadow-dark': '0px -8px 47px 0px rgba(255, 255, 255, 0.25), 0px 8px 16px 0px rgba(0, 0, 0, 0.60)' },
			colors: {
				'pip-white': '#FFF',
				'pip-red-tint': '#FEE3DD',
				'pip-rose-tint': '#FCE7F6',
				'pip-yellow-tint': '#FAFFBE',
				'pip-blue-light': '#84CAFF',
				'pip-yellow-base': '#FFE432',
				'pip-yellow-dark': '#632B02',
				'pip-yellow-pastel': '#FEFFDF',
				'pip-blue-base': '#0075FF',
				'pip-blue-dark': '#175CD3',
				'pip-dark-400': '#6C7278',
				'pip-gray-200': '#EFEFEF',
				'pip-gray-100': '#F6F6F6',
				'bg-med': 'rgba(229, 229, 229, 1)',
				'bg-high': 'rgba(29, 29, 29, 1)',
				'bg-bottom': 'rgba(204, 204, 204, 1)',
				'shadow': 'rgba(113, 113, 113, 0.2)',
				'shadow2': 'rgba(113, 113, 113, 0.4)',
				'low-contrast': 'rgba(111, 111, 111, 1)',
				'low-contrast2': 'rgba(150, 150, 150, 1)',
				'med-contrast': 'rgba(62, 62, 62, 1)',
				'contrast': 'rgba(87, 145, 128, 1)',
				'contrast2': 'rgba(107, 175, 153, 1)',
				'high-contrast': '#1D1D1D',
				'high': 'rgba(255, 255, 255, 1)',
				'high-contrast2': '#292929',
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

