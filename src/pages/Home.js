import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { doLogoutAction } from '../redux/userDuck';


// function saveStorage(storage){
//     localStorage.setItem('dni', JSON.stringify(storage))
// }
export const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const { photo, dni, email, uid, displayName } = useSelector(store => store.authGoogle);
    // saveStorage(dni)
// console.log(photo);
    
    const handleReturn = () => {
        dispatch(doLogoutAction())
        history.push('/login')
    }

    return (
        <>
            <h2>USUARIO LOGUEADO</h2>
            Hola! {displayName} <br/> 
            <img alt='Profile' src={photo} />
            DNI: {dni} <br/>
            email: {email} <br/>
            uid: {uid}

             <button
                        style={{ justifyContent: 'center', marginLeft: 15, marginTop: 0 }}
                        className="btn btn-danger btn-block mr-auto"

                        type="submit"
                        onClick={handleReturn}
                    >SALIR</button>
        </>
    )
}
