import React, {Component} from 'react';
import {Form, Modal, Input} from 'antd';
import TagApi from "../../../server/TagApi";

class TagAddForm extends Component {
    render(){
        const {
            visible, onCancel, form, type,
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title={type==='add'?'添加标签':'编辑标签'}
                okText="保存"
                cancelText='取消'
                onCancel={onCancel}
                onOk={(e) => {this.onAdd(e)}}
            >
                <Form layout={"horizontal"}>
                    <Form.Item label="标签">
                        {getFieldDecorator('tag', {
                            rules: [{ required: true, message: '标签内容不能为空!' },],
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
                TagApi.addTag(values["tag"])
                    .then(() => {
                        this.props.onOk();
                    })
                    .catch(() => {})

            }
        });
    }
}

export default TagAddForm;