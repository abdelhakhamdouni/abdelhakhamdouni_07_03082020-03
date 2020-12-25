import React, { useState } from 'react'
import { connect } from 'react-redux';
import logo from '../assets/images/logos/icon-left-font-monochrome-black.svg';
import { logUser } from '../models/userHandler'


function LogScreen(props) {

    const [disabled, setdisabled] = useState(false)
    const [error, seterror] = useState(null)
    const [passwordclear, setpasswordclear] = useState(false)
    const [credentiels, setcredentiels] = useState({
        email: null,
        password: null,
    })

    /**
     * login the user and set update state with the user data
     */
    function login(event) {
        event.preventDefault()
        props.toggleLoading(true)
        logUser(credentiels)
        .then(data =>{
            console.log(data)
            if(data.data.err){
                seterror('Votre email ou mot de passe est incorrect !')
            }else{
                localStorage.setItem('token', data.data.token)
                props.setUserData(data.data.user)
                props.setLoggin(true)
                props.toggleLoading(false)
            }

        })
        .catch(err=> console.log(err))
    }

    function changeCredentiels(e) {
        setcredentiels({ ...credentiels, [e.target.name]: e.target.value })
        if (credentiels.email != null && credentiels.password != null) {
            setdisabled(false)
        }
    }

    return (
        <section className="logscreen">
            <div className="logo">
                <img className="img-fluid" src={logo} alt="groupomania" />
            </div>
            <p className="small">Connetez-vous pour pouvoir poster des medias, liker et commenter les postes de vos colègues.</p>
            <form onSubmit={login}>
                {!error ? null : <div className="alert alert-warning">
                    {error}
                </div>}
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input onChange={changeCredentiels} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <input onChange={changeCredentiels} name="password" type="password" className="form-control" id="password"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Garder ma session</label>
                </div>
                <button type="submit" className="p-2">Se connecter</button>
            </form>
            <div className="helpers d-flex flex-column">
                <button className="mt-5">Mot de passe oublié</button>
                <button className="mt-1" onClick={()=>props.goToRegister(true)}> Créer un compte</button>
            </div>
        </section>
    )

}

const mapStateToProps = (state) => ({
    state: state,
})

const mapDispatchToProps = dispatch => {
    return {
        setUserData: data => dispatch({
            type: "LOGIN_USER",
            payload: {
                user: data,
            }
        }),
        setLoggin : ()=>dispatch({
          type: 'SET_LOGGIN',
          payload : {
            loggin: true
          }
        }),
        goToRegister : (bol)=>dispatch({
            type: 'GOTO_REGISTER',
            payload: {
                showRegister: bol
            }
        }),
        toggleLoading: (bool) => dispatch({
            type: 'TOGGLE_LOADING',
            payload: {
                loading: false
            }
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogScreen);