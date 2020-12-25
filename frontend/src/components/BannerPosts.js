import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getLastsPosts } from "../models/postHandler";
import { connect } from "react-redux";

function BannerPosts(props) {
  const [posts, setposts] = useState(props.posts);

  useEffect(() => {
    getLastsPosts().then((posts) => {
      props.setPostsData(posts.data);
    });
  }, [props.state.screen]);

  return (
    <section className="bannerPosts">
      <h2>Les derniers articles </h2>
      <section className="posts">
        {!props.state.posts
          ? null
          : props.state.posts.map((post, i) => {
              return <Post key={post.id} post={post} />;
            })}
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerPosts);
