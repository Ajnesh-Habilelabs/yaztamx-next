import apiMethod from '../../redux/apiMethod';

export const testimonialList = () => {
  return apiMethod.get('testimonials');
};

export const uploadDocuments = (data, id) => {
  return apiMethod.post(`users/upload/${id}/`, data);
};

export const profileDetail = (id) => {
  return apiMethod.get('provider-profiles/', id);
};

export const profileUpdate = (data, id) => {
  return apiMethod.put(`provider-profiles/${id}`, data);
};

export const servicesList = () => {
  return apiMethod.get('services');
};

export const getFaq = (role, locale) => {
  return apiMethod.get(`faq?role=${role}&locale=${locale}`);
};

export const getContent = (key, role, locale) => {
  return apiMethod.get(`menu-content/${key}?role=${role}&locale=${locale}`);
};

export const generalFeedback = (data) => {
  return apiMethod.post(`feedbacks`, data);
};

export const fetchChatUserList = () => {
  return apiMethod.get(`chat-list`);
};

export const fetchChatRoom = (roomId) => {
  return apiMethod.get(`chat/?room=${roomId}`);
};

export const contactUs = (data) => {
  return apiMethod.post(`contacts`, data);
};

export const fetchFeedbackList = () => {
  return apiMethod.get(`feedback-star-ratings-list`);
};

export const giveUserFeedback = (data) => {
  return apiMethod.post(`feedback-star-ratings`, data);
};

export const fetchNotifications = () => {
  return apiMethod.get(`push-notifications-offers-jobs-list`);
};

export const fetchNotificationCounter = () => {
  return apiMethod.get(`push-notifications-offers-jobs-unread-counter`);
};

export const updateIsReadNotifications = (notificationId) => {
  const payload = {
    "isRead": true
  }
  return apiMethod.post(`push-notifications-update/${notificationId}`, payload);
};
