import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import {  useDispatch, useSelector } from 'react-redux'
import { doLogoutAction } from '../redux/userDuck'

export const LinkAccount = () => {
    const { displayName } = useSelector( store =>store.authGoogle);
    const  maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }
const dispatch = useDispatch()
    let history = useHistory()

    const [dni, setDNI] = useState(0)

    const handleReturn = () => {
        dispatch(doLogoutAction())
        history.push('/login')
    }
    const handleSubmit=(e)=>{
        e.PreventDefault()
        console.log('el dni ingresado es:', dni);
    }

    const handleInputChange = (e) => {
        setDNI(e.target.value)
        console.log(dni)
    }

    return (
        <>
            <Header />
            <h1>Hola {displayName}!</h1>
            <h4>Vamos a buscarte en la base de datos</h4>
            Primero buscamos tu DNI y luego entraras directamente.
            <hr />
            <form onSubmit={handleSubmit} className="ls-form ls-form-horizontal row">
                <fieldset>
                    <label className="ls-label col-md-4">
                        <b className="ls-label-text"></b>
                        <div className="ls-prefix-group">
                            <input
                                type="number"
                                data-ls-module="charCounter"
                                maxLength="8"
                                name="midni"
                                required
                                value={dni}
                                onInput={maxLengthCheck}
                                onKeyUp={handleInputChange}
                                placeholder='escribe tu DNI'
                            />
                            <span className="ls-label-text-prefix ls-ico-user"></span>
                        </div>
                    </label>
                    <button
                        style={{ justifyContent: 'center', marginLeft: 5, marginTop: 0 }}
                        className="btn btn-secondary btn-block mr-auto"

                        type="submit"
                    >ENVIAR</button>
                    <button
                        style={{ justifyContent: 'center', marginLeft: 15, marginTop: 0 }}
                        className="btn btn-danger btn-block mr-auto"

                        type="submit"
                        onClick={handleReturn}
                    >SALIR</button>
                </fieldset>

            </form>
        </>
    )
}
