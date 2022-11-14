const attachJWTToRes = (resObj, token) => {
  const day = 1000 * 60 * 60 * 24; // 1 dia em ms
  resObj.token('easymedToken', token, {
    httpOnly: true,
    expires: new Date(Date.now() + day),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = attachJWTToRes;
