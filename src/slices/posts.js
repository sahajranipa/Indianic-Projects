import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostDataService from "../services/PostService";

const initialState = [];

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ userId, title, description }) => {
    const res = await PostDataService.createPost({
      userId,
      title,
      description,
    });
    return res.data;
  }
);
export const retrievePost = createAsyncThunk(
  "posts/retrievePost",
  async ({ id }) => {
    const res = await PostDataService.getPost({ id });
    return res.data;
  }
);
export const retrievePosts = createAsyncThunk(
  "posts/retrievePosts",
  async () => {
    const res = await PostDataService.getAllPosts();
    return res.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }) => {
    const res = await PostDataService.updatePost(id, data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ id }) => {
    await PostDataService.removePost(id);
    return { id };
  }
);

export const deleteAllPosts = createAsyncThunk(
  "posts/deleteAllPosts",
  async () => {
    const res = await PostDataService.removeAllPosts();
    return res.data;
  }
);

export const findPostsByTitle = createAsyncThunk(
  "posts/findByTitle",
  async ({ title }) => {
    const res = await PostDataService.findByTitle(title);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrievePost.fulfilled]: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload.id);
      return {
        ...state[index],
      };
    },
    [retrievePosts.fulfilled]: (state, action) => {
      return [...action.payload.posts];
    },
    [updatePost.fulfilled]: (state, action) => {
      const index = state.findIndex((post) => post.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deletePost.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllPosts.fulfilled]: (state, action) => {
      return [];
    },
    [findPostsByTitle.fulfilled]: (state, action) => {
      return [...action.payload.posts];
    },
  },
});

const { reducer } = postSlice;
export default reducer;
