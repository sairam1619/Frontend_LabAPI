function restoreSession(
  setExecutionArn,
  setAccountId,
  setActiveLabName,
  setActiveSectionName,
  setRemainingTime,
  setLoadingLab,
) {
  const savedExecutionArn = sessionStorage.getItem("executionArn");

  const savedAccountId = sessionStorage.getItem("accountId");

  const savedLabName = sessionStorage.getItem("activeLabName");

  const savedSectionName = sessionStorage.getItem("activeSectionName");

  const savedEndTime =
    sessionStorage.getItem("labEndTime") || localStorage.getItem("labEndTime");

  if (savedLabName) {
    setActiveLabName(savedLabName);
  }

  if (savedSectionName) {
    setActiveSectionName(savedSectionName);
  }

  if (savedEndTime) {
    const difference = parseInt(savedEndTime) - Date.now();

    if (difference > 0) {
      const totalMinutes = Math.ceil(difference / 60000);

      const hours = Math.floor(totalMinutes / 60);

      const remainingMinutes = totalMinutes % 60;

      if (hours > 0) {
        setRemainingTime(`${hours} hr ${remainingMinutes} min remaining`);
      } else {
        setRemainingTime(`${remainingMinutes} min remaining`);
      }
    } else {
      sessionStorage.removeItem("labEndTime");

      localStorage.removeItem("labEndTime");

      localStorage.removeItem("consoleOpened");

      localStorage.removeItem("pendingConsoleUrl");

      localStorage.removeItem("lastConsoleRefresh");

      localStorage.removeItem("frontendSessionId");

      sessionStorage.removeItem("executionArn");

      sessionStorage.removeItem("accountId");

      sessionStorage.removeItem("activeLabName");

      sessionStorage.removeItem("activeSectionName");

      sessionStorage.removeItem("isLaunching");

      sessionStorage.removeItem("lab-setup");

      setRemainingTime("");

      setActiveLabName("");

      setActiveSectionName("");
    }
  }

  /*
    IMPORTANT:
    Do NOT depend only on isLaunching.
    Recovery should work after refresh/login delay.
  */

  if (savedExecutionArn && savedAccountId) {
    setExecutionArn(savedExecutionArn);

    setAccountId(savedAccountId);

    setActiveLabName(savedLabName || "");

    setActiveSectionName(savedSectionName || "");

    setLoadingLab(savedLabName || "restoring");

    for (let i = 0; i < 4; i++) {
      window.history.pushState({ protected: true }, "", window.location.href);
    }
  }
}

function handleContinueSession(setShowSessionExpiredModal) {
  sessionStorage.removeItem("labEndTime");

  sessionStorage.removeItem("activeLabName");

  sessionStorage.removeItem("activeSectionName");

  localStorage.removeItem("consoleOpened");

  sessionStorage.removeItem("executionArn");

  sessionStorage.removeItem("accountId");

  sessionStorage.removeItem("isLaunching");

  sessionStorage.removeItem("lab-setup");

  localStorage.removeItem("pendingConsoleUrl");

  localStorage.removeItem("labEndTime");

  localStorage.removeItem("lastConsoleRefresh");

  localStorage.removeItem("frontendSessionId");

  setShowSessionExpiredModal(false);
}

function clearLabSessionStorage() {
  localStorage.removeItem("activeLabName");

  localStorage.removeItem("activeSectionName");

  localStorage.removeItem("pendingConsoleUrl");

  localStorage.removeItem("consoleOpened");

  localStorage.removeItem("labEndTime");

  localStorage.removeItem("lastConsoleRefresh");

  localStorage.removeItem("frontendSessionId");

  sessionStorage.removeItem("executionArn");

  sessionStorage.removeItem("accountId");

  sessionStorage.removeItem("remainingTime");

  sessionStorage.removeItem("activeLabName");

  sessionStorage.removeItem("activeSectionName");

  sessionStorage.removeItem("labEndTime");

  sessionStorage.removeItem("isLaunching");

  sessionStorage.removeItem("lab-setup");
}

function handleLogoutAfterExpiry() {
  clearLabSessionStorage();

  localStorage.removeItem("token");

  window.location.href = cognitoLogoutRedirect();
}

function updateSessionTimer(
  setRemainingTime,
  setShowSessionExpiredModal,
  setActiveLabName,
  setActiveSectionName,
) {
  const updateTimer = () => {
    const endTime =
      sessionStorage.getItem("labEndTime") ||
      localStorage.getItem("labEndTime");

    if (!endTime) {
      setRemainingTime("");

      return;
    }

    const difference = parseInt(endTime) - Date.now();

    if (difference <= 0) {
      setShowSessionExpiredModal(true);

      sessionStorage.removeItem("labEndTime");

      sessionStorage.removeItem("activeLabName");

      sessionStorage.removeItem("activeSectionName");

      localStorage.removeItem("consoleOpened");

      sessionStorage.removeItem("executionArn");

      sessionStorage.removeItem("accountId");

      sessionStorage.removeItem("isLaunching");

      sessionStorage.removeItem("lab-setup");

      localStorage.removeItem("pendingConsoleUrl");

      localStorage.removeItem("labEndTime");

      localStorage.removeItem("lastConsoleRefresh");

      localStorage.removeItem("frontendSessionId");

      setRemainingTime("");

      setActiveLabName("");

      setActiveSectionName("");

      return;
    }

    const totalMinutes = Math.ceil(difference / 60000);

    const hours = Math.floor(totalMinutes / 60);

    const remainingMinutes = totalMinutes % 60;

    if (hours > 0) {
      setRemainingTime(`${hours} hr ${remainingMinutes} min remaining`);
    } else {
      setRemainingTime(`${remainingMinutes} min remaining`);
    }
  };

  updateTimer();

  return setInterval(updateTimer, 5000);
}

function setupBackProtection(loadingLab, setShowAlertModal) {
  const isProvisioningActive = () => {
    const launching = sessionStorage.getItem("isLaunching");

    const executionArn = sessionStorage.getItem("executionArn");

    const consoleOpened = localStorage.getItem("consoleOpened");

    return (
      (loadingLab || launching === "true" || executionArn) &&
      consoleOpened !== "true"
    );
  };

  const preventBackNavigation = () => {
    if (isProvisioningActive()) {
      window.history.pushState({ protected: true }, "", window.location.href);

      setShowAlertModal(true);
    }
  };

  window.addEventListener("popstate", preventBackNavigation);

  return () => {
    window.removeEventListener("popstate", preventBackNavigation);
  };
}

function getFrontendSessionId() {
  let sessionId = localStorage.getItem("frontendSessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    localStorage.setItem("frontendSessionId", sessionId);
  }

  return sessionId;
}
