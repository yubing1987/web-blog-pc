import React, {Component} from 'react';
import {Form, Modal, Input} from 'antd';
import TagApi from "../../../server/TagApi";

class TagAddForm extends Component {
    render(){
        const {
            visible, form, type,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={type==='add'?'添加标签':'编辑标签'}
                okText="保存"
                cancelText='取消'
                onCancel={() => {this.onCancel()}}
                onOk={(e) => {this.onAdd(e)}}
            >
                <Form >
                    <Form.Item label="标签">
                        {getFieldDecorator('tag', {
                            rules: [{ required: true, message: '标签内容不能为空!' },],
                            initialValue: this.props.data && this.props.data.tag
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    onAdd(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.props.type === 'add') {
                    TagApi.addTag(values["tag"])
                        .then(() => {
                            this.props.onOk();
                            this.props.form.resetFields();
                        })
                        .catch(() => {})
                } else{
                    TagApi.editTag(this.props.data.id, values["tag"])
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

export default TagAddForm;