import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { BreadcrumbWrapper, BreadcurmbLink } from '../style'
import { connect } from 'react-redux'
// import * as routerMapping from 'router'

/**
 * 自定义导航组件，后期可以优化正则表达式性能，将其处理过程构造为常量，而不是每次都运行一次
 */
class Breadcrumb extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            currentPathName: '',
            currentPath: '/'
        }
    }

    componentDidMount() {
        // first enter, get router name from props.location
        // this.getRouteName(this.props.location.pathname, routes)
        // 监听路由变化
        this.props.history.listen(currentRoute => {
            // when route changed, renew the route name
            this.getRouteName(currentRoute.pathname, this.props.routes)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.getRouteName(nextProps.location.pathname, nextProps.routes)
    }

    getRouteName(path, routes) {
        // let finded = false
        if (routes && routes.length > 0) {
            routes.forEach(route => {
                if (route.name) {
                    let patt = new RegExp('^' + route.path.replace(/:[a-z0-9]*/gim, '.*') + '$')
                    if (patt.test(path)) {
                        this.setState({
                            currentPathName: route.name,
                            currentPath: path
                        })
                    }
                }
            })
        }
    }
    renderPath() {
        if ('/' !== this.props.location.pathname) {
            return (
                <div>
                    <BreadcurmbLink to="/">首页</BreadcurmbLink>
                    <span style={{ color: 'rgba(0,0,0,.65)' }}>{'  /  ' + this.state.currentPathName}</span>
                </div>
            )
        } else {
            return <BreadcurmbLink to="/">首页</BreadcurmbLink>
        }
    }
    render() {
        return <BreadcrumbWrapper>{this.renderPath()}</BreadcrumbWrapper>
    }
}

const mapStateToProps = state => ({
    routes: state.home.routes
})

const mapDispatchToProps = dispatch => {
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Breadcrumb))
