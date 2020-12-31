import React, { useEffect, useState } from "react";
import PostBanner from "./PostBanner";
import { getLastsPosts } from "../models/postHandler";
import { connect } from "react-redux";

function BannerPosts(props) {
  const [posts, setposts] = useState(null);

  useEffect(() => {
    getLastsPosts().then((posts) => {
      console.log(posts);
      props.setLastsPostsData(posts.data);
      setposts(posts.data);
    });
  }, [props.state.screen]);

  return (
    <section className="bannerPosts">
      <h2>Les derniers articles </h2>
      <section className="posts">
        {!posts
          ? null
          : posts.map((post, i) => {
              return <PostBanner key={post.id} post={post} />;
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
          lastposts: posts,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerPosts);
