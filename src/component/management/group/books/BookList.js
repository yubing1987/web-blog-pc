import React, {Component} from 'react';
import {Icon, List, Button, Form, Typography,Divider, Popconfirm} from 'antd';
import AddBookForm from "./AddBookForm";
import BookApi from "../../../../server/BookApi";
import BookArticleManager from "./BookArticleManager";

const { Paragraph } = Typography;

const BookForm = Form.create({ name: 'book_form' })(AddBookForm);

class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            books: [],
            showBookDialog: false,
            editBook: null,
            type: 'add',
            total: 0,
            showManager: false
        };
        this.loadBooks(1, "");
    }

    handleAdd = () => {
        this.setState({
            showBookDialog: true,
            editBook: null,
            type: 'add'
        });
    };

    loadBooks(page, key){
        BookApi.getBooks(page, key)
            .then((data) => {
                this.setState({
                    books: data.items,
                    total: data.total
                })
            })
            .catch(() => {})
    }

    render(){
        return <div>
            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                <Icon type="plus" />添加书籍
            </Button>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        this.loadBooks(page, "");
                        this.currentPage = page;
                    },
                    pageSize: 10,
                    total: this.state.total
                }}
                bordered
                dataSource={this.state.books}
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
                            <Button size='small' onClick={() => {this.setState({editBook: item, showManager: true}); this.loadArticleTree(item.id)}}>文章管理</Button>
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
            <BookForm
                visible={this.state.showBookDialog}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                type={this.state.type}
                data={this.state.editBook}
            />
            <BookArticleManager
                visible={this.state.showManager}
                book = {this.state.editBook || {}}
                items = {this.state.bookItems || []}
                update = {() => this.loadArticleTree(this.state.editBook.id)}
                onClose={() =>{this.setState({showManager: false})}}
            />
        </div>
    }

    handleOk = () => {
        this.setState({
            showBookDialog: false,
            editBook: null,
            type: 'add'
        });
        this.loadBooks(1, "");
    };

    handleCancel= () => {
        this.setState({
            showBookDialog: false,
            editBook: null,
            type: 'add'
        });
    };

    handleEdit(book) {
        this.setState({
            showBookDialog: true,
            editBook: book,
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
                this.loadBooks(p);
            })
            .catch(() => {})
    }

    loadArticleTree(id){
        BookApi.getGroupArticle(id)
            .then((data) => {
                this.setState({bookItems: data})
            })
            .catch(() => {
            })
    }
}

export default BookList;