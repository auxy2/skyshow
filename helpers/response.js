/**
 *
 */
const error = (res, code, err) => {
  let message = err.message || err;

  if(message === "jwt expired") message = "Please login again"

  return res.status(code).json({
    success: 0,
    message: message
  });
};

const success = (res, statusCode, userData, data) => {
  res.status(statusCode).send({
    success: 1,
    message: "Successful",
    userData,
  });
};


// response.js

export const sendResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: 1,
    message,
  });
};



export { error, success };
