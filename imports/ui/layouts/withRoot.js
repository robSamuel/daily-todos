import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const getTheme = function(theme) {
    return createMuiTheme({
        palette: {
            type: theme.paletteType,
            background: {
                default: theme.paletteType === 'light' ? '#000' : '#fff',
            },
        },
    });
};

const theme = getTheme({
    paletteType: 'light',
});

function withRoot(Component) {
    function WithRoot(props) {

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
