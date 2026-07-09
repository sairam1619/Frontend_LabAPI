const API = "https://acpvq947a9.execute-api.us-west-2.amazonaws.com/prod";
const clientId = "hn2tus0hoierb0seh90ivlh2m";
const domain = "https://us-west-2zspbt07tz.auth.us-west-2.amazoncognito.com";
const redirect = window.location.origin;

function getToken() {
  return localStorage.getItem("token");
}

function startLogin() {
  window.location.href =
    domain +
    "/oauth2/authorize" +
    "?response_type=token" +
    "&client_id=" +
    clientId +
    "&scope=email+openid+profile" +
    "&prompt=login" +
    "&redirect_uri=" +
    redirect;
}

function saveToken() {
  const existingToken = getToken();

  if (existingToken) {
    return;
  }

  if (!window.location.hash) {
    startLogin();

    return;
  }

  const params = new URLSearchParams(window.location.hash.substring(1));

  /*
    USE ID TOKEN
    FOR API GATEWAY JWT AUTHORIZER
  */

  const token = params.get("id_token");

  if (token) {
    localStorage.setItem("token", token);

    window.history.replaceState(null, "", window.location.pathname);

    window.history.pushState(null, "", window.location.pathname);
  }
}

function username() {
  const token = getToken();

  if (!token) return "";

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      payload.name || payload.email || payload["cognito:username"] || "User"
    );
  } catch {
    return "User";
  }
}

function cognitoLogoutRedirect() {
  return (
    domain +
    "/logout?client_id=" +
    clientId +
    "&logout_uri=" +
    encodeURIComponent(window.location.origin + "/logout-success.html")
  );
}

function logout() {
  sessionStorage.clear();

  localStorage.removeItem("token");

  localStorage.removeItem("pendingConsoleUrl");

  localStorage.removeItem("labEndTime");

  localStorage.removeItem("consoleOpened");

  localStorage.removeItem("activeLabName");

  localStorage.removeItem("activeSectionName");

  window.location.href = cognitoLogoutRedirect();
}
