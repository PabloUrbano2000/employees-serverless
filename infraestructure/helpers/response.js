const responseHttp = (
  success,
  data = null,
  message = null,
  statusCode = 200
) => {
  return {
    statusCode,
    body: JSON.stringify(
      {
        success,
        data,
        message,
      },
      null
    ),
  };
};

module.exports = responseHttp;
