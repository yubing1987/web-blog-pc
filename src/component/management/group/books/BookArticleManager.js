import React, {Component} from 'react';
import {Modal, Button,Divider,Tree, Empty, message, Dropdown, Menu, Row, Col, InputNumber} from 'antd';
import AddArticleForm from "./AddArticleForm";
import BookApi from "../../../../server/BookApi";

const { TreeNode } = Tree;

class BookArticleManager extends Component {

    constructor(props){
        super(props);
        this.state={
            showAdd: false,
            parent: null,
            showBtnId: null,
            showEditDialog: false,
            editItem: {}
        }
    }

    render() {
        const {
            visible,
        } = this.props;
        return (
            <Modal
                visible={visible}
                title={'文章管理'}
                width={900}
                onCancel={() => {this.props.onClose && this.props.onClose()}}
                footer={<Button onClick={() => {this.props.onClose && this.props.onClose()}}>关闭</Button>}
            >
                <div>
                    <span>书籍名称：</span>{this.props.book.name}
                    {
                        this.props.items.length === 0 ? null:
                            <Button style={{'float': 'right'}} size={'small'} onClick={() => {this.setState({showAdd: true, parent: null})}} type="primary">添加文章</Button>
                    }
                </div>
                <Divider/>
                {
                    this.props.items.length === 0 ?
                        <Empty>
                            <Button onClick={() => {this.setState({showAdd: true, parent: null})}} type="primary">添加文章</Button>
                        </Empty> :
                        <Tree defaultExpandAll
                              blockNode
                        >
                            {this.makeNode(this.props.items)}
                        </Tree>
                }
                <AddArticleForm
                    visible={this.state.showAdd}
                    onCancel={() => {this.setState({showAdd: false})}}
                    onAdd={(article, level) => {this.onAdd(article, level)}}
                />
                <Modal
                    visible={this.state.showEditDialog}
                    title={"编辑"}
                    onCancel={() => {this.setState({showEditDialog: false})}}
                    onOk={() => {
                        BookApi.editGroupArticle({
                            id: this.state.editItem.id,
                            level: this.state.level
                        })
                            .then(() => {
                                message.success("保存成功");
                                this.setState({showEditDialog: false});
                                this.props.update();
                            })
                            .catch(() => {});
                    }}
                    okText={'确定'}
                    cancelText={'取消'}
                >
                    <Row>
                        <Col span={4}>
                            <div style={{'textAlign':'right','lineHeight':'32px'}}>文章：</div>
                        </Col>
                        <Col span={20}>
                            <div style={{'height':'32px', 'lineHeight':'32px'}}>
                                {(this.state.editItem.article || {}).title}
                            </div>
                        </Col>
                    </Row>
                    <Row style={{'marginTop':'10px'}}>
                        <Col span={4}>
                            <div  style={{'textAlign':'right','lineHeight':'32px'}}>排序序号：</div>
                        </Col>
                        <Col span={20}>
                            <InputNumber value={this.state.level} style={{'width':'100%'}} min={0} defaultValue={0} onChange={(value) => {this.setState({level: value})}} />
                        </Col>
                    </Row>
                </Modal>
            </Modal>)
    }

    onAdd(article, level) {

        BookApi.addGroupArticle({articleId: article.id, groupId: this.props.book.id,
            parentId: (this.state.parent || {id: 0}).id,
            level: level || 0})
            .then(() => {
                message.success("添加成功");
                this.setState({showAdd: false});
                this.props.update();
            })
            .catch(() => {});

    }

    makeNode(items){
        return items.map(item =>
            <TreeNode
                title={<div
                    style={{'borderBottom':'1px solid #eee'}}
                    onMouseEnter={()=>{this.setState({showBtnId: item.id})}}
                    onMouseLeave={()=>{this.setState({showBtnId: null})}}
                >{item.article.title}
                    {item.id === this.state.showBtnId?
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item>
                                    <div onClick={() => {this.setState({showAdd: true, parent: item})}}>添加子节点</div>
                                </Menu.Item>
                                <Menu.Item>
                                    <div onClick={() => {this.setState({showEditDialog: true, editItem: item, level: item.level})}}>编辑</div>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item>
                                    <div onClick={() => {
                                        BookApi.delGroupArticle(item.id)
                                            .then(() => {
                                                message.success("删除成功");
                                                this.props.update();
                                            })
                                            .catch(() => {})
                                    }
                                    }>删除</div>
                                </Menu.Item>
                            </Menu>
                        } placement="bottomCenter">
                            <Button size='small' style={{'float':'right'}}>操作</Button>
                        </Dropdown>
                        :null}
                </div>}
                key={item.id}
                isLeaf = {item.children.length === 0}
            >
                {
                    item.children.length > 0 ? this.makeNode(item.children):null
                }
            </TreeNode>
        );
    }
}

export default BookArticleManager;