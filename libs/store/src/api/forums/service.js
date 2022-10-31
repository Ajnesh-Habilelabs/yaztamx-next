import apiMethod from '../../redux/apiMethod';

// Completed
export const forumCategories = () => {
  return apiMethod.get(`/forum-categories`);
};
// Not used
export const getPost = (postId) => {
  return apiMethod.get(`/forum-posts/${postId}`)
}
// Not used
export const getComment = (commentId) => {
  return apiMethod.get(`/forum-comments/${commentId}`)
}

// Completed
export const getPostList = (categoryId, limitPerPage, pageNumber) => {
  return apiMethod.get(`/forum-posts-list/${categoryId}?limit=${limitPerPage}&page=${pageNumber}`)
}

export const getUserProfile = (userId) => {
  return apiMethod.get(`/forum-user-profile/${userId}`)
}

// Completed
export const getPostWithComments = (postId, limitPerPage, pageNumber) => {
  return apiMethod.get(`/forum-post-comments-list/${postId}?limit=${limitPerPage}&page=${pageNumber}`)
}

// ******ALL POST APIs******

// Completed
export const likeAPost = (data) => {
  return apiMethod.post(`/forum-post-likes`, data); 
  // data = {
  //   "postId": 1,
  //   "isLike": true
  // }
};

// Completed
export const checkLiked = (data) => {
  return apiMethod.post(`/post-like`, data);
    // data = {
    //  "postId": 14
    // }
};

// Completed
export const createComment = (data) => {
  return apiMethod.post(`/forum-comments`, data);
  // data = {
  //   "postId": 1,
  //   "comment": "Cleaning and Cooking Provider"
  // }
};

// Completed
export const createPost = (data) => {
  return apiMethod.post(`/forum-posts`, data);
  // data = {
  //   "categoryId": 1,
  //   "postSubject": "Looking for a Provider",
  //   "postBody": "I am looking for Cleaning and Cooking Provider for Morning"
  // }
}

// ******ALL PUT APIs******

export const updatePost = (postId, data) => {
  return apiMethod.put(`/forum-posts/${postId}`, data);
  // data = {
  //   "postSubject": "new subject",
  //   "postBody": "new body"
  // }
}

export const updateComment = (commentId, data) => {
  return apiMethod.put(`/forum-comments/${commentId}`, data);
  // data = {
  //   "comment": "Cleaning and Cooking Provider..."
  // }
}

// export const updateComment = (commentId, data) => {
//   return apiMethod.put(`/forum-comments/${commentId}`, data);
//   // data = {
//   //   "comment": "Cleaning and Cooking Provider..."
//   // }
// }


// ******ALL DELETE APIs******

export const deletePost = (postId) => {
  return apiMethod.del(`/forum-posts/${postId}`);
}

export const deleteComment = (commentId) => {
  return apiMethod.del(`/forum-comments/${commentId}`);
}