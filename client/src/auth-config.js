var authConfig = {
  baseUrl: "http://127.0.0.1:5000/api",
  loginUrl: '/users/login',
  tokenName: 'token',
  authHeader: 'Authorization',
  authToken: '',
  logoutRedirect: '#/home'
};

export default authConfig;
