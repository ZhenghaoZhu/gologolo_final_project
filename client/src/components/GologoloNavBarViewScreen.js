import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const customNavBarTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#2252bb",
    },
  },
});


export default function GologoloNavBar() {
  return (
    <ThemeProvider theme = {customNavBarTheme}>
      <AppBar>
        <Toolbar>
          <Button>
            <Link to={`/`} id = "loginButtonText" style = {{fontSize : "28px", color : "white"}}>Gologolo Home Page | View Screen</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}