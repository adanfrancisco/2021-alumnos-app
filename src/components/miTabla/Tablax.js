import React from 'react'

import datos from './datos'
export const Tablax = () => {
    return (
        <div>
            <h2>Listado de productos en la base de datos MongoDB</h2>
            <table id="customers">
              <thead>
                <tr>
                    <th >Nombre</th>
                    <th>Descripción</th>
                    <th>Precio en USD</th>
                    <th>Acción </th>
                </tr>
              </thead>
              <tbody>    
                {data.products.map((product, key) => {
                  return  <tr key={key} >
                    <td onClick={this.handleVisibility}>
                      <p hidden={this.state.campoVisible} value='test'>{product.name}</p>
                      <p hidden={this.state.inputVisible}>
                        <input value={product.name} />
                      </p>
                    </td> 
                    <td>{product.description}</td>
                    <td>{ "$" + product.price}</td>
                    <Mutation  mutation={DELETE_CURRENT_PRODUCT}>
                    {(deleteproduct, { data }) => (
                      <td><button onClick={() => deleteproduct({variables: {_id: product._id }})}>Eliminar</button></td>
                    )}
                    </Mutation>                 
                  </tr>
                })}  
              </tbody>
            </table>
          </div>
    )
}
