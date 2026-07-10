function App() {
  const [currentPage, setCurrentPage] = React.useState(PAGE.LAUNCH);
  const [sections, setSections] = React.useState([]);
  const [selectedSection, setSelectedSection] = React.useState(0);
  const [loadingLab, setLoadingLab] = React.useState(null);
  const [executionArn, setExecutionArn] = React.useState(null);
  const [accountId, setAccountId] = React.useState(null);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [isReady, setIsReady] = React.useState(false);
  const [remainingTime, setRemainingTime] = React.useState("");
  const [activeLabName, setActiveLabName] = React.useState("");
  const [activeSectionName, setActiveSectionName] = React.useState("");

  /*
    ACCOUNT AVAILABILITY
  */

  const [accountsAvailable, setAccountsAvailable] = React.useState(true);

  /*
    SESSION LOCK
  */

  const [sessionLocked, setSessionLocked] = React.useState(false);

  /*
    BLOCKED USER
  */

  const [blockedUser, setBlockedUser] = React.useState(false);

  const [showSessionExpiredModal, setShowSessionExpiredModal] =
    React.useState(false);

  const [showAlertModal, setShowAlertModal] = React.useState(false);

  const [showConsoleRecoveryModal, setShowConsoleRecoveryModal] =
    React.useState(false);

  /*
    Launch Error Modal
  */

  const [showLaunchErrorModal, setShowLaunchErrorModal] = React.useState(false);

  const [launchErrorTitle, setLaunchErrorTitle] = React.useState("");

  const [launchErrorMessage, setLaunchErrorMessage] = React.useState("");

  /*
    AWS Service Icons
  */

  React.useEffect(() => {
    saveToken();

    const token = getToken();

    if (!token) return;

    (async () => {
      const result = await loadPermissions(
        setSections,
        setError,
        setAccountsAvailable,
        setBlockedUser,
      );

      /*
        BLOCKED USER
      */

      if (result?.blocked) {
        setIsReady(true);

        return;
      }

      /*
        Restore frontend cached session
      */

      restoreSession(
        setExecutionArn,
        setAccountId,
        setActiveLabName,
        setActiveSectionName,
        setRemainingTime,
        setLoadingLab,
      );

      /*
        Restore backend ACTIVE session
      */

      restoreActiveSessionFromBackend(
        setActiveLabName,
        setActiveSectionName,
        setRemainingTime,
        setShowConsoleRecoveryModal,
        setAccountId,
        setSessionLocked,
      );

      setIsReady(true);
    })();
  }, []);

  React.useEffect(() => {
    const savedExecutionArn = sessionStorage.getItem("executionArn");

    const savedAccountId = sessionStorage.getItem("accountId");

    if (savedExecutionArn && !executionArn) {
      setExecutionArn(savedExecutionArn);
    }

    if (savedAccountId && !accountId) {
      setAccountId(savedAccountId);
    }
  }, []);

  React.useEffect(() => {
    const cleanup = setupBackProtection(loadingLab, setShowAlertModal);

    return cleanup;
  }, [loadingLab]);

  React.useEffect(() => {
    if (!executionArn || !accountId) {
      return;
    }

    const timer = pollLabStatus(
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
    );

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [executionArn, accountId]);

  React.useEffect(() => {
    const savedSectionName = sessionStorage.getItem("activeSectionName");

    if (savedSectionName && sections.length > 0) {
      const index = sections.findIndex((s) => s.title === savedSectionName);

      if (index >= 0) {
        setSelectedSection(index);
      }
    }
  }, [sections]);

  React.useEffect(() => {
    const interval = updateSessionTimer(
      setRemainingTime,
      setShowSessionExpiredModal,
      setActiveLabName,
      setActiveSectionName,
    );

    return () => clearInterval(interval);
  }, []);

  /*
    RECOVERY MODAL:
    USE FEDERATION URL
  */

  function openRecoveredConsole() {
    const pendingConsoleUrl = localStorage.getItem("pendingConsoleUrl");

    if (pendingConsoleUrl) {
      const newWindow = window.open(pendingConsoleUrl, "_blank");

      if (newWindow) {
        localStorage.setItem("consoleOpened", "true");

        setShowConsoleRecoveryModal(false);
      } else {
        alert("Popup was blocked. Please allow popups for this site.");
      }
    } else {
      alert("Console URL not available.");
    }
  }

  /*
    ACTIVE SESSION BUTTON:
    USE EXISTING AWS SESSION
  */

  function openExistingConsoleSession() {
    const newWindow = window.open(
      "https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1#",
      "_blank",
    );

    if (newWindow) {
      localStorage.setItem("consoleOpened", "true");
    } else {
      alert("Popup was blocked. Please allow popups for this site.");
    }
  }

  const filteredSections = sections
    .map((section) => ({
      ...section,
      labs: section.labs.filter((lab) =>
        lab.name.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((section) => section.labs.length > 0);

  const activeSection = filteredSections[selectedSection] || null;

  const appState = {
    filteredSections,
    activeSection,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    selectedSection,
    setSelectedSection,
    loadingLab,
    activeLabName,
    activeSectionName,
    remainingTime,
    accountsAvailable,
    blockedUser,
    sessionLocked,
    serviceIcons: SERVICE_ICONS,
    error,
    launchLab,
    openExistingConsoleSession,
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
  };

  if (!isReady) return null;

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activeLabName={activeLabName}
        onLogout={logout}
      />
      <div className="app-content">
        <main className="page-content">
          {currentPage === PAGE.LAUNCH && <LaunchLabPage appState={appState} />}

          {currentPage === PAGE.IAM_LABS && <LabDetailsPage type="iam" />}
          {currentPage === PAGE.S3_LABS && <LabDetailsPage type="s3" />}
          {currentPage === PAGE.LAMBDA_LABS && <LabDetailsPage type="lambda" />}
          {currentPage === PAGE.EC2_LABS && <LabDetailsPage type="ec2" />}
          {currentPage === PAGE.DYNAMODB_LABS && (
            <LabDetailsPage type="dynamodb" />
          )}
          {currentPage === PAGE.NETWORKING_LABS && (
            <LabDetailsPage type="networking" />
          )}
          {currentPage === PAGE.RDS_LABS && <LabDetailsPage type="rds" />}
        </main>

        {showSessionExpiredModal && (
          <div className="session-expired-overlay">
            <div className="session-expired-modal">
              <div className="expired-icon">⏰</div>

              <h3>Session Ended</h3>

              <p>
                Your AWS lab session has ended successfully.
                <br />
                <br />
                Please wait at least 15 minutes for the environment cleanup
                process to complete before launching another lab.
                <br />
                <br />
                Click Logout to exit the portal.
              </p>

              <div className="expired-actions">
                <button
                  className="btn-expired-logout"
                  onClick={handleLogoutAfterExpiry}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {showAlertModal && (
          <CustomAlertModal
            icon="⚠️"
            title="Lab Setup In Progress"
            message="Your AWS lab environment is currently being prepared. Please remain on this page until setup is completed successfully."
            buttonText="Okay"
            onButtonClick={() => setShowAlertModal(false)}
          />
        )}

        {showConsoleRecoveryModal && (
          <CustomAlertModal
            icon="🚀"
            title="AWS Console Ready"
            message="Your AWS lab environment was prepared successfully. Click below to open the AWS Console."
            buttonText="Open Console"
            buttonClass="btn-continue-session"
            onButtonClick={openRecoveredConsole}
          />
        )}

        {showLaunchErrorModal && (
          <CustomAlertModal
            icon="⚠️"
            title={launchErrorTitle}
            message={launchErrorMessage}
            buttonText="Okay"
            onButtonClick={() => setShowLaunchErrorModal(false)}
          />
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
