const defaultTheme = require("tailwindcss/defaultTheme")
const {fontFamily} = defaultTheme

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{jsx,tsx}",
    ],
    theme: {
        extend: {
            maxWidth:{
                "2xs": "16rem",
                "3xs": "12rem",
                "4xs":"8rem"
            },
            spacing: {
                "1/10": "10%",
                "9/10": "90%",
                "1/12": "8.3%",
                "11/12": "91.7%",
                "1/20": "5%",
                "1.25": "0.3125rem",
            },
            animation: {
                "spin-slow": "spin 5s linear infinite",
            },
            fontFamily: {
                sans: ["Inter var", ...fontFamily.sans],
                system: fontFamily.sans,
            },
            zIndex: {
                "100": "100",
                "1000": "1000",
                "10000": "10000",
                "20000": "20000",
            },
            ringWidth: {
                "1.5": "1.5px",
            },
        }
    },
    plugins: [],
}
