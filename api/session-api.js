function restoreActiveSessionFromBackend(
  setActiveLabName,
  setActiveSectionName,
  setRemainingTime,
  setShowConsoleRecoveryModal,
  setAccountId,
  setSessionLocked,
) {
  authFetch(API + "/checkaccount?frontendSessionId=" + getFrontendSessionId())
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to restore session");
      }

      return response.json();
    })

    .then((data) => {
      /*
        SESSION ACTIVE IN OTHER BROWSER
      */

      if (data.status === "SESSION_ACTIVE_OTHER_BROWSER") {
        setSessionLocked(true);

        return;
      }

      if (!data.assigned || data.status !== "ACTIVE") {
        return;
      }

      if (data.account_id) {
        sessionStorage.setItem("accountId", data.account_id);

        setAccountId(data.account_id);
      }

      /*
        RESTORE LAB + SECTION NAMES
      */

      if (data.lab_name) {
        sessionStorage.setItem("activeLabName", data.lab_name);

        localStorage.setItem("activeLabName", data.lab_name);

        setActiveLabName(data.lab_name);
      }

      if (data.section_name) {
        sessionStorage.setItem("activeSectionName", data.section_name);

        localStorage.setItem("activeSectionName", data.section_name);

        setActiveSectionName(data.section_name);
      }

      if (data.console_url) {
        localStorage.setItem("pendingConsoleUrl", data.console_url);
      }

      if (data.expires_at) {
        const endTime = new Date(data.expires_at).getTime();

        if (!isNaN(endTime)) {
          sessionStorage.setItem("labEndTime", endTime);

          localStorage.setItem("labEndTime", endTime);

          const difference = endTime - Date.now();

          if (difference > 0) {
            const totalMinutes = Math.ceil(difference / 60000);

            const hours = Math.floor(totalMinutes / 60);

            const remainingMinutes = totalMinutes % 60;

            if (hours > 0) {
              setRemainingTime(`${hours} hr ${remainingMinutes} min remaining`);
            } else {
              setRemainingTime(`${remainingMinutes} min remaining`);
            }
          }
        }
      }

      /*
        FALLBACK VALUES
      */

      const savedLabName =
        sessionStorage.getItem("activeLabName") ||
        localStorage.getItem("activeLabName");

      const savedSectionName =
        sessionStorage.getItem("activeSectionName") ||
        localStorage.getItem("activeSectionName");

      if (savedLabName) {
        setActiveLabName(savedLabName);
      } else {
        setActiveLabName("Active Lab");
      }

      if (savedSectionName) {
        setActiveSectionName(savedSectionName);
      } else {
        setActiveSectionName("AWS Lab");
      }

      const consoleAlreadyOpened = localStorage.getItem("consoleOpened");

      if (!consoleAlreadyOpened) {
        setShowConsoleRecoveryModal(true);
      }
    })

    .catch(() => {
      console.log("No active backend session");
    });
}
