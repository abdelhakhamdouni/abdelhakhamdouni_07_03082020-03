const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const { Op } = require('sequelize')

const Post = require('../models/postModel')
const db = require('../config/db')
const query = require('../config/query')
const querysStrings = require('../config/querysStrings')

module.exports = {

    //get all posts
    getAllPosts : async (req, res, next )=>{
        const conn = await db
        query(conn, querysStrings.getPosts)
        .then(posts=>{
                posts.forEach((post) => {
                    post.image = req.protocol + '://' + req.get('host') + post.image
                });
                res.status(200)
                res.json(posts)
        })
        .catch(err=>{ 
            console.log(err)
            res.status(500)
            res.json({err})
        })
    },

    //get all posts by user id
    getAllPostsById : async (req, res, next )=>{
        const conn = await db
        query(conn, querysStrings.getAllPostsByUserId, [req.params.id])
        .then(posts=>{
            posts.forEach((post) => {
                posts[posts.indexOf(post)] = {...post, 'image' :req.protocol + '://' + req.get('host') + post.image}
            });
            res.status(200)
            res.json(posts)
        })
        .catch(err=>{ 
            console.log(err)
            res.status(500)
            res.json({err})
        })
    },
    
    //get lasts 10 posts
    getLastsPosts: async (req, res, next)=>{
        const conn = await db
        query(conn, querysStrings.getLastsPostsByUserId)
        .then(posts=>{
            posts.forEach((post) => {
                posts[posts.indexOf(post)] = {...post, 'image' :req.protocol + '://' + req.get('host') + post.image}
            });
            res.status(200)
            res.json(posts)
        })
        .catch(err=>{ 
            console.log(err)
            res.status(500)
            res.json({err})
        })
    },

    //get one post by id
    getPostById : async (req, res, next )=>{
        let conn = await db;
        query(conn, querysStrings.getPostById,[req.params.id])
        .then(post=>{
            post[0].image = req.protocol + '://' + req.get('host') + post[0].image
            res.status(200)
            res.json(post[0])
        })
        .catch(err=>{ 
            console.log(err)
            res.status(500)
            res.json({err})
        })
    },
    
    //add poste to server and bdd
    addPost : async (req, res, next)=>{
        req.body.post = JSON.parse(req.body.post)
        console.log("body after multer:", req.body)
        let fileName = `/images/${req.file.filename}`
        const conn = await db
        query(conn, querysStrings.createPost,[
           req.body.post.title || null,
           fileName,
           req.body.post.description || null,
           "media",
           req.body.post.authorId,
           req.body.post.pseudo
        ])
        .then((post)=>{
                res.status(201)
                res.json({message: "post add with success"})
            })
        .catch(e => {
            res.status(500)
            res.json({error : "connexion impossible a la base de donnée" + e})
        }) 

    },

    /**
     * delete one poste by id
     * + delete commentaire 
     * + delete images 
     * + delete likes 
     */
    deletePost: async (req, res, next)=>{
        let id = req.params.id
        const conn = await db
        try{
            let deletecomments = await query(conn, querysStrings.deleteCommentsByPostId,[id])
            let deletelikes = await query(conn, querysStrings.deleteLikesByPostId,[id])
            let post = await query(conn, querysStrings.getPostById,[id])
            unlinkAsync(path.join('../backend/', post[0].image)) //suprimer l'image puis poste du serveur 
            query(conn, querysStrings.deletePostById,[id]).then(()=>{
                res.status(200)
                res.json({message: "post supprimé !"})
            })
        }
        catch(err){
            console.log(err)
            res.status(500)
            res.json({err: "impossible de recuperer ce poste"})
        }
    },

    //liker un poste
    likePost: async (req, res, next)=>{
        let post_id = req.params.id
        let liked = req.params.like
        let user_id = req.body.userId
        let conn = await db;
        switch(liked){
            case "1":
                query(conn, querysStrings.createLike,
                [
                    user_id,
                    post_id
                ])
                query(conn, querysStrings.getPostById,[post_id])
                .then(post=>{
                    query(conn, querysStrings.updatePostLikes, [post[0].likes +1,post_id ])
                    .then(()=>{
                        res.status(200)
                        res.json({res: "add"})
                    })
                })
                .catch(err=>{
                    res.status(500)
                    res.json({err})
                })
            break
            case "0":
                query(conn, querysStrings.deleteLike,[user_id, post_id])
                query(conn, querysStrings.getPostById,[post_id])
                .then(post=>{
                    query(conn, querysStrings.updatePostLikes, [post[0].likes -1, post_id ])
                    .then(()=>{
                        res.status(200)
                        res.json({res: "remove"})
                    })
                })
                .catch(err=>{
                    res.status(500)
                    res.json({err})
                })
            break
        }
    },

    //getAll likes by post
    getAllLikesByPostId : async (req, res, next)=>{
        let conn = await db
        query(conn, querysStrings.getLikesByPostId, [req.params.id])
        .then(likes=>{
            res.status(200)
            res.json({likes: likes})
        })
        .catch(err=> console.log(err))
    }
}
