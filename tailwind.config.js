/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                card: '#1a1a1a',
                accent: '#00ff88',
                'accent-dark': '#00cc6d',
                secondary: '#a0a0a0',
                warning: '#ffaa00',
                destructive: '#ff4444'
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px'
            }
        },
    },
    plugins: [],
}
