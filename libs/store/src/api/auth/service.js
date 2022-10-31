import apiMethod from '../../redux/apiMethod';

export const userLogin = ({ identifier, password }) => {
  return apiMethod.post(
    'users-permissions/auth/local',
    { identifier, password },
    { Accept: 'application/json' },
    { token: 'fghjkdsgchkhdefehadwjefshgyseuhfbshdv' }
  );
  // return fetch('https://vast.be.habilelabs.com/auth/local', {
  //   method: 'POST',
  //   body: {
  //     identifier,
  //     password,
  //   },
  // });
};

export const verifyEmailOTP = (data) => {
  return apiMethod.post(
    'users-permissions/auth/confirm-account-otp-verify',
    data
  );
  // data = {
  //     "email": "test@test.com",
  //     "confirmationToken": "3056"
  // }
};

export const userRegistration = ({
  email,
  password,
  name,
  phoneNo,
  userRole,
}) => {
  return apiMethod.post('auth/local/register', {
    email,
    password,
    name,
    phoneNo,
    userRole,
  });
};

export const forgotPassword = ({ email }) => {
  return apiMethod.post('users-permissions/auth/forgot-password', { email });
};

export const resetPassword = (data) => {
  return apiMethod.post('users-permissions/auth/reset-password', data);
  // /users-permissions/auth/reset-password
};

export const resetPasswordFromProfile = (data) => {
  return apiMethod.post('users-permissions/auth/change-password', data);
  // /users-permissions/auth/change-password
};

export const userOtpVerification = ({ phoneNo, otp }) => {
  return apiMethod.post('users-permissions/auth/verify-otp', { phoneNo, otp });
};

export const googleLogin = (data) => {
  return apiMethod.post('auth/google/register', data);
};

export const facebookLogin = (data) => {
  return apiMethod.post('auth/facebook/register', data);
};

export const updateProfile = (id, data) => {
  return apiMethod.put(`users/update/${id}`, data, {
    'Content-Type': 'multipart/form-data',
  });
};

export const addSubscribers = (data) => {
  return apiMethod.post('subscribers', data);
};

export const addConcern = (data) => {
  return apiMethod.post('concerns', data);
};