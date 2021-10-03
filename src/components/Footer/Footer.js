import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridArea: 'b',
        minHeight: '50px',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },

}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
                <Typography variant="body1">2021</Typography>
        </div>
    );
}