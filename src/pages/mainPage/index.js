import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainPageStyle from 'statics/css/MainPage.module.scss'

class MainPage extends Component {
    render() {
        return <div className={MainPageStyle.mainPage}>MainPage</div>
    }
}
const mapState = state => ({})
const mapProps = dispatch => {
    return {}
}
export default connect(
    mapState,
    mapProps
)(MainPage)
