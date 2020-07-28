import React from 'react';
import { AppBar, Toolbar, Container, Grid } from '@material-ui/core';
import MapContainer from './component/Map/Map';
import Events from './component/Events/Events';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.scss';

function App() {
  return (
    <Provider className="App" store={ store }>
        <AppBar color="inherit" className="appBar">
          <Toolbar disableGutters>
            <img src='/images/logo.png' alt="logo" className="App-logo" />
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" className="container ">
          <Grid container spacing={ 3 }>
            <Events />
            <Grid item xs={ 11 } sm={ 12 } md={ 6 } className="mapContainer" justify="center">
              <MapContainer className="map" />
            </Grid>
          </Grid>
      </Container>
    </Provider>
  );
}

export default App;
