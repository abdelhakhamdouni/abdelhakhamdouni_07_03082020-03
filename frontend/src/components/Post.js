import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import 'moment/locale/fr'
import logo from '../assets/images/avatar/avatar.png'
import PostSetting from './PostSetting';
import AddComment from './AddComment';
import { getAllLikesById, likeAPost } from '../models/postHandler';
import { connect } from 'react-redux';

function Post(props) {

    const [showSetting, setshowSetting] = useState(false)
    const [commentshow, setcommentshow] = useState(false)
    const [likes, setlikes] = useState(props.post.likes)
    const [liked, setliked] = useState(false)
    const post = props.post

    function likePost(event) {
        event.preventDefault()
        let data = {
            userId: props.user.id,
        }
        let tolike = liked ? 0 : 1 
        likeAPost(null, post.id, tolike, data).then((res)=>{
            if(res.data.res === 'add'){
                setliked(true)
                setlikes( post.likes++)
            } 
            if(res.data.res === "remove"){
                setliked(false)
                setlikes( post.likes--)
            }
        }).catch(err=> console.log(err))
    }

    // get likes from likepost table

    useEffect(() => {
        getAllLikesById(null, post.id).then(likes=>{
            likes.data.likes.forEach(like => {
                if(like.UserId === props.user.id){
                    setliked(true)
                }
            });
            setlikes(likes.data.likes.length)
        })
    })

    //recuperer 'id de l'utilisateur depuis les props ou le la memoire
    let authorRoles = props.user.roles

    // verifier si on est l'auteur du poste ou un admin 
    const author = props.user.id === post.UserId
        || authorRoles.indexOf('ROLE_ADMIN')

    const setShow = () => setcommentshow(!commentshow)
    // formater la date et heure en locale français
    moment.locale('fr')

    return (
        <article className={!props.single ? "post" : "post post-single"} data-id={post.id} >
            {
                !props.single ? null :
                    <div className="post-close" onClick={props.close}>Fermer <span className="fa fa-close fa-2x"></span></div>
            }
            <div className="post_header">
                <h2 className="post_footer-author"><img src={logo} alt="avatar" width="30" />{post.userPseudo}</h2>
                {/* <h3>{props.post.title}</h3> */}
                {
                    author !== -1 && <span className="fa fa-edit" onClick={() => setshowSetting(!showSetting)}></span>
                }
            </div>
            <Link className="post_image" to={"/post/" + post.id}>
                {post.type === "video" ? 
                <video poster="/bin/092020/poster-small-child-gets-caught-taking-selfie.gif" 
                    preload="auto" autoPlay="autoplay" muted="muted" loop="loop" id="gif">
                    <source src={post.image} />
            </video>
                :
                <img className="freezeframe" src={post.image} alt="gif" /> 
                }
            </Link>
            <Link to={"/post/" + post.id} className={post.description ? "post_description" : "post_description vide"} >
                    {post.description}
            </Link>
            <div className="post_footer">
                <span className="date">{moment(props.post.createdAt).fromNow()}</span>
                <span><span className={liked ? "fa fa-heart" : "far fa-heart"} onClick={likePost}></span> {likes}</span>
                <span onClick={setShow}><span className="fa fa-comment-alt">
                </span> {post.comments || 0}
                </span>
            </div>
            <AddComment show={commentshow} showcommenthandler={setShow} postId={post.id} userId={props.user.userId} />
            {/* une sorte de modale pour afficher le boutton de supprition du poste */}
            <PostSetting id={props.post.id} show={showSetting} />
        </article>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    state: state
})





export default connect(mapStateToProps)(Post);