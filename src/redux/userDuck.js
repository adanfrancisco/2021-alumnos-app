import axios from 'axios';
import { loginWithGoogle, logoutGoogle } from '../auth/firebase'
import {uri_local} from "../redux/vars";
//cuando este en produccion debere importar solo uri
//que hace referencia al back-end en la nube
let uri = uri_local;

let initialData={
    loggedIn : false,
    fetching: false,
    uid:null,
    usersystem:false,
    dni:null,
    photo:null
}

let LOGIN = 'LOGIN';
let LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let LOGIN_ERROR = 'LOGIN_ERROR';
let LOGOUT = 'LOGOUT';
let USERSYTEM_BUSCA ='USERSYTEM_BUSCA'
let USERSYSTEM ='USERSYSTEM'
let USER_SEARCH ='USER_SEARCH'
let USER_SEARCH_EXITO ='USER_SEARCH_EXITO'

//reducer
export default function reducer(state=initialData, action){
    switch (action.type){
        case USER_SEARCH_EXITO:
            return{
                ...state,
                
            }
        case USERSYTEM_BUSCA||USER_SEARCH:
            return{
                ...state,
                feching:true
            }
        case USERSYSTEM:
            return{
                ...state,
                feching:false,
                loggedIn:true,
                usersystem:true,
                dni:action.payload
            }
        case LOGIN_ERROR:
            return{
                ...state, 
                feching:false, 
                error:action.payload
            }

        case LOGIN:
            return {
                 ...state, 
                 fetching:true
                }
                
        case LOGIN_SUCCESS:
            return {
                ...state, 
                fetching:false,
                 loggedIn:true,
                ...action.payload
            }
        case LOGOUT:
            return{
                fetching:false,
                loggedIn:false
            }

            default:
                return state
    }
}


function saveStorage(storage){
    localStorage.setItem('usuario', JSON.stringify(storage))
}
// function saveStorage2(storage2){
//     localStorage.setItem('usuario2', JSON.stringify(storage2))
// }
// Actions

//Buscamos el uid de Google en nuestra base
export let buscaUidAction =(uid) =>async (dispatch,getState)=>{
    // console.log('estamos buscando:',uid);
    // console.log(uri);
    let datos,info,dni;
    try {
         await axios.get(uri + `consultar-alumnos/${uid}`)
        .then((response) => {
            datos= response.data
            info=datos.info
            dni=info.dni
            // console.log(datos);
        })

        if(datos.mensaje!=='no existe'){
            dispatch({type: USERSYTEM_BUSCA})
            
            dispatch({
                type: USERSYSTEM,
                payload:dni
            })

            //  saveStorage2(getState())


           console.log(getState());
    }else{
        console.log('el dato no existe');
    }
    }catch(error) {
        console.log(error);
      }
}

export let doLogoutAction =() =>(dispatch)=>{
    
    dispatch({type: LOGOUT})
    logoutGoogle()
}

export let yaLogueadoAction=(dni,uid, displayName, photo, email)=>(dispatch, getState)=>{
// console.log(getState());
    // saveStorage(getState())
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {
            dni:dni,
            uid: uid,
            displayName: displayName,
            photo: photo,
            email: email,
        }
    })
    // localStorage.clear()
    // saveStorage2(getState())
    // console.log('el estado es: ',getState());
}

export let doGoogleLoginAction=()=>async (dispatch, getState)=>{

        dispatch({
            type: LOGIN
        })
        
    return await loginWithGoogle()
        .then( user =>{
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
        .catch(e=>{
            console.log(e)
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
}