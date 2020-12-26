const bcrypt = require('bcrypt')
const db = require('../config/db')
const query = require('../config/query')
const querysStrings = require('../config/querysStrings')
const Post = require('../models/postModel')

module.exports = {

    getUserById: async (req, res)=>{
        const conn = await db;
        query(conn, querysStrings.findUserById, [[req.params.id]])
        .then(user=>{
            user[0].avatar = req.protocol + '://' + req.get('host') + user[0].avatar
            res.status(200)
            res.json(user[0])
        })
        .catch(err=> console.log(err))
    },

    signup : async (req, res)=>{
        const conn = await db
        let user = req.body.user
        let firstName = user.firstName
        let lastName = user.lastName
        let email = user.email
        let password = user.password
        let roles = 'ROLE_USER'
        let avatar = req.file.filename !== undefined ? `/images/avatars/${req.file.filename}` : null
        console.log("filename: ", req.file.filename)
        query(conn, querysStrings.createUser,[
            firstName, lastName, email, password, roles, avatar
        ]).then(user=>{
            if(user){
                user[0].avatar = req.protocol + '://' + req.get('host') + user[0].avatar
                res.status(201)
                res.json({message : "user created with success !"})
            }
        }).catch(err=> {
            console.log(err)
            res.status(500)
            res.json({err})
        })
                
    },
    signin: async (req, res, next)=>{
        let email =  req.body.email.toLowerCase()
        const conn = await db
        query(conn, querysStrings.findUser,[email])
        .then(user=>{
            if(user.length === 0){
                res.status(200)
                res.json({err: 'impossible de trouver cet utilisateur !'})
            }else{
                console.log(user)
                bcrypt.compare(req.body.password, user[0].password, (err, resultat)=>{
                    console.log(resultat)
                    if(!resultat){
                        res.status(403)
                        res.json({err:'impossible de trouver cet utilisateur !'})
                    }
                    else{
                        req.body.email = user[0].email
                        req.body.id = user[0].id
                        req.body.roles = user[0].roles
                        req.body.firstName = user[0].firstName
                        req.body.lastName = user[0].lastName
                        req.body.avatar = req.protocol + '://' + req.get('host') + user[0].avatar
                        next()
                    }
                })
            }
        })
        .catch(err=> {
            console.log(err)
            res.status(403)
            res.json({err:'impossible de trouver cet utilisateur !'})
        })
    },
    singinWithToken : async (req, res, next)=>{
        let email =  req.body.email.toLowerCase()
        const conn = await db
        query(conn, querysStrings.findUser,[email])
            .then((user)=>{
                req.body.email = user[0].email
                req.body.id = user[0].id
                req.body.roles = user[0].roles
                req.body.firstName = user[0].firstName
                req.body.lastName = user[0].lastName
                req.body.avatar = req.protocol + '://' + req.get('host') + user[0].avatar
                next()
            }).catch(e => {
                res.status(400)
                res.json({error : "pool.getConnection impossible a la base de donnée" + e})
            }) 
    },

    delete: async (req, res, next)=>{
        let id = req.params.id
        const conn = await db
        query(conn, querysStrings.getAllPostsByUserId,[id])
        .then(posts=>{
           posts.forEach(post=>{
               query(query.deletePostById,[post.id]).catch(err=> console.log(err))
           })
        }).catch(err=> console.log("103", err))
        query(conn, querysStrings.getAllCommentsByUserId,[id])
        .then(comments=>{
           comments.forEach(comment=>{
               query(query.deleteCommentsById,[comment.id]).catch(err=> console.log(err))
           })
        }).catch(err=> console.log("109", err))
        query(conn, querysStrings.getAllLikesByUserId,[id])
        .then(likes=>{
           likes.forEach(like=>{
               query(query.deleteLikeByUserId,[like.id]).catch(err=> console.log(err))
           })
        
        }).catch(err=> console.log("126", err))
        query(conn, querysStrings.deleteUser,[id])
        .then((user)=>{
            query(query.deleteUserById,[id]).then(()=>{
                res.status(200)
                res.json({message: "Utilisateur Supprimé avec succés"});
            }).catch(err=> console.log(err))
        })
        .catch(err=> console.log("123", err))
    },


    checkPseudo: (req, res)=>{
        let pseudo = req.body.pseudo
        db.query(querysStrings.findUserByPseudo, [pseudo])
        .then(user=>{
            if(user){
                res.status(200)
                res.json({failed:"existe"})
            }else{
                res.status(200)
                res.json({success:"valide"})
            }
        })
    },

    getAllUsers: async (req, res)=>{
        let conn = await db;
        query(conn,querysStrings.findAllUsers)
        .then(users=>{
            users.forEach((user) => {
                user.avatar = req.protocol + '://' + req.get('host') + user.avatar
            });
                res.status(200)
                res.json({users})
           
        })
    }
}