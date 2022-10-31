import apiMethod from '../../redux/apiMethod';

export const providerDetail = (id) => {
  return apiMethod.get(`/users/${id}`);
};

export const findBestProvider = (data) => {
  return apiMethod.get(`/users?userRole=PROVIDER&${data}`);
};

export const createNewOffer = (data) => {
  return apiMethod.post(`/job-offers`, data);
};

export const fetchFavoriteProvider = () => {
  return apiMethod.get(`/favourite-users-list`);
};

export const addFavorite = (data) => {
  return apiMethod.post(`favourite-users/`, data);
};

export const getCouponCode = (userId) => {
  return apiMethod.post(`coupons?userId=${userId}`);
};

export const getBlockedClient = () => {
  return apiMethod.get(`blocked-users-list`);
};

export const getBlockedProvider = () => {
  return apiMethod.get(`blocked-users-list`);
};

export const blockedClient = (data) => {
  return apiMethod.post(`blocked-users-update`, data);
};

export const blockedProvider = (data) => {
  return apiMethod.post(`blocked-users-update`, data);
};

export const fetchUpcomingBookings = (data) => {
  return apiMethod.get(
    `/job-offers?userId=${data.id}&userRole=CUSTOMER&jobStatus=${data.jobStatus}`
  );
};

// export const fetchPastBookings = (data) => {
//   return apiMethod.get(
//     `/job-offers?userId=${data.id}&userRole=CUSTOMER&jobStatus=${data.jobStatus}`
//   );
// };
export const fetchPastBookings = () => {
  return apiMethod.get(`/past-jobs-mobile`)
}

export const fetchPendingBookings = (data) => {
  return apiMethod.get(
    `/job-offers?userId=${data.id}&userRole=CUSTOMER&jobStatus=${data.jobStatus}`
  );
};

export const fetchCancelledBookings = (data) => {
  console.log('fetchCancelledBookings', data);
  return apiMethod.get(
    `/job-offers?userId=${data.id}&userRole=CUSTOMER&jobStatus=${data.jobStatus}`
  );
};

export const publishSearchToForum = (searchId) => {
  const payload = {
    publishToForum: true,
  };
  return apiMethod.post(
    `/search-publish/${searchId}`,
    payload
  );
};

export const declineOrTerminateOffer = (jobOfferId, payload) => {
  return apiMethod.put(
    `/job-offers/${jobOfferId}`,
    payload
  )
}
