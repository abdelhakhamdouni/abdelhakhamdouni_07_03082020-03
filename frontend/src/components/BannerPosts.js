import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getLastsPosts } from "../models/postHandler";
import { connect } from "react-redux";

function BannerPosts(props) {
  const [posts, setposts] = useState(props.posts);
  
  useEffect(() => {
    getLastsPosts().then((posts) => {
      props.setLastsPostsData(posts.data);
    });
  }, [props.state.screen]);


  return (
    <section className="bannerPosts">
      <h2>Les derniers articles </h2>
      <section className="posts">
        {!props.state.lastposts
          ? null
          : props.state.lastposts.map((post, i) => {
              return <Post key={post.id} post={post} />;
            })}
      </section>
    </section>
  );
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    setLastsPostsData: (posts) =>
      dispatch({
        type: "UPLOAD_LASTS_POSTS_FROM_API",
        payload: {
          posts: posts,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerPosts);
