import React, { Component } from 'react'
import { Layout } from 'antd'
import Sider from './components/Sider'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './components/Header'
import { actionCreators as homeActionCreators } from './store'
import NotFoundPage from './../../common/exceptions/NotFoundPage'
import MainPage from '../mainPage'

class Home extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        let defaultTheme = localStorage.getItem('defaultTheme')
        defaultTheme = defaultTheme === null ? 'dark' : defaultTheme

        this.state = {
            collapsed: false,
            theme: defaultTheme,
            minHeight: 0,
            routes: []
        }
    }
    componentDidMount() {
        this.props.loadMenuData()
        this.setState({
            minHeight: window.screen.availHeight - 115
        })
    }

    /* componentWillReceiveProps(nextProps) {
        let routes = this.transferRouter(nextProps.menuData, []).concat(routerMapping.extra)
        this.setState({
            routes: routes
        })
    } */

    shouldComponentUpdate(nextProps, nextState) {
        // 性能优化：保证路由只加载一次。
        if ((this.props.routes.length === 0 && nextProps.routes.length > 0) || this.props.collapsed !== nextProps.collapsed || this.state.theme !== nextState.theme) {
            return true
        }
        return false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    changeTheme = value => {
        let theme = value ? 'dark' : 'light'
        this.setState({
            theme: theme
        })
        localStorage.setItem('defaultTheme', theme)
    }

    render() {
        const { routes } = this.props
        return (
            <div id="components-layout-demo-custom-trigger">
                <Layout>
                    <Layout.Sider
                        trigger={null}
                        collapsible
                        collapsed={this.props.collapsed}
                        width={200}
                        style={{
                            background: this.state.theme === 'dark' ? '#002140' : '#fff',
                            minHeight: this.state.minHeight
                        }}
                    >
                        <Sider theme={this.state.theme} />
                    </Layout.Sider>
                    <Layout>
                        <Layout.Header style={{ background: '#fff', padding: 0 }}>
                            <Header collapsed={this.state.collapsed} onClick={this.toggle} theme={this.state.theme} changeTheme={this.changeTheme} />
                        </Layout.Header>
                        <Layout.Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: '#fff',
                                minHeight: 280
                            }}
                        >
                            <Switch>
                                {routes.map(route => {
                                    return <Route key={route.path} path={route.path} component={route.component} exact />
                                })}
                                <Route key="MainPage" path="/" component={MainPage} exact />
                                <Route path="*" component={NotFoundPage} />
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }}>Copyright © 2019 zerofinance.cn. All Right Reserved.</Layout.Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    collapsed: state.home.collapsed,
    menuData: state.home.menuData,
    routes: state.home.routes
})

const mapDispatchToProps = dispatch => {
    return {
        loadMenuData() {
            dispatch(homeActionCreators.loadMenuData())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Home))
