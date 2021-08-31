import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { tablePaging, selectRow } from './paging';
import { alumnos } from './datos';
import { columnas } from './columnas';

export const Tabla = () => {
  return (
    <div className='container-fluid'>
      <BootstrapTable
        striped
        hover
        keyField='id'
        data={alumnos}
        columns={columnas}
        pagination={tablePaging}
        selectRow={selectRow}
        cellEdit={cellEditFactory({ mode: 'click' })} />
    </div>
  )
}
