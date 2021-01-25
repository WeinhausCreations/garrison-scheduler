import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#649cbd",
            main: "#005a8f",
            dark: "#003655",
        },
        secondary: {
            light: "#92cbff",
            main: "#4dacff",
            dark: "#2b659b",
        },
        tertiary: {
            light: "#7e8c9b",
            main: "#274059",
            dark: "#172635",
        },
        quaternary: {
            light: "#e1e6ef",
            main: "#ced6e4",
            dark: "#7b8089",
        },
        error: {
            light: "#ff3838",
            main: "#ff3838",
            dark: "#ff3838",
        },
        success: {
            light: "#56f000",
            main: "#56f000",
            dark: "#4caf50",
        },
        tag1: {
            light: "#70dde0",
            main: "#00c7cb",
            dark: "#00777a",
        },
        tag2: {
            light: "#aea8e5",
            main: "#786dd3",
            dark: "#48417f",
        },
        tag3: {
            light: "#c76ada",
            main: "#a200c1",
            dark: "#610074",
        },
        tag4: {
            light: "#ea9875",
            main: "#da5309",
            dark: "#833209",
        },
        background: {
            default: '#e1e6ef',
            paper: '#f5f6f9'
        }
    },
    typography: {
        fontFamily: ["Open Sans"],
        h1: { fontSize: "2.375rem", margin: 16, fontWeight: 'bold', textAlign: 'center' },
        h2: { fontSize: "1.75rem", margin: 12, fontWeight: 'bold', textAlign: 'center' },
        h3: { fontSize: "1.375rem", margin: 8, fontWeight: 'bold', textAlign: 'center'},
        h4: { fontSize: "1.125rem", margin: 8, fontWeight: 'bold', textAlign: 'center'},
        subtitle1: { fontSize: "1.25rem", fontStyle: "italic", textAlign: 'center'  },
        subtitle2: { fontSize: "1.125rem", fontStyle: "italic" },
        body1: { fontSize: "1rem" },
        body2: { fontSize: "0.875rem" },
    },
});

export default theme;
