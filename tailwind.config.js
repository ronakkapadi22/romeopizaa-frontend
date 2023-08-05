/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		aspectRatio: false
	},
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
	],
	theme: {
		variants: {
			aspectRatio: ['responsive']
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			black: '#000000',
			red: '#F41F31',
			'red-dark': '#E54937',
			orange: '#FAC926',
			green: '#29B759',
			gray1: '#44413D',
			gray2: '#6F6F6F',
			'light-gray': '#D4D4D4',
			cultured: '#F1F1F1',
			cultured1: '#F8F8F8'
		},
		aspectRatio: {
			// defaults to {}
			none: 0,
			square: [1, 1], // or 1 / 1, or simply 1
			'16/9': [16, 9], // or 16 / 9
			'4/3': [4, 3], // or 4 / 3
			'21/9': [21, 9] // or 21 / 9
		},
		extend: {
			screens: {
				xs: '375px',
				'2xs': '280px'
			},
			inset: {
				'4px': '-4px',
				'8px': '-8px'
			},
			animation: {
				'drawer-right': 'drawer_right 300ms ease',
				'popup-top': 'popup_top 300ms ease'
			},
			keyframes: {
				drawer_right: {
					'0%': { right: '-500px' },
					'100%': { right: '0px' }
				},
				popup_top: {
					'0%': { top: '-300px' },
					'100%': { top: '0px' }
				}
			}
		}
	},
	plugins: [require('tailwindcss-aspect-ratio')]
}
