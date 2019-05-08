import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Table, Row, Col, Pagination } from 'antd'
// import { actionCreators } from './store'
// import store from '../../store'
import { withRouter } from 'react-router-dom'
import http from 'utils/http'

class ZeroList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: null,
            columns: [],
            total: null,
            current: 1,
            pageSize: 0,
            selectedRows: []
        }
    }

    /**
     * 替换分页的参数
     *
     * @param {int} current 当前的页数
     * @param {int} pageSize 每页显示多少条数据
     *
     * @return {string} url
     */
    getFetchUrl = (dataUrl, current, pageSize) => {
        return dataUrl.replace(/#{start}/gm, current).replace(/#{end}/gm, pageSize)
    }

    /**
     * 第一次加载或者父组件state改变时触发
     */
    processProps = props => {
        // console.info('processProps dataUrl--->', props.dataUrl)
        if (props.dataUrl) {
            // console.info('processProps serialsNumber--->', props.serialsNumber)
            // console.info('processProps nextProps.pages--->', props.pages)
            if (props.serialsNumber && props.serialsNumber.show) {
                let { current, pageSize } = props.pages
                console.info('props.pages.current----->', current)
                this.setState({
                    current: current,
                    pageSize: pageSize,
                    columns: [
                        {
                            title: props.serialsNumber.title,
                            key: 1,
                            render: (text, record, index) => {
                                return (this.state.current - 1) * this.state.pageSize + index + 1
                            }
                        },
                        ...props.columns
                    ]
                })
            } else {
                this.setState({
                    columns: props.columns
                })
            }

            let url = props.dataUrl
            if (props.pages && props.pages.show) {
                let { current, pageSize } = props.pages
                this.setState({
                    pageSize: pageSize
                })
                url = this.getFetchUrl(url, current, pageSize)
            }
            this.fetchDataList(url)
        }
    }

    /**
     * 点击下面的分页时触发
     */
    onShowSizeChange = (current, pageSize) => {
        this.setState({
            current: current,
            pageSize: pageSize
        })
        let url = this.getFetchUrl(this.props.dataUrl, current, pageSize)
        this.fetchDataList(url)
    }

    /**
     * 第一次加载时触发
     */
    componentDidMount = () => {
        console.info('zerolist componentDidMount dataUrl--->', this.props.dataUrl)
        this.processProps(this.props)
    }

    /**
     * 父组件state改变时触发
     */
    componentWillReceiveProps = nextProps => {
        console.info('zerolist componentWillReceiveProps dataUrl--->', nextProps.dataUrl)
        // 当url变化时才重新加载数据
        if (this.props.dataUrl !== nextProps.dataUrl) {
            this.processProps(nextProps)
        }
    }

    /* componentWillMount = () => {
        console.info('componentWillMount dataUrl--->', this.props.dataUrl)
    }

    componentWillUpdate = nextProps => {
        console.info('componentWillUpdate dataUrl--->', nextProps.dataUrl)
    }

    shouldComponentUpdate = nextProps => {
        console.info('shouldComponentUpdate dataUrl--->', nextProps.dataUrl)
        return true
    }

    componentDidUpdate = () => {
        console.info('componentDidUpdate dataUrl--->', this.props.dataUrl)
    }

    componentWillUnmount = () => {
        console.info('componentWillUnmount dataUrl--->', this.props.dataUrl)
    } */

    /**
     * ajax加载数据
     */
    fetchDataList = url => {
        console.info('zerolist fetch url--->', url)
        http.get(url).then(data => {
            let results = null
            if (this.props.dataCallback) {
                results = this.props.dataCallback(data)
                this.setState({
                    total: results.total,
                    dataList: results.dataList
                })
            } else {
                results = data.rows ? data.rows : data
                this.setState({
                    dataList: results
                })
            }
        })
    }

    addOrRemoveSelectRows = record => {
        let findIndex = -1
        this.state.selectedRows.forEach((item, index) => {
            if (item.id === record.id) {
                findIndex = index
                this.state.selectedRows.splice(findIndex, 1)
                this.setState({
                    selectedRows: this.state.selectedRows
                })
                return false
            }
        })
        if (findIndex < 0) {
            if (this.props.multiSelect) {
                let arr = this.state.selectedRows
                arr.push(record)
                this.setState({
                    selectedRows: arr
                })
            } else {
                this.setState({
                    selectedRows: [record]
                })
            }
        }
    }

    render() {
        console.info('zerolist render dataUrl--->', this.props.dataUrl)
        return (
            <div>
                <Table
                    scroll={this.props.scroll}
                    rowKey="id"
                    dataSource={this.state.dataList}
                    columns={this.state.columns}
                    pagination={false}
                    onRow={record => {
                        return {
                            onClick: event => {
                                this.addOrRemoveSelectRows(record)
                                this.props.handleRowClick && this.props.handleRowClick(event, record)
                            },
                            onDoubleClick: event => {
                                this.props.handleRowDoubleClick && this.props.handleRowDoubleClick(event, record)
                            },
                            onContextMenu: event => {},
                            onMouseEnter: event => {},
                            onMouseLeave: event => {}
                        }
                    }}
                    rowClassName={record => {
                        let isSelectedRow = false
                        this.state.selectedRows.forEach((row, index) => {
                            if (row.id === record.id) {
                                isSelectedRow = true
                                return false
                            }
                        })
                        return isSelectedRow ? 'selectedRow' : null
                    }}
                />
                {this.state.total && this.state.total > 0 && this.props.pages && this.props.pages.show && (
                    <Row type="flex" justify="end">
                        <Col span={16} offset={8}>
                            <Pagination
                                style={{ marginTop: 5 }}
                                showSizeChanger
                                onChange={this.onShowSizeChange}
                                onShowSizeChange={this.onShowSizeChange}
                                // defaultCurrent={this.state.current}
                                current={this.state.current}
                                total={this.state.total}
                                // defaultPageSize={this.state.pageSize}
                                pageSize={this.state.pageSize}
                            />
                        </Col>
                    </Row>
                )}
                <style>
                    {`
                        .selectedRow {
                            background-color: #E9F7FE;
                        }
                    `}
                </style>
            </div>
        )
    }
}
/* const mapState = state => ({
  selectedRows: state.zeroList.selectedRows,
  dataList: state.zeroList.dataList
})
const mapDispatch = dispatch => {
  return {
    handleRowClick(event, record) {
      dispatch(actionCreators.addOrRemoveSelectRows(record))
    },
    initProps(props) {
      if (props.multiSelect) {
        dispatch(actionCreators.initMultiSelect(props.multiSelect))
      }
      if (props.dataUrl) {
        dispatch(actionCreators.initDataList(props.dataUrl))
      }
    }
  }
} */
export default withRouter(ZeroList)
