import http from "../http-common";

const getAllPosts = () => {
  return http.get("/posts");
};

const getPost = (id) => {
  return http.get(`/posts/${id}`);
};

const createPost = (data) => {
  return http.post("/posts", data);
};

const updatePost = (id, data) => {
  return http.put(`/posts/${id}`, data);
};

const removePost = (id) => {
  return http.delete(`/posts/${id}`);
};

const removeAllPosts = () => {
  return http.delete(`/posts`);
};

const findByTitle = (title) => {
  return http.get(`/posts?title=${title}`);
};

const PostService = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  removePost,
  removeAllPosts,
  findByTitle,
};

export default PostService;
