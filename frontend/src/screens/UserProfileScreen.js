import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllPostsWithId } from '../models/postHandler'
import { deleteUser } from '../models/userHandler'

function ProfileScreen(props) {

    const [postsCount, setpostsCount] = useState(0)
    let {id} = useParams();
    const [user, setuser] = useState(props.state.users[id])

    function deleteProfile(){
        let confirmation = window.confirm('Êtes-vous sur de vouloir supprimer votre compte ?')
        if(confirmation){
            deleteUser(user.id).then(res=>{
                if(res.status === 200){
                    localStorage.clear()
                    window.location.href = "/"
                }
            })
        }
    }

    useEffect(() => {
        setuser(props.state.users[id])
        getAllPostsWithId(null, user.id).then(posts=>{
            setpostsCount(posts.data.length)
        }).catch(err=> console.log(err))
    },[id])

    console.log(props.state.user.id == user.id)

    return (
        !user ? null :
        <section className="profile">
            <div className="profile-header">
                <img src={user.avatar} alt="avatar" />
                <span>Email: <strong>{user.email}</strong></span>
                <span>Nom prénom: <strong>{user.firstName}, {user.lastName}</strong></span>
                <span>Roles: <strong>{user.roles}</strong></span>
                <span>Mes publication : <strong>{postsCount}</strong></span>
            </div>   
            <div className="profile-action">
                { props.state.user.roles.includes('ROLE_ADMIN') || props.state.user.id === user.id ? 
                <button className="delete" onClick={deleteProfile}> Suprimer le compte : <span className="fa fa-trash"></span></button>
                :null
            }
            </div>   
             <div className="profile-body"></div>   
            
        </section>
    )
}

const mapStateToProps = state => ({state: state})

export default connect(mapStateToProps)(ProfileScreen);