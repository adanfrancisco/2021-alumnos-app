import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { doGoogleLoginAction } from '../redux/userDuck';


export const Login = () => {
  const { fetching, loggedIn } = useSelector( store =>store.authGoogle);

  const dispatch = useDispatch()
  let history = useHistory()

  const handleSubmit = () => {
    dispatch(doGoogleLoginAction())
   
    
  }
  if(fetching) return <h2>Cargando...</h2>
  if(loggedIn) history.push('/link');
  return (
    <>
    
      <br />
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center minh-100'>
            <Card className='col-auto text-center' style={{ width: '20rem' }}>
              <Card.Img variant="top" src="https://isfdyt93-bue.infd.edu.ar/sitio/wp-content/uploads/2019/10/INI2.jpeg" />
              <Card.Body>
                <Card.Title className='col-auto text-center'>Sistema de Alumnos</Card.Title>
                <Card.Text className='col-auto text-center'>
                  Entraras con tu cuenta Google Personal
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
                <div className='col-auto text-center'>
                  <button
                    style={{ justifyContent: 'center' }}
                    className="btn btn-primary btn-block"
                    type="submit"
                    // disabled={fetching}
                    onClick={handleSubmit}
                  >
                    <div className="google-icon-wrapper ">
                      <img
                        className="google-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="google button"
                      />
                    </div>
                    INGRESAR
                  </button>
                  <br />
                  <Link to='/extravio'> ¿Restablecer Cuenta?</Link>
                </div>

              </Card.Body>
            </Card>
          </div>

      </div>


    </>
  )
}
