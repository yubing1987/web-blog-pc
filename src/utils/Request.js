import React from 'react'
import ReactDOM from 'react-dom';
import Superagent from 'superagent';
import {message} from 'antd';

import Loading from '../component/loading/Loading'

let loading = (<Loading visible={true} />);
let loadingNode = null;

const renderLoading = () => {
    if(!loadingNode){
        loadingNode = document.createElement('div');
        document.body.appendChild(loadingNode);
    }
    ReactDOM.render(loading, loadingNode);
};

class Request {
    get(url,param, hideLoading){
        if(!hideLoading) {
            renderLoading();
        }
        return new Promise((resolve, reject) => {
            Superagent['get'](url)
                .query(param)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if(err){
                        if(res.status === 401){
                            window.location.href = "/login?back_url=" + window.location.href;
                            return;
                        }
                        setTimeout(() => {
                            message.error("请求出错");
                        },100);
                        reject();
                    }else{
                        if(!hideLoading) {
                            setTimeout(() => {
                                ReactDOM.unmountComponentAtNode(loadingNode);
                            }, 300);
                        }
                        Request.parserResult(res.body, resolve, reject);
                    }
                });
        });
    }

    post(url, param, hideLoading){
        if(!hideLoading) {
            renderLoading();
        }
        return new Promise((resolve, reject) => {
            Superagent['post'](url)
                .send(param)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) {
                        if(res.status === 401){
                            window.location.href = "/login?back_url=" + window.location.href;
                            return;
                        }
                        setTimeout(() => {
                            message.error("请求出错");
                        }, 100);
                        reject();
                    } else {
                        if(!hideLoading) {
                            setTimeout(() => {
                                ReactDOM.unmountComponentAtNode(loadingNode);
                            }, 300);
                        }
                        Request.parserResult(res.body, resolve, reject);
                    }
                });
        });
    }

    static parserResult(data, resolve, reject){
        if(data.code === "200"){
            resolve(data.content);
        }
        else{
            setTimeout(() => {
                let msg = data.message || "请求出错";
                message.error(msg);
            },100);
            reject();
        }
    }
}

export default Request;