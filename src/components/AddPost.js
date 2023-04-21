import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../slices/posts";

const AddPost = () => {
  const initialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [post, setPost] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const savePost = () => {
    const { title, description } = post;
    Promise.resolve(dispatch(createPost({ title, description }))).then(
      (data) => {
        setPost({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,
        });
        setSubmitted(true);
      }
    );
  };

  const newPost = () => {
    setPost(initialState);
    setSubmitted(false);
  };

  return (
    <div className='submit-form'>
      {submitted ? (
        <div>
          <h4>You've successfully submitted the post !</h4>
          <button className='btn btn-success' onClick={newPost}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='form-control'
              id='title'
              required
              value={post.title || ""}
              onChange={handleInputChange}
              name='title'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              className='form-control'
              id='description'
              required
              value={post.description || ""}
              onChange={handleInputChange}
              name='description'
            />
          </div>

          <button onClick={savePost} className='btn btn-success'>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPost;
