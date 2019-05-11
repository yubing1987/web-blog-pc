import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import debounce from 'lodash/debounce';
import "./ArticleItem.css";
import {Modal, Button, Spin,Select,message,List} from "antd";
import ArticleApi from "../../../../server/ArticleApi"
import ArticleTagView from "../../article-tag-view/ArticleTagView";

const Option = Select.Option;
const confirm = Modal.confirm;

class ArticleItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            goEdit: false
        };
    }

    render() {
        if(this.state.goEdit){
            return <Redirect to={"/management/edit?id=" + this.props.article.id}/>;
        }
        else {
            let tags = (this.props.article.tags || []).map((t) => {
                return t.tag;
            });
            return <div className={"article-panel"}>
                <div className={"article-content"}>
                    <a href={"/article/" + this.props.article.id} target={"_blank"}>{this.props.article.title}</a>
                    <div className={"article-abstract"} style={{"WebkitBoxOrient": "vertical"}}>{this.props.article.abstractContent}</div>
                    <div className={"article-tag"}>
                        <ArticleTagView editable={false} tags={tags} />
                    </div>
                </div>
                <div className={"article-button"}>
                    <div style={{"marginBottom": "10px"}}>
                        <Button onClick={() => {this.setState({goEdit: true})}} style={{"width": "70px"}} size={"small"} icon={"edit"}>编 辑</Button>
                    </div>
                    <div>
                        <Button style={{"width": "70px"}} size={"small"} type="danger" icon={"delete"} onClick={() =>{this.deleteArticle()}}>删 除</Button>
                    </div>
                </div>
            </div>
        }
    }

    deleteArticle(){
        confirm({
            title: '确认?',
            content: '是否删除这篇文章',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () =>{
                ArticleApi.deleteArticle(this.props.article.id)
                    .then(() => {
                        message.success("删除成功！");
                        this.props.onDeleted();
                    });
            },
            onCancel() {
            },
        });
    }
}

export default ArticleItem;