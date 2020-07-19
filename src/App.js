import React, {Component} from 'react';

import './styles.css';
import Hearder from './components/Herder';
import Routers from './routes';



const App = ()=>(
  <div className ='App'>
    <Hearder/>
    <Routers/>
  </div>
);

export default App;
