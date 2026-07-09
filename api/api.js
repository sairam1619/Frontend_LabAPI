async function authFetch(url, options = {}) {
  let token = getToken();

  /* WAIT FOR COGNITO SESSION RESTORE */

  if (!token) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    token = getToken();
  }

  /*  STILL NO TOKEN */

  if (!token) {
    startLogin();

    return Promise.reject("No token");
  }

  options.headers = {
    ...(options.headers || {}),
    Authorization: "Bearer " + token,
  };

  return fetch(url, options);
}
