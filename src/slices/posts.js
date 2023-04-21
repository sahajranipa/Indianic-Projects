import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = { postData: [] };

export const createPost = createAction("createPost");

export const retrievePosts = createAction("retrievePosts");

export const updatePost = createAction("updatePost");

export const deletePost = createAction("deletePost");

export const deleteAllPosts = createAction("deleteAllPosts");

export const findPostsByTitle = createAction("findPostsByTitle");

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrievePosts, (state, action) => {
      state.postData = action.payload;
    });
    builder.addCase(createPost, (state, action) => {
      state.postData.unshift(action.payload);
    });
    builder.addCase(updatePost, (state, action) => {
      state.postData = state.postData.filter((id) => id !== action.payload.id);
      state.postData.unshift(action.payload);
    });
    builder.addCase(deletePost, (state, action) => {
      state.postData = state.postData.filter((id) => id !== action.payload);
    });
    builder.addCase(findPostsByTitle, (state, action) => {
      state.postData = state.postData.filter(
        (post) => post.title === action.payload.title
      );
    });
  },
});
export const getAllPosts = (state) => state.post.postData;
export const getPostById = (id) => {
  return (state) => state.post.postData.filter((pid) => pid === id)[0];
};

export default postSlice.reducer;
