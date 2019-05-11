import React, { Component } from 'react';
import {Input, Icon, Tooltip, Tag} from "antd";

class ArticleTagView extends Component {
    constructor(props) {
        super(props);
        this.state={
            inputVisible: false,
            inputValue: "",
        }
    }
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const inputValue = this.state.inputValue;
        let tags = this.props.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
            this.props.handleTag(tags);
        }
        this.setState({
            inputVisible: false,
            inputValue: '',
        });
    };

    handleClose = (removedTag) => {
        const tags = this.props.tags.filter(tag => tag !== removedTag);
        this.props.handleTag(tags);
    };

    render(){
        console.log(this.props.tags);
        let tags = this.props.tags.map((t) => {
            const isLongTag = t.length > 20;
            const tagElem = (
                 <Tag color="#87d068" key={t} closable={this.props.editable} afterClose={() => this.handleClose(t)}>
                    {isLongTag ? `${t.slice(0, 20)}...` : t}
                 </Tag>
            );
            return isLongTag ? <Tooltip title={t} key={t}>{tagElem}</Tooltip> : tagElem;
        });
        return <span>
            {tags}
            {this.state.inputVisible && this.props.editable && (
                <Input
                    ref={(ref) => {this.input = ref}}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
            )}
            {!this.state.inputVisible && this.props.editable && (
                <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                    <Icon type="plus" /> 添加标签
                </Tag>
            )}
        </span>
    }
}

export default ArticleTagView;