import axios from 'axios';
import { loginWithGoogle, logoutGoogle } from '../auth/firebase'
import { uri_local } from "../redux/vars";
//cuando este en produccion debere importar solo uri
//que hace referencia al back-end en la nube
var uri = uri_local;

let initialData = {
    loggedIn: false,
    fetching: false,
    uid: null,
    uid_database: '',
    usersystem: false,
    dni: 0,
    photo: null,
    asociado: false
}

let LOGIN = 'LOGIN';
let LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let LOGIN_ERROR = 'LOGIN_ERROR';
let LOGOUT = 'LOGOUT';

let USERSYTEM_BUSCA = 'USERSYTEM_BUSCA'//para buscar fetching true
let USERSYSTEM = 'USERSYSTEM'

let USER_SEARCH = 'USER_SEARCH' //para buscar fetching true
let USER_SEARCH_CANCEL = 'USER_SEARCH_CANCEL'//para buscar fetching false
let USER_SEARCH_EXITO = 'USER_SEARCH_EXITO'
let USER_UPDATE_EXITO = 'USER_UPDATE_EXITO'


//reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case USER_UPDATE_EXITO:
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                usersystem: true,
                asociado: true,
            }
        case USER_SEARCH_EXITO:
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                usersystem: false,
                asociado: true,
                dni: action.payload.dnix,
                apellido: action.payload.apellidox,
                clave: action.payload.clavex,
                domicilio: action.payload.domiciliox,
                fecha_nac: action.payload.fecha_nacx,
                genero: action.payload.generox,
                localidad: action.payload.localidadx,
                nombre: action.payload.nombrex,
                tel_celu: action.payload.tel_celux,
                tel_fijo: action.payload.tel_fijox,
                uid_database: action.payload.uid_databasex,


            }
        case USER_SEARCH:
            return {
                ...state,
                fetching: true
            }
        case USER_SEARCH_CANCEL:
            return {
                ...state,
                fetching: false
            }
        case USERSYTEM_BUSCA:
            return {
                ...state,
                fetching: true
            }
        case USERSYSTEM:
            return {
                ...state,
                usersystem: true,
                asociado: true,
                dni: action.payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }

        case LOGIN:
            return {
                ...state,
                fetching: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                ...action.payload
            }
        case LOGOUT:
            return {
                ...state,
                loggedIn: false,
                fetching: false,
                uid: null,
                uid_database: '',
                usersystem: false,
                dni: 0,
                photo: null,
                asociado: false,
                displayName: '',
                email: ''
            }

        default:
            return state
    }
}

//Funcion auxiliar para guardar en LocalStorage
function saveStorage(storage) {
    localStorage.setItem('usuario', JSON.stringify(storage))
}

export let asocia_alumno_Action = (dni, uid,email) => async (dispatch) => {

    let datos = {
        dni: dni,
        uid: uid,
        email:email
    }
    console.log(JSON.stringify(datos))
    // actualiza_dni_asoc.php?uid=kdkd&id=22333444
    let sql = `${uri}actualiza_dni_asoc.php?uid=${uid}&id=${dni}&email=${email}`
    console.log('la consulta',sql);
    await axios.post(sql,
        {
            data: {
                dni: `${dni}`,
                uid: `'${uid}'`,
                email: `'${email}'`
            }
        })
        .then(function (res) {
            console.log(res);
        })
        .catch(error => console.log(error))
}

export let fetchinOnAction = () => (dispatch) => {
    dispatch({ type: USER_SEARCH })//fetching true}
}
export let cancelaBuscaDniAction = (dni) => (dispatch) => {
    dispatch({ type: USER_SEARCH_CANCEL })//fetching true}
}

// Una vez logueado y comprobado que no se encuentra asociado
// buscamos el dato en la Base de datos
export let buscaDniAction = (dnix) => async (dispatch) => {

    dispatch({ type: USER_SEARCH })//fetching true

    // let datos,  dni, uid_database, apellido, nombre, clave, domicilio, email, fecha_nac, genero, localidad, tel_celu, tel_fijo;
    let sql1 = uri + `busca_alumno_dni.php?id=${dnix}`;
    console.log(sql1);
    try {
        //consulto la base de datos en el back-end
        await axios.get(sql1)
            .then((response) => {
                let { apellido, clave, dni, domicilio, fecha_nac,
                    genero, localidad, nombre, tel_celu, tel_fijo, uid } = response.data

                console.log('los datos del payload: ', response.data);
                console.log('el dni es:', dni);
                dispatch({
                    type: USER_SEARCH_EXITO,
                    payload: {
                        dnix: dni,
                        apellidox: apellido,
                        clavex: clave,
                        domiciliox: domicilio,
                        fecha_nacx: fecha_nac,
                        generox: genero,
                        localidadx: localidad,
                        nombrex: nombre,
                        tel_celux: tel_celu,
                        tel_fijox: tel_fijo,
                        uid_databasex: uid,

                    }
                })
            }).catch(error => {
                console.log(error)
                dispatch(cancelaBuscaDniAction())
            })


    } catch (error) {
        dispatch(cancelaBuscaDniAction())
        console.log(error);
    }

}


export let buscaUidAction = (uid) => async (dispatch) => {
    dispatch({
        type: USERSYSTEM,
        payload: uid
    })

}

export let doLogoutAction = () => (dispatch) => {

    dispatch({ type: LOGOUT })
    logoutGoogle()
}

//todo esto es login //////////////////////////////////////////////
export let yaLogueadoAction = (dni, uid, displayName, photo, email) => (dispatch) => {
    // console.log(getState());
    // saveStorage(getState())
    dispatch({ type: LOGIN })
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {
            dni: dni,
            uid: uid,
            displayName: displayName,
            photo: photo,
            email: email,
        }
    })
}
export let yaLogueadoSinValidarAction = (uid, displayName, photo, email) => async (dispatch) => {
    // console.log('los datos son: ', uid, displayName, photo, email);
    // saveStorage(getState())
    dispatch({ type: LOGIN })
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {
            uid: uid,
            displayName: displayName,
            photo: photo,
            email: email,
            dni: 0
        }
    })

    //  axios.get(uri + `busca_alumno_uid.php?id=${uid}`)
    //         .then((response) => {
    //             // console.log(response);
    //             let { dnix } = response.data
    //              console.log(dnix);
    //             // dispatch({
    //             //     type: USERSYSTEM,
    //             //     payload:dnix
    //             // })
    //             // // info = datos.info
    //         })
}

export let doGoogleLoginAction = () => async (dispatch, getState) => {

    dispatch({
        type: LOGIN
    })

    return await loginWithGoogle()
        .then(user => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photo: user.photoURL,
                    email: user.email
                }
            })
            saveStorage(getState())
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
}