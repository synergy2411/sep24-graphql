import { useRef } from "react";
import { useMutation } from "@apollo/client";
import CREATE_POST from "../Apollo/createPost";
import { useNavigate } from "react-router-dom";

function PostForm({ closeForm }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const [onCreatePost] = useMutation(CREATE_POST);
  const navigate = useNavigate();

  const createClickHandler = async (e) => {
    e.preventDefault();
    await onCreatePost({
      variables: {
        title: titleRef.current.value,
        body: bodyRef.current.value,
      },
    });
    closeForm();
    navigate("/posts");
  };

  return (
    <div className="backdrop">
      <div className="my-model">
        <h1 className="text-center">Add Post</h1>
        <form>
          {/* title */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder=""
              ref={titleRef}
            />
            <label htmlFor="title">Title:</label>
          </div>

          {/* body */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="body"
              id="body"
              placeholder=""
              ref={bodyRef}
            />
            <label htmlFor="body">Body:</label>
          </div>

          {/* button */}

          <div className="text-center">
            <button className="btn btn-primary" onClick={createClickHandler}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
