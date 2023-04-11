import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updatePost, deletePost } from "../slices/posts";
import PostDataService from "../services/PostService";

const Post = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentPost, setCurrentPost] = useState(initialState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getPost = (id) => {
    PostDataService.getPost(id)
      .then((response) => {
        setCurrentPost(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getPost(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentPost.id,
      title: currentPost.title,
      description: currentPost.description,
      published: status,
    };

    dispatch(updatePost({ id: currentPost.id, data }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setCurrentPost({ ...currentPost, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updatePost({ id: currentPost.id, data: currentPost }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setMessage("The Post was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removePost = () => {
    dispatch(deletePost({ id: currentPost.id }))
      .unwrap()
      .then(() => {
        navigate("/Posts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPost ? (
        <div className='edit-form'>
          <h4>Post</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={currentPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={currentPost.description}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>
                <strong>Status:</strong>
              </label>
              {currentPost.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentPost.published ? (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(false)}>
              UnPublish
            </button>
          ) : (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updateStatus(true)}>
              Publish
            </button>
          )}

          <button className='badge badge-danger mr-2' onClick={removePost}>
            Delete
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateContent}>
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Post...</p>
        </div>
      )}
    </div>
  );
};

export default Post;
