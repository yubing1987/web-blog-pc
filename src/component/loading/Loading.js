import React, {Component} from 'react';

import loading from "../../image/loading.svg"

import "./Loading.css"

class Loading extends Component {
    render(){
        return <div className="loader">
            <img src={loading} alt="loading"/>
        </div>
    }
}


export default Loading;