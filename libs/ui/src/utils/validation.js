export function validateRequiredField(
  name,
  value,
  label,
  validationType = ['required']
) {
  let error = { field: name, message: '' };
  for (const key in validationType) {
    if (validationType[key] === 'required' && !value) {
      error.message = `${label} is required!`;
    }
  }
  return error;
}

export function checkErrorEntity(field, data, label) {
  validateRequiredField(field, data, label);
}

export function validateConfirmPass(
  confirmPassword,
  password,
  fieldName = '',
  label = ''
) {
  let error = { field: fieldName ? fieldName : 'confirmPassword', message: '' };
  if (!confirmPassword) {
    error.message = label
      ? `${label} is required!`
      : 'Confirm password is required!';
  } else if (confirmPassword !== password) {
    error.message = 'Password and confirm password should be same!';
  }
  return error;
}

export function validateEmail(email) {
  let error = { field: 'email', message: '' };
  if (!email) {
    error.message = 'Email id is required!';
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    error.message = 'Email address is invalid.';
  }
  return error;
}

export function validatePhone(phone) {
  let error = { field: 'phone', message: '' };
  if (!phone) {
    error.message = 'Phone No. is required!';
  } else if (/[!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]/.test(phone)) {
    error.message = 'Phone No. is invalid';
  } else if (phone.length <= 5) {
    error.message = 'You have enter invalid Phone No!';
  }
  return error;
}

export function validateName(name) {
  let error = { field: 'name', message: '' };
  if (!name) {
    error.message = 'Name is required!';
  } else if (!/^[a-zA-Z]/.test(name)) {
    error.message = `Name must be characters only!`;
  }
  return error;
}

export function validatePassword(password) {
  let error = { field: 'password', message: '' };
  if (!password) {
    error.message = 'Password is required!';
  } else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/.test(password)
  ) {
    error.message =
      'Password should have minimum 8 characters with number, special character & uppercase, ex. Johndoe@123';
  }
  return error;
}
