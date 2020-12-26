import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPosts } from "../models/postHandler";
import { connect } from "react-redux";
import BannerPosts from "../components/BannerPosts";
import UsersList from "../components/UsersList";

function HomeScreen(props) {
  const [posts, setposts] = useState(props.posts);

  useEffect(() => {
    getAllPosts().then((posts) => {
      props.setPostsData(posts.data);
    });
  }, [props.state.screen]);

  return (
    <section className="home">

      {!props.state.posts
        ? null
        : props.state.posts.map((post, i) => {
            return <Post key={post.id} post={post} />;
          })}
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    setPostsData: (posts) =>
      dispatch({
        type: "UPLOAD_POSTS_FROM_API",
        payload: {
          posts: posts,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
