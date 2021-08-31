import paginationFactory from 'react-bootstrap-table2-paginator';

export const tablePaging = paginationFactory({
    sizePerPage: 5,
    showTotal: true,

    onSizePerPageChange: (sizePerPage, page) => {
        console.log('Size per page change!!!');
        console.log('Newest size per page:' + sizePerPage);
        console.log('Newest page:' + page);
    },
    onPageChange: (page, sizePerPage) => {
        console.log('Page change!!!');
        console.log('Newest size per page:' + sizePerPage);
        console.log('Newest page:' + page);
    }
});

export const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    clickToEdit: true,
    onSelect: (row, isSelect, rowIndex, e) => {
    return true;
     },
   onSelectAll: (isSelect, rows, e) => {
        return true;
    },
    style: { backgroundColor: '#c8e6c9' }
};