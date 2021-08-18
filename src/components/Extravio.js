import React from 'react';
import { useHistory } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';


export const Extravio = () => {
  const loading = false

  let history = useHistory()
  const handleReturn = () => {
    history.push('/login')
  }
  const handleSubmit =()=>{
    history.push('/reset')
  }

  return (
    <>
      <br />
      <div className='container-fluid'>
        <div className='row justify-content-center '>
          <Card className='col-auto text-center' style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://isfdyt93-bue.infd.edu.ar/sitio/wp-content/uploads/2019/10/INI2.jpeg" />
            <Card.Body>
              <Card.Title
                className='col-auto text-center'
                style={{ backgroundColor: '#00AA9E' }}
              >
                RECUPERAR CUENTA
              </Card.Title>
              <Card.Text className='col-auto text-center'>

                Recupera tu cuenta.<br />
                Envianos los datos con que te registraste

              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
              <input type='text' placeholder='DNI' />
              <input type='text' placeholder='clave' />
              <div className='col-auto text-center'>
                <button
                  style={{ justifyContent: 'center', marginRight: 5, marginTop: 10 }}
                  className="btn btn-danger btn-block mr-auto"
                  type="submit"
                  disabled={loading}
                  onClick={handleReturn}
                >

                  CANCELAR
                </button>
                <button
                  style={{ justifyContent: 'center', marginLeft: 5, marginTop: 10 }}
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}

                >

                  COMUNICAR
                </button>

              </div>

            </Card.Body>
          </Card>
        </div>
      </div>




    </>
  )
}
