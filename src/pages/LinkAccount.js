import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { asocia_alumno_Action, buscaDniAction, buscaUidAction, doLogoutAction, fetchinOnAction } from '../redux/userDuck'

import { useForm } from '../hooks/useForm'


import './link.css'
import axios from 'axios'
import { uri_local } from '../redux/vars'
let uri = uri_local


export const LinkAccount = () => {

    const dispatch = useDispatch()
    let history = useHistory()

    //traigo info del store
    const { fetching, usersystem, uid, dni, uid_database, photo, email, displayName, apellido, nombre
    } = useSelector(store => store.authGoogle);

    const inputRef = useRef()

    const [botonActivo, setBotonActivo] = useState(true)

    async function busca_uid_alumno(uid) {
        let sql = uri + `busca_alumno_uid.php?id=${uid}`
        // console.log(sql)
        await axios.get(sql)
            .then((response) => {
                // console.log(response);
                let { dni } = response.data
                console.log(dni, uid);
                dispatch(buscaUidAction(dni))
                // // info = datos.info
            })
            .catch(error => console.log(error))
    }
    //se ejecuta una sola vez!
    useEffect(() => {
        dispatch(fetchinOnAction)
        if (uid != null) {
            busca_uid_alumno(uid)
        } else {
            console.log('tiene user Id en Google');
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
        let { textContent } = e.target
        // console.log('hola',textContent);
        if (textContent === 'LIBERAR') {
            console.log('dice Liberar!!!');
            history.push('/extravio')
        } else {
            console.log('dice Asociar@@!!!')
            dispatch(asocia_alumno_Action(
                dni,
                uid, email))
            // if (uid != null) history.push('/login')
            window.location.reload(false);

        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let { textContent } = e.target
        //disparo la busqueda en la base de datos
        if (textContent === 'BUSCAR') { dispatch(buscaDniAction(midni)) }

        console.log('buscando...', midni);
    }

    const pedirnuevo = () => {
        // e.preventDefault()
        console.log('va a /');
        // history.push('/')
        window.location.reload(false);

    }
const soy_nuevo=()=>{
    history.push('/soy_nuevo')
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



                                {(dni !== 0) && (uid_database)
                                    ? <h5 style={{ marginLeft: 20 }}>
                                        El DNI <b>{dni}</b> esta asociado a otro mail de
                                        Google, desea liberarlo
                                        para asociarlo a: <b>{email}</b>?
                                        <br/><p
                                        style={{
                                            backgroundColor:'lightcoral'
                                        }}>Recuerde tener su clave a mano</p>
                                    </h5>
                                    : <h2 style={{ marginLeft: 20 }}> </h2>}
                                {(dni !== 0) && (!uid_database)
                                    ? <h1 style={{ marginLeft: 20 }}>
                                        DNI-{dni} Encontrado!
                                        <br />Pertenece a : <b>{apellido}</b>, {nombre}
                                        <br /> ¿Lo asociamos a tu cuenta Google?
                                    </h1>
                                    : <h2 style={{ marginLeft: 20 }}>  </h2>}

                                {!fetching ?
                                    dni === 0 && <input
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
                                            textAlign: 'center',
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
                                        BUSCANDO EL DNIx: <b>{midni} </b>
                                    </label>
                                }



                            </div>
                        </label>

                        <br />

                        {dni === 0 ?
                            <>
                                <button
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 15,
                                        marginTop: 10.
                                        
                                    }}
                                    className="btn btn-info ancho_boton"
                                    onClick={soy_nuevo}

                                >SOY NUEVO</button>
                                <br />
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
                            </>
                            :
                            <>
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
                                    {(uid_database && uid !== uid_database) ? 'LIBERAR' : '¿ASOCIAR?'}
                                </button>
                                <button
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 15,
                                        marginTop: 10
                                    }}

                                    className={"btn btn-warning btn-block mr-auto"}
                                    onClick={pedirnuevo}

                                >CAMBIAR</button>
                            </>

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
