import React, {Component} from 'react';
import {Form, Modal, Input} from 'antd';
import BookApi from "../../../../server/BookApi";

class AddCollectionForm extends Component {


    render(){
        const {
            visible, form, type,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={type==='add'?'添加专辑':'编辑专辑'}
                okText="保存"
                cancelText='取消'
                onCancel={() => {this.onCancel()}}
                onOk={() => {this.onAdd()}}
            >
                <Form>
                    <Form.Item label="名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '名称内容不能为空!' },],
                            initialValue: this.props.data && this.props.data.name
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="封面">
                        {getFieldDecorator('picture', {
                            rules: [{ required: true, message: '封面不能为空!' },],
                            initialValue: this.props.data && this.props.data.picture
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="描述">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '描述不能为空!' },],
                            initialValue: this.props.data && this.props.data.description
                        })(
                            <Input type='textarea' rows={4}/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    onAdd(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.props.type === 'add') {
                    BookApi.addCollection(values)
                        .then(() => {
                            this.props.onOk();
                            this.props.form.resetFields();
                        })
                        .catch(() => {})
                } else{
                    values["id"] = this.props.data.id;
                    BookApi.editBook(values)
                        .then(() => {
                            this.props.onOk();
                            this.props.form.resetFields();
                        })
                        .catch(() => {})
                }
            }
        });
    }

    onCancel(){
        this.props.form.resetFields();
        this.props.onCancel();
    }
}

export default AddCollectionForm;