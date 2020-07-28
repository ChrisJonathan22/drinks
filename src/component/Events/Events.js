import React, { useState } from 'react';
import store from '../../store/store';
import SingleEvent from '../SingleEvent/SingleEvent';
import Icons from '../../util/Icons';
import { Grid, Paper, Typography, ButtonBase, makeStyles } from '@material-ui/core';


export default function Events () {
    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            margin: 5,
            cursor: 'pointer',
            [theme.breakpoints.down('sm')]: {
                width: "100%",
            },
        },
        title: {
            color: '#4C3800',
            paddingBottom: 20,
            textDecoration: 'underline',
            fontSize: 20,
        },
        image: {
        width: 40,
        height: 40,
        },
        img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        },
        eventTitle: {
            color: '#BB6B62',
        },
        guestCount: {
            color: '#5DAB7C',
        },
        text: {
            color: '#4C3800',
        },
        button: {
            backgroundColor: '#DBB561',
            color: '#fff',
            padding: 10,
            borderRadius: '2%',
        },
    }));

    const classes = useStyles();

    let [ events, setEvents ] = useState();
    let [ eventId, setEventId ] = useState();

    store.subscribe(() => {
        setEvents(store.getState().events);
        setEventId(store.getState().currentId);
    });

    function showAllEvents () {
        setEventId(0);
    }

    function showSingleEvent (e) {
        store.dispatch({ type: 'ADD_ID', value: e.currentTarget.id });
    }

    return (
        <Grid item xs={12} sm={12} md={6} direction="column" container>
            <Typography className={ classes.title }>View Events</Typography>
            <Grid container spacing={2}>
            {
                eventId ? 
                <div>
                    <SingleEvent />
                    <ButtonBase className={ classes.button } onClick={ showAllEvents }>
                        Show all Events
                    </ButtonBase>
                </div>
                :
                    events ?
                    events.map((event, i) => {
                        return (
                            <Grid container xs={ 12 } sm={ 6 } md={ 6 } justify="center" key={ i }>
                            <Paper className={ classes.paper } xs={ 12 } md={ 12 } sm={ 12 } lg={ 12 } id={ event.id } onClick={ (e) => showSingleEvent(e) }>
                            <Grid item>
                                <ButtonBase className={ classes.image }>
                                    <img className={ classes.img } alt="complex" src={ Icons[`${event.type}`] } />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Event name</b>: <span className={ classes.eventTitle }>{ event.title }</span>
                                </Typography>
                                <Typography variant="body2">
                                    <b>Event location</b>: <span className={ classes.text }>{ event.location.name }</span>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Drinks served</b>: <span className={ classes.text }>{ event.type }</span>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Guests</b>: <span className={ classes.guestCount }>{ event.guests.length ? event.guests.length : "No guests" }</span>
                                </Typography>
                            </Grid>
                            </Paper>
                            </Grid>
                        )
                    })
                    :
                    null
                    }
            </Grid>
        </Grid>
    )
}