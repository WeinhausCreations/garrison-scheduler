import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: { 500: "#274059" },
    },
    typography: {
        fontFamily: ["Open Sans"],
        h1: { fontSize: "2.375rem", margin: 16, fontWeight: 'bold', textAlign: 'center' },
        h2: { fontSize: "1.75rem", margin: 12, fontWeight: 'bold', textAlign: 'center' },
        h3: { fontSize: "1.375rem", margin: 8, fontWeight: 'bold', textAlign: 'center'},
        h4: { fontSize: "1.125rem", margin: 8, fontWeight: 'bold', textAlign: 'center'},
        subtitle1: { fontSize: "1.25rem", fontStyle: "italic" },
        subtitle2: { fontSize: "1.125rem", fontStyle: "italic" },
        body1: { fontSize: "1rem" },
        body2: { fontSize: "0.875rem" },
    },
});

export default theme;
