import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useForm } from '../hooks/useForm'
import { doLogoutAction } from '../redux/userDuck'

export const Soy_nuevo = () => {

    const dispatch = useDispatch()
    let history = useHistory()
    const inputRef = useRef()

    const [botonActivo, setBotonActivo] = useState(true)

    //uso el hook Form
    const [formValues, handleInputChange] = useForm({
        midni: 0,
    });
    const { midni } = formValues;
    //cada vez que cambie el largo a menor q 7 apago el boton
    useEffect(() => {
        if(midni.length<7)setBotonActivo(true)
    }, [midni])

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
            // setBotonActivo(true)
        } else if (object.target.value.length >= 7) {
            setBotonActivo(false)
        }
    }

    const nuevo_usuario = (e) => {
        e.PreventDefault()
        console.log('nuevo usuario');
    }
    const handleReturn = () => {
        dispatch(doLogoutAction())
        history.push('/login')
    }
    return (
        <>

        <h2>ALTA DE USUARIO</h2>
            <form
            style={{
                marginLeft:10,
                marginTop:30
            }}
                // onSubmit={}
                className="ls-form ls-form-horizontal row">
                <fieldset>

                    <label className="ls-label col-md-4">
                        <b className="ls-label-text"></b>
                        <div className="ls-prefix-group">

                            {/* {(dni !== 0) && (!uid_database)
                                    ? <h1 style={{ marginLeft: 20 }}>
                                        DNI-{dni} Encontrado!
                                        <br />Pertenece a : <b>{apellido}</b>, {nombre}
                                        <br /> ¿Lo asociamos a tu cuenta Google?
                                    </h1>
                                    : <h2 style={{ marginLeft: 20 }}>  </h2>} */}

                            {/* {!fetching ?
                                    dni === 0 && 
                                     */}
                            <input
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
                            {/* :
                                    <label
                                        style={{
                                            marginLeft: 20,
                                            textAlign: 'center',
                                            alignContent: 'center'
                                        }}
                                    >
                                        BUSCANDO EL DNIx: <b>{midni} </b>
                                    </label>
                                } */}
                        </div>
                    </label>

                    <br />

                    {/* {dni === 0 ?
                            <> */}
                    <button
                        style={{
                            justifyContent: 'center',
                            marginLeft: 15,
                            marginTop: 10.

                        }}
                        className="btn btn-info ancho_boton"
                        onClick={nuevo_usuario}
                        disabled={botonActivo}

                    >SOY NUEVO</button>
                    {/* <br />
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

                        } */}
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
}
