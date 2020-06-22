import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './index.css'

class Pagination extends Component {
    onPageChange = (data) => {
        const { onPageChange, getResponse } = this.props
        onPageChange(data.selected + 1);
        getResponse()

    }
    render() {
        const { totalPages } = this.props
        return (
            <React.Fragment>
            <ReactPaginate 
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            previousLabel={'<'}
            containerClassName='containerClassName'
            pageClassName='pageClassName'
            activeClassName='activeClassName'
            onPageChange={this.onPageChange}
            />
            
        </React.Fragment>
        )
    }
}

export { Pagination }
