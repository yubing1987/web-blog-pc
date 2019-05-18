import React, {Component} from 'react';
import {Icon, List, Button, Typography, Divider, Popconfirm, Form} from 'antd';
import BookApi from "../../../../server/BookApi";
import AddCollectionForm from "./AddCollectionForm";
import CollectionArticleManager from "./CollectionArticleManager";

const { Paragraph } = Typography;


const CollectionForm = Form.create({ name: 'collection_form' })(AddCollectionForm);

class CollectionList extends Component {

    constructor(props){
        super(props);
        this.state = {
            collectionList: [],
            showCollectionDialog: false,
            editCollection: null,
            type: 'add',
            total: 0,
            showManager: false,
            collectionItems: []
        };
        this.loadCollectionList(1, "");
    }

    handleAdd = () => {
        this.setState({
            showCollectionDialog: true,
            editCollection: null,
            type: 'add'
        });
    };

    loadCollectionList(page, key){
        BookApi.getCollectionList(page, key)
            .then((data) => {
                this.setState({
                    collectionList: data.items,
                    total: data.total
                })
            })
            .catch(() => {})
    }

    render(){
        return <div>
            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                <Icon type="plus" />添加专辑
            </Button>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        this.loadCollectionList(page, "");
                        this.currentPage = page;
                    },
                    pageSize: 10,
                    total: this.state.total
                }}
                bordered
                dataSource={this.state.collectionList}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={
                            <img
                                width={272}
                                alt={item.name}
                                src={item.picture}
                            />
                        }
                    >
                        <List.Item.Meta title={item.name}/>
                        <Paragraph ellipsis={{ rows: 3, expandable: false }}>{item.description}</Paragraph>
                        <Divider/>
                        <div>
                            <Button size='small' onClick={() => {this.setState({editCollection: item, showManager: true}); this.loadArticleList(item.id)}}>文章管理</Button>
                            <Divider type="vertical" />
                            <Button size='small' onClick={() => {this.handleEdit(item)}}>编辑</Button>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="是否确认删除？"
                                okText="是"
                                cancelText="否"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                onConfirm={() => {this.handleDelete(item)}}
                            >
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                        </div>
                    </List.Item>
                )}
            />
            <CollectionForm
                visible={this.state.showCollectionDialog}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                type={this.state.type}
                data={this.state.editCollection}
            />
            <CollectionArticleManager
                visible={this.state.showManager}
                book = {this.state.editCollection || {}}
                items = {this.state.collectionItems || []}
                update = {() => this.loadArticleList(this.state.editCollection.id)}
                onClose={() =>{this.setState({showManager: false})}}
            />
        </div>
    }

    handleOk = () => {
        this.setState({
            showCollectionDialog: false,
            editCollection: null,
            type: 'add'
        });
        this.loadCollectionList(1, "");
    };

    handleCancel= () => {
        this.setState({
            showCollectionDialog: false,
            editCollection: null,
            type: 'add'
        });
    };

    handleEdit(collection) {
        this.setState({
            showCollectionDialog: true,
            editCollection: collection,
            type: 'edit'
        });
    }

    handleDelete(book){
        BookApi.delBook(book.id)
            .then(() => {
                let p = this.currentPage || 1;
                if((this.state.books || []).length === 1){
                    p -= 1;
                }
                if(p < 1){
                    p = 1;
                }
                this.loadCollectionList(p, "");
            })
            .catch(() => {})
    }

    loadArticleList(id){
        BookApi.getGroupArticle(id)
            .then((data) => {
                this.setState({collectionItems: data})
            })
            .catch(() => {
            })
    }
}

export default CollectionList;