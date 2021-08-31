import  { Type } from 'react-bootstrap-table2-editor';
// "idAlumno": "13543567",
//         "nombre": "Diego Armando Lira Rodríguez",
//         "fecha_nacimiento": "10-10-1992",
//         "activo": 1,
//         "sexo": "M",
//         "fecha_alta":"05-03-2016"
export const
columnas= [{
    dataField: 'idAlumno',
    text: 'idAlumno',
    editable:false
},
{
    dataField: 'nombre',
    text: 'nombre',
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
    dataField: 'fecha_nacimiento',
    text: 'fecha_nacimiento',
    sort: true,
    editable: false
},
{
    dataField: 'sexo',
    text: 'sexo',
    sort: true,
    editable: false
},
{
    dataField: 'fecha_alta',
    text: 'fecha_alta',
    sort: true,
    editable: false
},
{
    dataField: 'informe_1',
    text: 'informe_1',
    sort: true,
    editable: false
},
{
    dataField: 'informe_2',
    text: 'informe_2',
    sort: true,
    editable: false
}

]