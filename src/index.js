import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Management from "./component/management/Management";

import Home from "./component/home/Home";
import Login from "./component/login/Login";


import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const SliderComponent = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/management/" component={Management}/>
        <Route path="/login" component={Login}/>
    </Switch>
)

ReactDOM.render((
    <BrowserRouter>
        <SliderComponent />
    </BrowserRouter>

), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
