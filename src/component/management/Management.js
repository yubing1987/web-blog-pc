import React, {Component} from 'react';
import {NavLink, Redirect, Route} from 'react-router-dom'
import {Icon, Layout, Menu,} from 'antd';
import ArticleList from "./article-list/ArticleList";
import ArticleEditor from "./article-editor/ArticleEditor";

const {
    Content, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;


class Management extends Component {
    state = {
        collapsed: false
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    render() {
        if(this.props.location.pathname === "/management"){
            return <Redirect to={"/management/list"}/>;
        }
        let selectKey = this.props.location.pathname;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" selectedKeys={[selectKey]} defaultOpenKeys={["sub1","sub2"]}>
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>文章数据</span>
                        </Menu.Item>
                        <SubMenu

                            key="sub1"
                            title={<span><Icon type="desktop" /><span>文章管理</span></span>}
                        >
                            <Menu.Item key="/management/list"><NavLink to={"/management/list"}><Icon type="appstore" />文章列表</NavLink></Menu.Item>
                            <Menu.Item key="/management/edit"><NavLink to={"/management/edit"}><Icon type="edit" />写文章</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="setting" /><span>系统管理</span></span>}
                        >
                            <Menu.Item key="6"><Icon type="user" />用户管理</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: "100%" }}>
                            <Route path="/management/list" component={ArticleList}/>
                            <Route path="/management/edit" component={ArticleEditor}/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }

    componentDidMount(){
    }
}

export default Management;