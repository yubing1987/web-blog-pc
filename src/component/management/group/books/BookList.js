import React, {Component} from 'react';
import {Icon, List, Button, Form, Avatar} from 'antd';
import AddBookForm from "./AddBookForm";
import BookApi from "../../../../server/BookApi";

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
const BookForm = Form.create({ name: 'boo_form' })(AddBookForm);

class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            books: [],
            showBookDialog: false,
            editBook: null,
            type: 'add'
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
                    books: data.items
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
                    },
                    pageSize: 10,
                }}
                bordered
                dataSource={this.state.books}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                        title={item.name}
                    />
                        {item.description}
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
}

export default BookList;