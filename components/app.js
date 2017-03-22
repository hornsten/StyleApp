// Include the Main React Dependencies
import React from 'react';

import { render } from 'react-dom';

import { HashRouter as Router, Route } from 'react-router-dom'; 

import Main from './Main';


render((
   <Router>
        <Route exact path="/" component={Main} /> 
    </Router>),
     document.getElementById('app'));

