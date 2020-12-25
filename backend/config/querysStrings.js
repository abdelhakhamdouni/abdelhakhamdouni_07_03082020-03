module.exports = {
    //strings for user handler querys
    createUser: "INSERT INTO users (firstName, lastName, email, password,roles, avatar,createdAt) VALUE(?,?,?,?,?,?,now())",
    findUser: "SELECT * FROM users WHERE email = ?",
    findUserByPseudo : "SELET * FROM users WHERE pseudo = ?",
    findUserById: "SELECT * FROM users WHERE id = ?",
    deleteUser: "DELETE FROM users WHERE id = ?",
    
    //strings for post querys
    createPost: "INSERT INTO posts(title, image, description, type, UserId, createdAt,userPseudo) VALUE(?,?,?,?,?,now(),?)",
    getPosts : "SELECT * FROM posts ORDER BY updatedAt DESC",
    getAllPostsByUserId: "SELECT * FROM posts WHERE UserId = ?",
    getPostById : "SELECT * FROM posts WHERE iD = ?",
    updatePostLikes: "UPDATE posts SET likes = ?,updatedAt = now() WHERE id = ?",
    updatePostComments : "UPDATE posts SET comments = ?,updatedAt = now() WHERE id = ?",
    deletePostById: "DELETE FROM posts WHERE id = ?",

    //strigns for comments querys
    createComment: "INSERT INTO comments(content, createdAt,updatedAt, UserId, PostId, CommentId) VALUE(?,now(),now(),?,?,?)",
    deleteComment: "DELETE FROM comments WHERE UserId = ? OR PostId = ?",
    getCommentById : "SELECT * FROM comments WHERE id = ?",
    getCommentsById : "SELECT * FROM comments WHERE id = ? OR CommentId = ?",
    getCommentsByPostId : "SELECT * FROM comments WHERE PostId = ? ORDER BY CommentId",
    getCommentsById : "SELECT * FROM comments WHERE id = ? OR CommentId = ?",
    addIdtoComment: "UPDATE comments SET CommentId = ? WHERE id = ?",
    deleteCommentsByPostId: "DELETE FROM comments WHERE PostId = ?",
    deleteCommentsById: "DELETE FROM comments WHERE id = ?",

    //strigns for likes querys
    createLike: "INSERT INTO likes(createdAt,updatedAt, UserId, PostId) VALUE(now(),now(),?,?)",
    deleteLike: "DELETE FROM likes WHERE UserId = ? AND PostId = ?",
    getLikesByPostId : "SELECT * FROM likes WHERE PostId = ?",
    deleteLikesByPostId: "DELETE FROM likes WHERE PostId = ?",

}
