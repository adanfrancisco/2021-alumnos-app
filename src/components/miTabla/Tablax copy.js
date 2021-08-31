import React from 'react'



import { alumnos } from './datos'
export const Tablax = () => {

  const valorViejo =(value)=>{
    console.log(value);

  }
  const cliCkFila = e =>{
    const item=e.target.getAttribute('key');
    console.log('hiciste click en: ', item);
  }

    return (
        <div className='container-fluid'>
            <h2>Listado de productos en la base de datos MongoDB</h2>
            <table id="customers">
              <thead>
                <tr>
                    <th >Indice</th>
                    <th >Nombre</th>
                    <th>Descripción</th>
                    <th>Precio en USD</th>
                    <th>Acción </th>
                </tr>
              </thead>
              <tbody>    
                {alumnos.map((alumno, key) => {
                  return  <tr 
                  key={key} 
                  onClick={()=>cliCkFila}//////////////////////////////
                  >

                    <td>{key}</td>
                    <td >
                      <p value='test'>{alumno.nombre}</p>
                      
                    </td> 
                    <td>{ alumno.sexo }</td>
                    <td
                    style={{cursor:'pointer'}}
                    // onClick =  {
                    //   value =>valorViejo(value)
                    //   // value => console.log(value )
                    // }

                    //Arroja el valor del texto sobre el que hago click
                    // onClick =  {value => console.log(value.currentTarget.innerText )}
                    >{ "$" + alumno.fecha_nacimiento}</td>
                  </tr>
                })}  
              </tbody>
            </table>
          </div>
    )
}
