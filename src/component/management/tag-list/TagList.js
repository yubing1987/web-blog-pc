import React, {Component} from 'react';
import TagApi from "../../../server/TagApi";
import { Table, Button, Icon, Form, Modal, message} from 'antd';
import TagAddForm from "./TagAddForm";

const AddForm = Form.create({ name: 'tag_form' })(TagAddForm);
const confirm = Modal.confirm;

class TagList extends Component {

    columns = [{
        title: '标签',
        dataIndex: 'tag',
        key: 'tag',
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button style={{'marginRight':'20px'}} onClick={() => {this.handleEdit(record)}}>编辑</Button>
                <Button type="danger" onClick={() => {this.deleteTag(record.id)}}>删除</Button>
            </span>
        ),
    }];

    handleAdd = () => {
        this.setState({
            showDialog: true,
            type: 'add',
            editItem: null
        });
    };

    handleEdit(item){
        this.setState({
            showDialog: true,
            type: 'edit',
            editItem: item
        });
    };

    constructor(props){
        super(props);
        this.state = {
            tags: [],
            showDialog: false,
            type: 'add',
            editItem: null
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
                type={this.state.type}
                data={this.state.editItem}
            >
            </AddForm>
        </div>
    }

    deleteTag(id){
        confirm({
            title: '确认?',
            content: '是否删除这个标签',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () =>{
                TagApi.delTag(id)
                    .then(() => {
                        message.success("删除成功！");
                        this.loadArticleList();
                    });
            },
            onCancel() {
            },
        });
    }
}

export default TagList;