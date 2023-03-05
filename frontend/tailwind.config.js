/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			purple: '#2e294e',
			green: '#ef6f6c',
			orange: '#f46036',
			pink: '#ef6f6c',
			gray: '#ccc9dc',
			'dark-green': '#1b998b',
			white: '#ffffc7',
		},
		fontFamily: {
			sans: ['Proxima Nova', 'Arial', 'sans-serif'],
			serif: ['ui-serif', 'Georgia'],
			mono: ['ui-monospace', 'SFMono-Regular'],
		},
		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
			backgroundImage: {
				film: "url('/public/film.jpg')",
			},
		},
	},
	plugins: [],
};
