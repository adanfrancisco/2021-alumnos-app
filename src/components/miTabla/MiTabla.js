import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { tablePaging, selectRow} from './paging';
import  {alumnos} from './datos'
import  {columnas} from './columnas'

export default class Tabla extends React.Component{
    constructor() {
        super();
        this.state = {
        products: [
            {
                "id": "1",
                "name": "Book",
                "price": "18"
            },
            {
                "id": "2",
                "name": "Mobile",
                "price": "400"
            },
            {
                "id": "3",
                "name": "PC",
                "price": "1000"
            },
            {
                "id": "4",
                "name": "PS4",
                "price": "500"
            },
            {
                "id": "5",
                "name": "Chromebook",
                "price": "500"
            }
        ],
        columns: [{
            dataField: 'id',
            text: 'Product ID',
            editable:false
        },
        {
            dataField: 'name',
            text: 'Product Name',
            editable: true,
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'Book',
                    label: 'Book'
                }, {
                    value: 'Mobile',
                    label: 'Mobile'
                }, {
                    value: 'PC',
                    label: 'PC'
                }, {
                    value: 'PS4',
                    label: 'PS4'
                }, {
                    value: 'Chromebook',
                    label: 'Chromebook'
                }]
            }
        },
        {
            dataField: 'price',
            text: 'Product Price',
            sort: true,
            editable: false
        }

        ]
      };
   }


    render() {
        return (
            <div>
                <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={alumnos}
                    columns={columnas}
                    pagination={tablePaging}
                    selectRow={selectRow}
                    cellEdit={cellEditFactory({ mode: 'click' })}/>
                    </div>
        );
    }
}