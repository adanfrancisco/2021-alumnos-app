import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'

export const LinkAccount = () => {

    const  maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

    let history = useHistory()

    const [dni, setDNI] = useState(0)

    const handleReturn = () => {
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
            <h3>Linkear cuenta Google con DNI</h3>
            Aqui deberia ya estar logueado con Google (REDUX)
            y buscar en la base de datos de alumnos por DNI
            si lo encuentra, permitiria asociar el ID de Google
            al usuario y podria acceder directamente la proxima vez
            simplemente utilizando el login de Googles

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
