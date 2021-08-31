import { loginWithGoogle, logoutGoogle } from '../auth/firebase'

let initialData={
    loggedIn : false,
    fetching: false,
}

let LOGIN = 'LOGIN';
let LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let LOGIN_ERROR = 'LOGIN_ERROR';
let LOGOUT = 'LOGOUT';

//reducer
export default function reducer(state=initialData, action){
    switch (action.type){
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
// Actions

export let doLogoutAction =() =>(dispatch)=>{
    
    dispatch({type: LOGOUT})
    logoutGoogle()
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