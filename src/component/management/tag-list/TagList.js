import React, {Component} from 'react';
import TagApi from "../../../server/TagApi";
import { Table, Button, Icon, Form} from 'antd';
import TagAddForm from "./TagAddForm";

const AddForm = Form.create({ name: 'tag_form' })(TagAddForm);

class TagList extends Component {

    columns = [{
        title: '标签',
        dataIndex: 'tag',
        key: 'tag'
    }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <div>Delete</div>
            </span>
        ),
    }];

    handleAdd = () => {
        this.setState({
            showDialog: true
        });
    };

    constructor(props){
        super(props);
        this.state = {
            tags: [],
            showDialog: false
        };
        this.loadArticleList();
    }

    loadArticleList(){
        TagApi.getTags().then((data) => {
            this.setState({tags: data});
        })
    }

    handleOk = () => {
        this.setState({
            showDialog: false,
        });
        this.loadArticleList();
    };

    handleCancel = () => {
        this.setState({
            showDialog: false,
        });
    };

    render(){
        return <div>
            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                <Icon type="plus" />添加标签
            </Button>
            <Table
                rowKey={"id"}
                bordered
                pagination={false}
                columns={this.columns}
                dataSource={this.state.tags} />
            <AddForm
                visible={this.state.showDialog}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
            </AddForm>
        </div>
    }
}

export default TagList;