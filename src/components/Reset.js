import React from 'react'
import { Card } from 'react-bootstrap';

import { useHistory } from 'react-router-dom'

export const Reset = () => {

    let history = useHistory()
    const handleReturn = () => {
      history.push('/login')
    }

    return (
        <div className='container-fluid'>
        <div className='row justify-content-center  minh-100'>
            <Card className='col-auto ' style={{ width: '25rem' }}>
              <Card.Img variant="top" src="https://isfdyt93-bue.infd.edu.ar/sitio/wp-content/uploads/2019/10/INI2.jpeg" />
              <Card.Body>
                <Card.Title className='col-auto text-center'>CUENTA  RESTABLECIDA</Card.Title>
                <Card.Text >
                <ul>
                <li>Ingresar nuevamente con Google</li>
                <li>Buscarte en nuestra base de dados</li>
                <li>Al encontrarte, asociar tu nueva cuenta</li>
                <li>Iniciar sesion nuevamente</li>
            </ul>
            Mucho Exito en esta Tarea.
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
                <div className='col-auto text-center'>
                  <button
                    style={{ justifyContent: 'center' }}
                    className="btn btn-primary btn-block"
                    type="submit"
                    onClick={handleReturn}                  >
                    
                    SALIR
                  </button>
                  
                </div>

              </Card.Body>
            </Card>
          </div>
          </div>
          
    )
}
