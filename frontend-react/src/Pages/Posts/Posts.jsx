import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import FETCH_POSTS from "../../Apollo/fetchPosts";
import PostItem from "../../Components/PostItem";
import { useState } from "react";
import PostForm from "../../Components/PostForm";

function PostsPage() {
  const { data, loading, error, refetch } = useQuery(FETCH_POSTS);
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const closeForm = () => {
    setToggle(false);
    refetch();
  };

  return (
    <div className="container">
      {token && (
        <div className="row mb-4">
          <div className="col-4">
            <div className="d-grid">
              <button
                className="btn btn-primary"
                onClick={() => setToggle(true)}
              >
                Create
              </button>
            </div>
          </div>
          <div className="col-4 offset-4">
            <div className="d-grid">
              <button className="btn btn-secondary" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {toggle && <PostForm closeForm={closeForm} />}
      {loading && <h1>Loading...</h1>}
      {error && <h2>Something went wrong</h2>}
      <div className="row">
        {data &&
          data.posts &&
          data.posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default PostsPage;
