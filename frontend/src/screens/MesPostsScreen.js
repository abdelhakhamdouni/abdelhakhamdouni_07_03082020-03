import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Post from '../components/Post'
import { getAllPostsWithId } from '../models/postHandler'

function MesPostsScreen(props) {

    let userId = props.state.user.id
    const [posts, setposts] = useState([])

    useEffect(() => {
        getAllPostsWithId(null, props.state.user.id).then(posts=>{
            props.setPostsData(posts.data)
            console.log("MES POSTS:",posts.data)
        }).catch(err=> console.log(err))
    }, [])

    return (
        <section className="home">
            {
                !props.state.posts ? null :  !props.state.posts.length > 0 ? 
                <div className="alert alert-success mt-5">Vous n'avez aucune publications pour l'instant !</div>  :
                    props.state.posts.map((post, i) => {
                        return (<Post
                            key={post.id}
                            post={post}
                        />)
                    })
            }
        </section>
    )
}

const mapStateToProps = state => ({state: state})
const mapDispatchToProps = dispatch => {
    return {
        setPostsData: posts => dispatch({
            type: "UPLOAD_POSTS_FROM_API",
            payload: {
                posts: posts,
            }
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MesPostsScreen);