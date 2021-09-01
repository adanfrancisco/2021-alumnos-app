import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { buscaUidAction, doLogoutAction } from '../redux/userDuck'
import './link.css'



export const LinkAccount = () => {

    const dispatch = useDispatch()
    let history = useHistory()
    const {  usersystem, uid, displayName } = useSelector(store => store.authGoogle);

    useEffect(() => {
        if(uid!=null){
            console.log('tiene user Id en Google');
            dispatch(buscaUidAction(uid))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const [dni, setDNI] = useState(0)

    const handleReturn = () => {
        dispatch(doLogoutAction())
        history.push('/login')
    }
    const handleSubmit = (e) => {
        e.PreventDefault()
        console.log('el dni ingresado es:', dni);
    }

    const handleInputChange = (e) => {
        setDNI(e.target.value)
        console.log(dni)
    }
    
    
    if(!usersystem){
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
                        className="btn btn-primary btn-block mr-auto"

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
    )}else{
        return <Redirect to='/home'/>;
        
    }
}
