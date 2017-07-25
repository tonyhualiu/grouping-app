import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import { DragDropContext  } from 'react-dnd';

import GroupContainer from './components/group_container';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
        <MuiThemeProvider>
          <GroupContainer />
        </MuiThemeProvider>
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
