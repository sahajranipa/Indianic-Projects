import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostDataService from "../services/PostService";

const initialState = { postData: [] };

export const createPost = createAsyncThunk(
  "/posts",
  async ({ title, description }) => {
    const res = await PostDataService.createPost({
      title,
      description,
    });
    return res.data;
  }
);

export const retrievePosts = createAsyncThunk("posts/retrieve", async () => {
  const res = await PostDataService.getAllPosts();
  return res.data;
});

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }) => {
    const res = await PostDataService.updatePost(id, data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk("posts/delete", async ({ id }) => {
  await PostDataService.removePost(id);
  return { id };
});

export const deleteAllPosts = createAsyncThunk("posts/deleteAll", async () => {
  const res = await PostDataService.removeAllPosts();
  return res.data;
});

export const findPostsByTitle = createAsyncThunk(
  "posts/findByTitle",
  async ({ title }) => {
    const res = await PostDataService.findByTitle(title);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrievePosts.fulfilled, (state, action) => {
      state.postData = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.postData.unshift(action.payload);
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.postData = state.postData.filter((id) => id !== action.payload.id);
      state.postData.unshift(action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.postData = state.postData.filter((id) => id !== action.payload);
    });
    builder.addCase(findPostsByTitle.fulfilled, (state, action) => {
      state.postData = [...action.payload];
    });
  },
});
export const getAllPosts = (state) => state.post.postData;
export const getPostById = (id) => {
  return (state) => state.post.postData.filter((pid) => pid === id)[0];
};
export default postSlice.reducer;
