import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators as demoActionCreators } from './store'

class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
    }

    handleChange = event => {
        this.setState({ value: event.target.value })
    }

    handleSubmit = event => {
        alert('A name was submitted: ' + this.state.value)
        this.props.addHandle(this.state.value)
        this.setState({ value: '' })
        event.preventDefault()
    }

    handleDelete = (event, value) => {
        alert('A name was deleted: ' + value)
        this.props.delHandle(value)
        event.preventDefault()
    }

    componentDidMount() {
        this.props.loadList()
    }

    render() {
        let { lists } = this.props
        const listItems = lists.map(list => (
            <li key={list.toString()}>
                {list}
                &nbsp;
                <button onClick={e => this.handleDelete(e, list.toString())}>Delete</button>
            </li>
        ))
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </label>
                <div>
                    <ul>{listItems}</ul>
                </div>
            </form>
        )
    }
}
const mapStateToProps = state => ({
    lists: state.demo.lists
})

const mapDispatchToProps = dispatch => {
    return {
        loadList() {
            dispatch(demoActionCreators.loadList())
        },
        addHandle(value) {
            dispatch(demoActionCreators.add(value))
        },
        delHandle(value) {
            dispatch(demoActionCreators.del(value))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Demo))
