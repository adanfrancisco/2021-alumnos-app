import axios from 'axios';
import { loginWithGoogle, logoutGoogle } from '../auth/firebase'
import { uri_local } from "../redux/vars";
//cuando este en produccion debere importar solo uri
//que hace referencia al back-end en la nube
let uri = uri_local;

let initialData = {
    loggedIn: false,
    fetching: false,
    uid: null,
    uid_database:'',
    usersystem: false,
    dni: 0,
    photo: null,
    asociado:false
}

let LOGIN = 'LOGIN';
let LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let LOGIN_ERROR = 'LOGIN_ERROR';
let LOGOUT = 'LOGOUT';

let USERSYTEM_BUSCA = 'USERSYTEM_BUSCA'
let USERSYSTEM = 'USERSYSTEM'

let USER_SEARCH = 'USER_SEARCH'
let USER_SEARCH_CANCEL = 'USER_SEARCH_CANCEL'
let USER_SEARCH_EXITO = 'USER_SEARCH_EXITO'

//reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case USER_SEARCH_EXITO:
            return {
                ...state,
                fetching: false,
                loggedIn: true,
                usersystem: false,
                asociado:false,
                dni: action.payload.dni,
                uid_database:action.payload.uid_database
            
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
                fetching: false,
                loggedIn: true,
                usersystem: true,
                asociado:true,
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
                fetching: false,
                loggedIn: false
            }

        default:
            return state
    }
}

//Funcion auxiliar para guardar en LocalStorage
function saveStorage(storage) {
    localStorage.setItem('usuario', JSON.stringify(storage))
}

export let cancelaBuscaDniAction = (dni) => (dispatch) => {
    dispatch({ type: USER_SEARCH_CANCEL })//fetching true}
}

// Una vez logueado y comprobado que no se encuentra asociado
// buscamos el dato en la Base de datos
export let buscaDniAction = (dnix) => async (dispatch) => {
    
    dispatch({ type: USER_SEARCH })//fetching true

    let datos, info, dni, uid_database;
    try {
        //consulto la base de datos en el back-end
        await axios.get(uri + `consultar-alumno/${dnix}`)
            .then((response) => {
                datos = response.data
                info = datos.info
                dni = info.dni
                uid_database = info.uid
                 console.log('los datos son uid_database: ',uid_database);
            })

        if (datos.mensaje !== 'No existe ese dni') {

            // dispatch({ type: USERSYTEM_BUSCA })//fetching true

            dispatch({
                type: USER_SEARCH_EXITO,
                payload: {dni,uid_database}
            })
            dispatch({USER_SEARCH_CANCEL})//apago el fetching
        } else {
            dispatch(cancelaBuscaDniAction())
            console.log('el dato no existe');
        }
    } catch (error) {
        dispatch(cancelaBuscaDniAction())
        // console.log(error);
    }

}


export let buscaUidAction = (uid) => async (dispatch, getState) => {
    let datos, info, dni;
    try {
        //consulto la base de datos en el back-end
        await axios.get(uri + `consultar-alumnos/${uid}`)
            .then((response) => {
                datos = response.data
                info = datos.info
                dni = info.dni
                console.log(datos);
            })

        if (datos.mensaje !== 'no existe') {

            dispatch({ type: USERSYTEM_BUSCA })//fetching true

            dispatch({
                type: USERSYSTEM,
                payload: dni
            })
            console.log(getState());
        } else {
            console.log('el dato no existe');
        }
    } catch (error) {
        // console.log('');
    }
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
export let yaLogueadoSinValidarAction = (uid, displayName, photo, email) => (dispatch) => {
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
            dni:0
        }
    })
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