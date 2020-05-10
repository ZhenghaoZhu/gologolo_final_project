import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { Resizable, ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoImage extends Component {

    render() {
        const styles = {
            container: {
                
            }
        }

        return (
            // <div>
                    <img src = "https://rlv.zcache.com/svc/view?rlvnet=1&realview=113297416891423264&design=b5c64d95-6c7b-48e6-8551-51d507499df1&size=1.5&style=square_sticker&max_dim=60"></img>
            // </div>
        )
    }
}

export default LogoImage