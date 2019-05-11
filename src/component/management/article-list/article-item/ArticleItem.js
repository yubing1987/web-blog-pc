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
        this.lastFetchId = 0;
        this.state = {
            goEdit: false,
            relationVisible: false,
            loading: false,
            relationArticle: null,
            data: [],
            selectValue: [],
            fetching: false
        };
        this.fetchArticle = debounce(this.fetchArticle, 800);
    }

    hideModal = () => {
        this.setState({
            goEdit: false,
            relationVisible: false,
            data: [],
            selectValue: [],
            fetching: false
        });
    };

    render() {
        if(this.state.goEdit){
            return <Redirect to={"/management/edit?id=" + this.props.article.id}/>;
        }
        else {
            const { fetching, data, selectValue } = this.state;

            let tags = (this.props.article.tags || []).map((t) => {
                return t.tag;
            });
            return <div className={"article-panel"}>
                <div className={"article-content"}>
                    <a href={"/article/" + this.props.article.id} target={"_blank"}>{this.props.article.title}</a>
                    <div className={"article-abstract"}>{this.props.article.abstractContent}</div>
                    <div className={"article-tag"}>
                        <ArticleTagView editable={false} tags={tags} />
                    </div>
                </div>
                <div className={"article-button"}>
                    <div style={{"marginBottom": "4px"}}>
                        <Button onClick={() => {this.setState({goEdit: true})}} style={{"width": "70px"}} size={"small"} icon={"edit"}>编 辑</Button>
                    </div>
                    <div style={{"marginBottom": "4px"}}>
                        <Button onClick={() => {this.showRelationDialog()}} style={{"width": "70px"}} size={"small"} icon={"link"}>关 联</Button>
                    </div>
                    <div>
                        <Button style={{"width": "70px"}} size={"small"} type="danger" icon={"delete"} onClick={() =>{this.deleteArticle()}}>删 除</Button>
                    </div>
                </div>
                <Modal
                    title="文章关联"
                    visible={this.state.relationVisible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    maskClosable={false}
                    footer={[
                        <Button key={"related-dialog-close"} type="primary" onClick={this.hideModal}>
                            关闭
                        </Button>
                    ]}
                >
                    {
                        this.state.loading?
                            <div style={{"textAlign":"center"}}><Spin /></div>
                            :
                            <div>
                                <Select
                                    showSearch
                                    labelInValue
                                    value={selectValue}
                                    placeholder="选择需要关联的文章"
                                    notFoundContent={fetching ? <Spin size="small" /> : null}
                                    filterOption={false}
                                    onSearch={this.fetchArticle}
                                    onChange={this.handleChange}
                                    style={{ width: '84%' }}
                                >
                                    {data.map(d => <Option key={d.value}>{d.text}</Option>)}
                                </Select>
                                <Button onClick={()=>{this.addRelatedArticle()}} style={{"float":"right"}} type="primary" size={"small"} >添加</Button>
                                <List style={{"marginTop":"20px"}}
                                    itemLayout="horizontal"
                                    bordered={true}
                                    dataSource={this.state.relationArticle}
                                    renderItem={item => (
                                        <List.Item key={item.id} actions={[<Button size={"small"} onClick={() => {this.deleteRelatedArticle(item.id)}}>delete</Button>]}>
                                            <a href={"/article/" + item.id} target={"_blank"}>{item.title}</a>
                                        </List.Item>
                                    )}
                                />
                            </div>
                    }
                </Modal>
            </div>
        }
    }

    showRelationDialog(){
        this.setState({relationVisible: true, loading: true, relationArticle: null});
        this.loadRelatedArticle();
    }

    loadRelatedArticle(){
        ArticleApi.getRelatedArticle(this.props.article.id)
            .then((data) =>{
                this.setState({
                    loading: false,
                    relationArticle: data
                });
            });
    }

    fetchArticle = (value) => {
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ data: [], fetching: true });

        ArticleApi.getUnrelatedArticle(this.props.article.id, value)
            .then((data) =>{
                if (fetchId !== this.lastFetchId) {
                    return;
                }
                const d = data.map(article => ({
                    text: article.title,
                    value: article.id
                }));
                this.setState({ data: d, fetching: false });
        });
    };

    handleChange = (value) => {
        this.setState({
            selectValue: value,
            fetching: false,
        });
    };

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

    addRelatedArticle(){
        if(!this.state.selectValue.key){
            message.error("请先选择一篇需要关联的文章！");
            return;
        }
        ArticleApi.addRelatedArticle(this.props.article.id, this.state.selectValue.key)
            .then((data) => {
                if(data){
                    message.success("添加关联文章成功！");
                    this.loadRelatedArticle();
                }
            });
    }

    deleteRelatedArticle(id){
        ArticleApi.delRelatedArticle(this.props.article.id, id)
            .then((data) => {
                if(data){
                    message.success("删除关联文章成功！");
                    this.loadRelatedArticle();
                }
            });
    }
}

export default ArticleItem;