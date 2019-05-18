import React, {Component} from 'react';
import {InputNumber, Modal, Select,Row, Col, message} from 'antd';
import ArticleApi from "../../../../server/ArticleApi";

const Option = Select.Option;
let timeout;

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    function fake() {
        if(value !== '') {
            ArticleApi.queryArticleList(1, 10, value, true)
                .then((data) => {
                    callback(data.items);
                })
                .catch(() => {
                })
        }
        else{
            callback([]);
        }
    }

    timeout = setTimeout(fake, 300);
}

class AddArticleForm extends Component {
    state = {
        data: [],
        value: undefined,
        valueMap: {}
    };

    handleSearch = value => {
        fetch(value, (data) => {
            let map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            this.setState({ data: data, valueMap: map });
        });
    };
    handleChange = value => {
        this.setState({ value });
    };
    render(){
        const {
            visible
        } = this.props;
        const options = this.state.data.map(d => <Option key={d.id}>{d.title}</Option>);
        return (
            <Modal
                visible={visible}
                title={'添加文章'}
                okText="保存"
                cancelText='取消'
                onCancel={() => {this.onCancel()}}
                onOk={() => {this.onAdd()}}
            >
                <Row>
                    <Col span={4}>
                        <div style={{'textAlign':'right','lineHeight':'32px'}}>文章：</div>
                    </Col>
                    <Col span={20}>
                        <Select
                            showSearch
                            value={this.state.value}
                            style={{'display':'inline'}}
                            placeholder={'输入文章名称进行搜索'}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearch}
                            onChange={this.handleChange}
                            notFoundContent={null}
                        >
                            {options}
                        </Select>
                    </Col>
                </Row>
                <Row style={{'marginTop':'10px'}}>
                    <Col span={4}>
                        <div  style={{'textAlign':'right','lineHeight':'32px'}}>排序序号：</div>
                    </Col>
                    <Col span={20}>
                        <InputNumber style={{'width':'100%'}} min={0} defaultValue={0} onChange={(value) => {this.setState({level: value})}} />
                    </Col>
                </Row>
            </Modal>
        );
    }

    onAdd(){
        if(!this.state.value || !this.state.valueMap[this.state.value]){
            message.error("前先选择文章");
            return;
        }
        this.props.onAdd(this.state.valueMap[this.state.value], this.state.level);
        this.setState({
            data: [],
            value: undefined,
            valueMap: {}
        })
    }

    onCancel(){
        this.props.onCancel();
        this.setState({
            data: [],
            value: undefined,
            valueMap: {}
        })
    }
}

export default AddArticleForm;