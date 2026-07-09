async function loadPermissions(
  setSections,
  setError,
  setAccountsAvailable,
  setBlockedUser,
) {
  setError("");

  let retries = 3;

  while (retries > 0) {
    try {
      const response = await authFetch(API + "/permissions");

      const data = await response.json();

      /*
        BLOCKED USER
      */

      if (response.status === 403 && data.blocked) {
        setBlockedUser(true);

        setAccountsAvailable(true);

        setError("");

        /*
          STILL LOAD SECTIONS
        */

        if (data.sections) {
          setSections(data.sections);
        } else {
          const transformedSections = [
            {
              title: "General Labs",

              icon: "AWS",

              description: "AWS Hands-on Labs",

              duration: "2 Hours",

              seconds: 7200,

              permissionSetArn: "",

              labs: (data.permissionSets || []).map((p) => ({
                name: p.name,

                description: "AWS Hands-on Learning Environment",

                permissionSetArn: p.arn,

                duration: p.duration,

                seconds: p.seconds,
              })),
            },
          ];

          setSections(transformedSections);
        }

        throw new Error("BLOCKED_USER");
      }

      /*
        OTHER ERRORS
      */

      if (!response.ok) {
        throw new Error("Failed to load permissions");
      }

      /*
        ACCOUNT AVAILABILITY
      */

      if (data.accountsAvailable === false) {
        setAccountsAvailable(false);
      } else {
        setAccountsAvailable(true);
      }

      /*
        NEW STRUCTURED SECTIONS
      */

      if (data.sections) {
        setSections(data.sections);

        return {
          blocked: false,
        };
      }

      /*
        FALLBACK LEGACY FORMAT
      */

      const transformedSections = [
        {
          title: "General Labs",

          icon: "AWS",

          description: "AWS Hands-on Labs",

          duration: "2 Hours",

          seconds: 7200,

          permissionSetArn: "",

          labs: (data.permissionSets || []).map((p) => ({
            name: p.name,

            description: "AWS Hands-on Learning Environment",

            permissionSetArn: p.arn,

            duration: p.duration,

            seconds: p.seconds,
          })),
        },
      ];

      setSections(transformedSections);

      return {
        blocked: false,
      };
    } catch (err) {
      /*
        BLOCKED USER
      */

      if (err?.message === "BLOCKED_USER") {
        return {
          blocked: true,
        };
      }

      retries--;

      console.log("Permissions load failed:", err);

      /*
        WAIT BEFORE RETRY
      */

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  /*
    SHOW ERROR ONLY AFTER ALL RETRIES FAIL
  */

  setError("Failed to load labs");

  setAccountsAvailable(true);

  return {
    blocked: false,
  };
}

function clearFailedLaunchState(
  setRemainingTime,
  setActiveLabName,
  setActiveSectionName,
  setLoadingLab,
) {
  sessionStorage.removeItem("executionArn");

  sessionStorage.removeItem("accountId");

  sessionStorage.removeItem("labEndTime");

  sessionStorage.removeItem("activeLabName");

  sessionStorage.removeItem("activeSectionName");

  sessionStorage.removeItem("isLaunching");

  sessionStorage.removeItem("lab-setup");

  localStorage.removeItem("pendingConsoleUrl");

  localStorage.removeItem("labEndTime");

  localStorage.removeItem("consoleOpened");

  localStorage.removeItem("activeLabName");

  localStorage.removeItem("activeSectionName");

  setRemainingTime("");

  setActiveLabName("");

  setActiveSectionName("");

  setLoadingLab(null);
}

function launchLab(
  section,
  lab,
  setRemainingTime,
  setActiveLabName,
  setActiveSectionName,
  setLoadingLab,
  setError,
  setExecutionArn,
  setAccountId,
  setShowAlertModal,
  setShowLaunchErrorModal,
  setLaunchErrorTitle,
  setLaunchErrorMessage,
) {
  sessionStorage.removeItem("executionArn");

  sessionStorage.removeItem("accountId");

  sessionStorage.removeItem("labEndTime");

  sessionStorage.removeItem("activeLabName");

  sessionStorage.removeItem("activeSectionName");

  sessionStorage.removeItem("isLaunching");

  sessionStorage.removeItem("lab-setup");

  localStorage.removeItem("pendingConsoleUrl");

  localStorage.removeItem("labEndTime");

  localStorage.removeItem("consoleOpened");

  setRemainingTime("");

  setActiveLabName("");

  setActiveSectionName("");

  setLoadingLab(lab.name);

  setError("");

  sessionStorage.setItem("activeLabName", lab.name);

  sessionStorage.setItem("activeSectionName", section.title);

  localStorage.setItem("activeLabName", lab.name);

  localStorage.setItem("activeSectionName", section.title);

  setShowAlertModal(true);

  authFetch(API + "/launchlab", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      permissionSetArn: section.permissionSetArn || lab.permissionSetArn,

      duration: section.seconds || lab.seconds,

      /*
        SAVE LAB + SECTION
      */

      lab: lab.name,

      section: section.title,

      /*
        FRONTEND SESSION ID
      */

      frontendSessionId: getFrontendSessionId(),
    }),
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        /*
          ACTIVE SESSION EXISTS
        */

        if (response.status === 409 || data.status === "ALREADY_ASSIGNED") {
          clearFailedLaunchState(
            setRemainingTime,
            setActiveLabName,
            setActiveSectionName,
            setLoadingLab,
          );

          setShowAlertModal(false);

          setLaunchErrorTitle("Active Lab Session");

          setLaunchErrorMessage(
            "You already have an active AWS lab session assigned.",
          );

          setShowLaunchErrorModal(true);

          throw new Error("ALREADY_ASSIGNED");
        }

        /*
          GENERIC FAILURE
        */

        clearFailedLaunchState(
          setRemainingTime,
          setActiveLabName,
          setActiveSectionName,
          setLoadingLab,
        );

        setShowAlertModal(false);

        setLaunchErrorTitle("Failed to Start Lab");

        setLaunchErrorMessage(
          "Unable to start the AWS lab environment at the moment. Please try again after some time.",
        );

        setShowLaunchErrorModal(true);

        throw new Error("FAILED");
      }

      return data;
    })

    .then((data) => {
      if (!data.executionArn) {
        clearFailedLaunchState(
          setRemainingTime,
          setActiveLabName,
          setActiveSectionName,
          setLoadingLab,
        );

        setShowAlertModal(false);

        setLaunchErrorTitle("Failed to Start Lab");

        setLaunchErrorMessage(
          "Unable to start the AWS lab environment at the moment. Please try again after some time.",
        );

        setShowLaunchErrorModal(true);

        return;
      }

      sessionStorage.setItem("executionArn", data.executionArn);

      sessionStorage.setItem("accountId", data.account_id);

      sessionStorage.setItem("isLaunching", "true");

      sessionStorage.setItem("lab-setup", "true");

      for (let i = 0; i < 4; i++) {
        window.history.pushState({ protected: true }, "", window.location.href);
      }

      setExecutionArn(data.executionArn);

      setAccountId(data.account_id);
    })

    .catch((err) => {
      /*
        Modal already shown above
      */

      if (err.message === "ALREADY_ASSIGNED" || err.message === "FAILED") {
        return;
      }

      clearFailedLaunchState(
        setRemainingTime,
        setActiveLabName,
        setActiveSectionName,
        setLoadingLab,
      );

      setShowAlertModal(false);

      setLaunchErrorTitle("Failed to Start Lab");

      setLaunchErrorMessage(
        "Unable to start the AWS lab environment at the moment. Please try again after some time.",
      );

      setShowLaunchErrorModal(true);
    });
}

function pollLabStatus(
  executionArn,
  sections,
  loadingLab,
  accountId,
  setError,
  setLoadingLab,
  setActiveLabName,
  setActiveSectionName,
  setRemainingTime,
  setShowConsoleRecoveryModal,
  setShowLaunchErrorModal,
  setLaunchErrorTitle,
  setLaunchErrorMessage,
) {
  if (!executionArn || !accountId) {
    return;
  }

  let retryCount = 0;

  const MAX_RETRIES = 120;

  const interval = setInterval(() => {
    authFetch(
      API +
        "/labstatus?executionArn=" +
        executionArn +
        "&account_id=" +
        accountId,
    )
      .then(async (response) => {
        const data = await response.json();

        /*
          STEP FUNCTION FAILED
        */

        if (
          data.status === "FAILED" ||
          data.status === "ERROR" ||
          data.status === "TIMED_OUT" ||
          data.status === "ABORTED"
        ) {
          clearFailedLaunchState(
            setRemainingTime,
            setActiveLabName,
            setActiveSectionName,
            setLoadingLab,
          );

          setShowConsoleRecoveryModal(false);

          setError("");

          setLaunchErrorTitle("Failed to Start Lab");

          setLaunchErrorMessage(
            "Unable to start the AWS lab environment at the moment. Please try again after some time.",
          );

          setShowLaunchErrorModal(true);

          clearInterval(interval);

          return null;
        }

        if (!response.ok) {
          throw new Error("Status request failed");
        }

        return data;
      })

      .then((data) => {
        if (!data) {
          return;
        }

        retryCount = 0;

        /*
          SESSION EXPIRING
        */

        if (data.status === "SESSION_EXPIRING") {
          setRemainingTime("Session expiring soon");

          localStorage.removeItem("pendingConsoleUrl");

          clearInterval(interval);

          return;
        }

        if (data.status === "READY" && data.console_url) {
          let launchedLab = null;

          let launchedSection = null;

          sections.forEach((section) => {
            section.labs.forEach((lab) => {
              if (lab.name === loadingLab) {
                launchedLab = lab;

                launchedSection = section;
              }
            });
          });

          if (launchedLab || data.console_url) {
            let endTime = null;

            if (data.expires_at) {
              const parsedEndTime = new Date(data.expires_at).getTime();

              if (!isNaN(parsedEndTime)) {
                endTime = parsedEndTime;

                sessionStorage.setItem("labEndTime", endTime);

                localStorage.setItem("labEndTime", endTime);
              }
            } else {
              const existingEndTime =
                sessionStorage.getItem("labEndTime") ||
                localStorage.getItem("labEndTime");

              if (existingEndTime) {
                endTime = parseInt(existingEndTime);

                sessionStorage.setItem("labEndTime", existingEndTime);
              }
            }

            const finalLabName =
              launchedLab?.name ||
              sessionStorage.getItem("activeLabName") ||
              localStorage.getItem("activeLabName") ||
              "AWS Lab";

            const finalSectionName =
              launchedSection?.title ||
              sessionStorage.getItem("activeSectionName") ||
              localStorage.getItem("activeSectionName") ||
              "AWS Lab";

            sessionStorage.setItem("activeLabName", finalLabName);

            sessionStorage.setItem("activeSectionName", finalSectionName);

            localStorage.setItem("activeLabName", finalLabName);

            localStorage.setItem("activeSectionName", finalSectionName);

            setActiveLabName(finalLabName);

            setActiveSectionName(finalSectionName);

            if (endTime) {
              const difference = endTime - Date.now();

              if (difference > 0) {
                const totalMinutes = Math.ceil(difference / 60000);

                const hours = Math.floor(totalMinutes / 60);

                const remainingMinutes = totalMinutes % 60;

                if (hours > 0) {
                  setRemainingTime(
                    `${hours} hr ${remainingMinutes} min remaining`,
                  );
                } else {
                  setRemainingTime(`${remainingMinutes} min remaining`);
                }
              } else {
                setRemainingTime("Session expired");

                sessionStorage.removeItem("labEndTime");

                localStorage.removeItem("labEndTime");

                localStorage.removeItem("pendingConsoleUrl");

                sessionStorage.removeItem("executionArn");

                sessionStorage.removeItem("accountId");

                sessionStorage.removeItem("activeLabName");

                sessionStorage.removeItem("activeSectionName");
              }
            }

            localStorage.setItem("pendingConsoleUrl", data.console_url);

            const consoleAlreadyOpened = localStorage.getItem("consoleOpened");

            if (!consoleAlreadyOpened) {
              setShowConsoleRecoveryModal(true);
            }

            sessionStorage.removeItem("isLaunching");

            sessionStorage.removeItem("lab-setup");

            setLoadingLab(null);

            clearInterval(interval);
          }
        }
      })

      .catch(() => {
        retryCount++;

        if (retryCount >= MAX_RETRIES) {
          clearFailedLaunchState(
            setRemainingTime,
            setActiveLabName,
            setActiveSectionName,
            setLoadingLab,
          );

          setShowConsoleRecoveryModal(false);

          setError("");

          setLaunchErrorTitle("Provisioning Timed Out");

          setLaunchErrorMessage(
            "AWS lab environment provisioning timed out. Please try again after some time.",
          );

          setShowLaunchErrorModal(true);

          clearInterval(interval);
        }
      });
  }, 3000);

  return interval;
}
