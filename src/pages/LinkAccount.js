import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { buscaDniAction, buscaUidAction, doLogoutAction } from '../redux/userDuck'

import { useForm } from '../hooks/useForm'


import './link.css'



export const LinkAccount = () => {

    const dispatch = useDispatch()
    let history = useHistory()

    //traigo info del store
    const { fetching, usersystem, uid, dni,uid_database, photo, email, displayName } = useSelector(store => store.authGoogle);

    const inputRef = useRef()
    const [botonActivo, setBotonActivo] = useState(true)


    useEffect(() => {
        if (uid != null) {
            console.log('tiene user Id en Google');
            dispatch(buscaUidAction(uid))
            dni === 0 && inputRef.current.focus();

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  

    //uso el hook Form
    const [formValues, handleInputChange] = useForm({
        midni: 0,
    });

    const { midni } = formValues;

    const handleAsociar = (e) => {
        // console.log('asociemos tu dni al uid de Google!->', dni);
        let {textContent} = e.target
        // console.log('hola',textContent);
        if(textContent==='LIBERAR'){
            console.log('dice Liberar!!!');
            history.push ('/extravio')
        }else{
            console.log('dice Asociar@@!!!')
        }

    }

    // const handleBuscaReset = () => {
    //     dispatch(cancelaBuscaDniAction())
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        //disparo la busqueda en la base de datos
        dispatch(buscaDniAction(midni))
        
        // console.log('buscando...', midni);
    }






    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)

        } else if (object.target.value.length >= 7) {
            setBotonActivo(false)
        }
    }


    const handleReturn = () => {
        dispatch(doLogoutAction())
        history.push('/login')
    }




    if (!usersystem) {
        return (
            <>
                <h1>Hola {displayName}!</h1>
                <img alt='Profile' src={photo} />
                <span>{email}</span>
                <h4>Vamos a buscarte en la base de datos</h4>
                Primero buscamos tu DNI y luego entraras directamente.
                <hr />
                <form
                    onSubmit={handleSubmit}
                    className="ls-form ls-form-horizontal row">
                    <fieldset>

                        <label className="ls-label col-md-4">
                            <b className="ls-label-text"></b>
                            <div className="ls-prefix-group">



                                {(dni !== 0)
                                    ? <h1 style={{ marginLeft: 20 }}>ENCONTRADO dni {dni}!!</h1>
                                    : <h2 style={{ marginLeft: 20 }}>Buscando DNI</h2>}

                                {!fetching ?
                                    dni===0&&<input
                                        ref={inputRef}
                                        type="number"
                                        data-ls-module="charCounter"
                                        maxLength="8"
                                        name="midni"
                                        required
                                        onInput={maxLengthCheck}
                                        onKeyUp={handleInputChange}
                                        placeholder='escribe tu DNI'

                                        style={{
                                            textAlign: 'right',
                                            marginLeft: 15,
                                            justifyContent: 'center',
                                            marginTop: 0
                                        }}
                                    />
                                    :
                                    <label
                                        style={{
                                            marginLeft: 20,
                                            textAlign: 'center',
                                            alignContent: 'center'
                                        }}
                                    >
                                        BUSCANDO EL DNI: <b>{midni} </b>
                                    </label>
                                }



                            </div>
                        </label>

                        <br />

                        {dni === 0?
                            <button
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: 15,
                                    marginTop: 10
                                }}

                                className={fetching
                                    ? "btn btn-success btn-block mr-auto"
                                    : "btn btn-primary btn-block mr-auto"}

                                onClick={handleSubmit}
                                disabled={botonActivo}
                                type="submit"
                            >
                                {fetching ?
                                    'BUSCANDO...' : 'BUSCAR'
                                }
                            </button>
                            :
                            
                            <button
                                style={{
                                    justifyContent: 'center',
                                    marginLeft: 15,
                                    marginTop: 10
                                }}

                                className={fetching ? "btn btn-success btn-block mr-auto" : "btn btn-primary btn-block mr-auto"}
                                onClick={handleAsociar}
                                
                                
                                disabled={botonActivo}
                                type="submit"
                                key='asociar'
                            >
                               {(uid_database&uid!==uid_database)?'LIBERAR':'¿ASOCIAR?'}
                            </button>
                            
                            }
                        <button
                            style={{
                                justifyContent: 'center',
                                marginLeft: 15,
                                marginTop: 10
                            }}

                            className="btn btn-danger btn-block mr-auto"

                            type="submit"
                            onClick={handleReturn}
                        >SALIR</button>
                    </fieldset>

                </form>
            </>
        )
    } else {
        return <Redirect to='/home' />;

    }
}
