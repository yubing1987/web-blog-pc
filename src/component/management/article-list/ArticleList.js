import React, { Component } from 'react';
import ArticleApi from "../../../server/ArticleApi"
import {
    Empty,Pagination
} from 'antd';
import ArticleItem from "./article-item/ArticleItem";

class ArticleList extends Component{
    state = {
        articles: {}
    };

    constructor(props){
        super(props);
        this.loadArticleList(1);
    }

    loadArticleList(page, key){
        ArticleApi.queryArticleList(page, 10, key).then((data) => {
            this.setState({articles: data});
        })
    }

    render(){
        if(!this.state.articles || !this.state.articles.items || this.state.articles.items.length === 0){
            return <Empty/>;
        }
        else{
            let list = this.state.articles.items.map((item) => {
                return <ArticleItem key={item.id} article={item} onDeleted={() => {this.loadArticleList(1)}}/>;
            });
            return <div>{list}<Pagination style={{"marginTop":"15px"}} pageSize={10} onChange={(p)=>{this.loadArticleList(p, "")}} defaultCurrent={1} total={this.state.articles.total}/></div>
        }
    }
}

export default ArticleList;