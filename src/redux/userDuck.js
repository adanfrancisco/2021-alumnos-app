import { loginWithGoogle } from '../auth/firebase'

let initialData={
    loggedIn : false,
    fetching: false,
}

let LOGIN = 'LOGIN'
let LOGIN_SUCCESS = 'LOGIN_SUCCESS'
let LOGIN_ERROR = 'LOGIN_ERROR'

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
                ...action.payload
            }
            default:
                return state
    }
}

//Action
export let doGoogleLoginAction=()=>(dispatch, getState)=>{
    return loginWithGoogle()
        .then( user =>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {...user}
            })
        })
        .catch(e=>{
            console.log(e)
            dispatch({
                type: LOGIN_ERROR,
                payload: e.message
            })
        })
}