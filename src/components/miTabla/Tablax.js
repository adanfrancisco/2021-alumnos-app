import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
// import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
// const { ExportCSVButton } = CSVExport;


const person = [
   { id: 1, name: 'Gob', value: '2' },
   { id: 2, name: 'Buster', value: '5' },
   { id: 3, name: 'George Michael', value: '4' }
];


const columns = [{
   dataField: 'id',
   text: 'Product ID',
   headerStyle: (colum, colIndex) => {
      return {
         width: '20%',
         textAlign: 'center',
         backgroundColor: '#00ffff'
      };
   },
   
   style: { backgroundColor: '#00afb9' }
},

{
   dataField: 'name',
   text: 'Product Name',
   sort: true,
   headerStyle: (colum, colIndex) => {
      return { width: '60%', textAlign: 'center' };
   },
   style: { backgroundColor: '#fdfcdc' }
}, {
   dataField: 'value',
   text: 'Product value',
   headerStyle: (colum, colIndex) => {
      return { width: '20%', textAlign: 'center' };
   },
   style: { backgroundColor: '#fed9b7' }

}];

const options = {
   page: 1,
   sizePerPage: 5,
   nextPageText: '>',
   prePageText: '<',
   showTotal: true
};



class Table extends Component {
   render() {
      return (

         <div className="container-fluid">
            <p className="Table-header">Basic Table</p>
           
            <BootstrapTable
               striped
               
               hover
               keyField='id'
               data={person}
               columns={columns}
               pagination={paginationFactory(options)}

               cellEdit={cellEditFactory({
                  mode: 'click',
                  blurToSave: true,
                  nonEditableRows: () => [0]
               })}
            />

            {/* <ToolkitProvider
               keyField="id"
               data={person}
               columns={columns}
               exportCSV
            >
               {
                  props => (
                     <div>
                        <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
                        <hr />
                        <BootstrapTable {...props.baseProps} />
                     </div>
                  )
               }
            </ToolkitProvider> */}
        </div>




            );
    }
}


            export default Table //exporting a component make it reusable and this is the beauty of react