module.exports = {
    content: [
        "./src/**/*.{html,js,tsx,ts,jsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                'primary-light': 'rgba(var(--primary-light), <alpha-value>)',
                'primary-200': 'rgba(var(--primary-200), <alpha-value>)',
                'primary-main': 'rgba(var(--primary-main), <alpha-value>)',
                'primary-dark': 'rgba(var(--primary-dark), <alpha-value>)',
                'primary-800': 'rgba(var(--primary-800), <alpha-value>)',

                'secondary-light': 'rgba(var(--secondary-light), <alpha-value>)',
                'secondary-200': 'rgba(var(--secondary-200), <alpha-value>)',
                'secondary-main': 'rgba(var(--secondary-main), <alpha-value>)',
                'secondary-dark': 'rgba(var(--secondary-dark), <alpha-value>)',
                'secondary-800': 'rgba(var(--secondary-800), <alpha-value>)',

                'success-light': 'rgba(var(--success-light), <alpha-value>)',
                'success-200': 'rgba(var(--success-200), <alpha-value>)',
                'success-main': 'rgba(var(--success-main), <alpha-value>)',
                'success-dark': 'rgba(var(--success-dark), <alpha-value>)',

                'error-light': 'rgba(var(--error-light), <alpha-value>)',
                'error-main': 'rgba(var(--error-main), <alpha-value>)',
                'error-dark': 'rgba(var(--error-dark), <alpha-value>)',

                'warning-light': 'rgba(var(--warning-light), <alpha-value>)',
                'warning-main': 'rgba(var(--warning-main), <alpha-value>)',
                'warning-dark': 'rgba(var(--warning-light), <alpha-value>)',

                'grey-50': 'rgba(var(--grey-50), <alpha-value>)',
                'grey-100': 'rgba(var(--grey-100), <alpha-value>)',
                'grey-200': 'rgba(var(--grey-200), <alpha-value>)',
                'grey-300': 'rgba(var(--grey-300), <alpha-value>)',
                'grey-500': 'rgba(var(--grey-500), <alpha-value>)',
                'grey-600': 'rgba(var(--grey-600), <alpha-value>)',
                'grey-700': 'rgba(var(--grey-700), <alpha-value>)',
                'grey-900': 'rgba(var(--grey-900), <alpha-value>)',

                'theme-bg-base': 'rgba(var(--theme-bg-base), <alpha-value>)',
                'theme-text-base': 'rgba(var(--theme-text-base), <alpha-value>)'
            },
            borderRadius: {
                'main': 'var(--rounded-main)'
            }
        },
        fontFamily: {
            'sans': ['Poppins', 'Inter', 'Roboto'],
            'roboto': ['Roboto', 'sans-serif'],
        },
        keyframes: {
            'fade-in-down': {
                '0%': {
                    opacity: '0',
                    transform: 'translateY(-10px)'
                },
                '100%': {
                    opacity: '1',
                    transform: 'translateY(0)'
                },
            },
            'fade-out-down': {
                'from': {
                    opacity: '1',
                    transform: 'translateY(0px)'
                },
                'to': {
                    opacity: '0',
                    transform: 'translateY(10px)'
                },
            },
            'fade-in-up': {
                '0%': {
                    opacity: '0',
                    transform: 'translateY(10px)'
                },
                '100%': {
                    opacity: '1',
                    transform: 'translateY(0)'
                },
            },
            'fade-out-up': {
                'from': {
                    opacity: '1',
                    transform: 'translateY(0px)'
                },
                'to': {
                    opacity: '0',
                    transform: 'translateY(10px)',
                },
            }
        },
        animation: {
            'fade-in-down': 'fade-in-down 0.5s ease-out',
            'fade-out-down': 'fade-out-down 0.5s ease-out',
            'fade-in-up': 'fade-in-up 0.5s ease-out',
            'fade-out-up': 'fade-out-up 0.5s ease-out'
        }
    },
    plugins: [],
}