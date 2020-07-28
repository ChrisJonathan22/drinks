import React, { useState, Fragment } from 'react';
import Icons from '../../util/Icons';
import store from '../../store/store';
import { Grid, Paper, Typography, ButtonBase, Avatar, makeStyles } from '@material-ui/core';


export default function Events () {
    const useStyles = makeStyles((theme) => ({
      guestContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
      },
      guests: {
        marginLeft: '10px',
        marginRight: '10px',
      },
      paper: {
        padding: theme.spacing(2),
        margin: 5,
      },
      image: {
        width: 40,
        height: 40
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      largeAvatar: {
        width: "100px",
        height: "100px",
      },
        eventTitle: {
            color: '#BB6B62',
        },
        eventCreator: {
          color: '#5DAB7C'
        },
        text: {
            color: '#4C3800',
        }
  }));

  const classes = useStyles();

  let [ events, setEvents ] = useState(store.getState());

  store.subscribe(() => {
    setEvents(store.getState());
  });

  let currentEvent = events.events[events.currentId - 1];

    return (
      <Fragment>
        {
          currentEvent ?
            <Grid item xs={12} sm={12} md={12} direction="column" container>
              <Paper className={classes.paper} xs={12} md={12} sm={12} lg={12}>
              <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} alt={ currentEvent.title } src={Icons[`${currentEvent.type}`]} />
                  </ButtonBase>
              </Grid>
              <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    <b>Event name</b>: <span className={ classes.eventTitle }>{ currentEvent.title }</span>
                  </Typography>
                  <Typography variant="body2">
                    <b>Location</b>: { currentEvent.location.name }
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <b>Drinks served</b>: { currentEvent.type }
                  </Typography>
                  <Typography variant="body2">
                    <b>Event creator</b>: <span className={ classes.eventCreator }>{ currentEvent.creator.name }</span>
                  </Typography>
                  <Avatar alt={ currentEvent.creator.name } src={ currentEvent.creator.avatarUrl } className={ classes.largeAvatar } />
                  <Typography variant="body2">
                    <b>Guests</b>:
                  </Typography>
                  <Grid item className={ classes.guestContainer }>
                  {
                    currentEvent.guests.map((guest, i) => {
                      return  guest.name !== currentEvent.creator.name ? <Avatar alt={ guest.name } src={ guest.avatarUrl } key={i} className={ classes.guests }/> :  guest.name === currentEvent.creator.name && currentEvent.guests.length === 1 ? 'Me, Myself and I...' : null
                    })
                  }
                  </Grid>
              </Grid>
              </Paper>
          </Grid>
          :
          null
        }
        </Fragment>
    )
}