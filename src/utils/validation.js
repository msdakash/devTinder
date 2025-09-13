const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First Name not valid");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("password not strong enough");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["about", "skills", "photoUrl"];

  const isEditAllowed = Object.keys(req.body).every((data) =>
    allowedEditFields.includes(data)
  );

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
