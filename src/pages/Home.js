import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { doLogoutAction } from '../redux/userDuck';


 function saveStorage(storage){
     localStorage.setItem('usuario', JSON.stringify(storage))
 }
export const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const estado = useSelector(store=>store.authGoogle)
    const { photo, dni, email, uid, displayName } = useSelector(store => store.authGoogle);
    //const stored = useSelector(store=>store.authGoogle)
    saveStorage(estado)
// console.log(photo);
    console.log( 'El DNI del store es:',dni)

    const handleReturn = () => {
        dispatch(doLogoutAction())
        history.push('/login')
    }

    return (
        <>
            <h2>USUARIO LOGUEADO</h2>
            <Header/>
            Hola! {displayName} <br/> 
            <img alt='Profile' className='rounded-circle' height='50' src={photo} />
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
