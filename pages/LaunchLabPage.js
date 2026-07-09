function LaunchLabPage({ appState }) {
  const {
    filteredSections,
    activeSection,

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

    error,

    launchLab,

    openExistingConsoleSession,

    serviceIcons,

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
  } = appState;

  return (
    <div className="container main-section">
      <div className="page-header">
        <h2>Welcome {username()}</h2>

        <p className="portal-description">
          This portal provides temporary AWS access for hands-on learning and
          deep dive lab activities. Browse AWS service categories, select a lab
          environment, and launch secure hands-on cloud exercises with
          controlled AWS permissions. Explore AWS services, perform guided lab
          tasks, and strengthen practical cloud skills through real-world
          learning experiences.
        </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* ACTIVE SESSION */}

      {activeLabName && !sessionLocked && (
        <SessionCard
          activeLabName={activeLabName}
          activeSectionName={activeSectionName}
          remainingTime={remainingTime}
          onOpenConsole={openExistingConsoleSession}
        />
      )}

      {/* LOADING */}

      {loadingLab && <LoadingCard />}

      {/* LAB CATALOG */}

      {!activeLabName && !loadingLab && (
        <>
          <div className="search-box">
            <input
              className="form-control"
              placeholder="🔍 Search labs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedSection(0);
              }}
            />
          </div>

          <div className="section-tabs">
            {filteredSections.map((section, index) => (
              <button
                key={index}
                className={
                  selectedSection === index
                    ? "section-tab active-section-tab"
                    : "section-tab"
                }
                onClick={() => setSelectedSection(index)}
              >
                <div className="tab-content">
                  <img src={serviceIcons[section.icon]} className="tab-icon" />

                  <span>{section.icon}</span>
                </div>
              </button>
            ))}
          </div>

          {activeSection && (
            <div className="lab-section">
              <div className="section-header">
                <div className="section-title-row">
                  <img
                    src={serviceIcons[activeSection.icon]}
                    className="section-header-icon"
                  />

                  <div className="section-title">{activeSection.title}</div>
                </div>

                <div className="section-description">
                  {activeSection.description}
                </div>

                <div className="section-duration">
                  ⏱ Shared Environment Duration: {activeSection.duration}
                </div>
              </div>

              {(!accountsAvailable || sessionLocked || blockedUser) && (
                <div className="no-accounts-banner">
                  {blockedUser
                    ? "User is blocked. Please contact administrator."
                    : sessionLocked
                      ? "This lab session is already active in another browser."
                      : "AWS lab accounts are currently unavailable. Please try again later."}
                </div>
              )}

              <div className="lab-list">
                {activeSection.labs.map((lab, i) => (
                  <div className="lab-card" key={i}>
                    <div className="lab-left">
                      <div className="lab-content">
                        <div className="lab-name">{lab.name}</div>

                        <div className="lab-description">{lab.description}</div>
                      </div>
                    </div>

                    <button
                      className="btn btn-launch"
                      title={
                        blockedUser
                          ? "User is blocked. Please contact administrator."
                          : sessionLocked
                            ? "This lab session is already active in another browser."
                            : !accountsAvailable
                              ? "AWS lab accounts are currently unavailable. Please try again later."
                              : ""
                      }
                      disabled={
                        loadingLab !== null ||
                        activeLabName ||
                        !accountsAvailable ||
                        sessionLocked ||
                        blockedUser
                      }
                      onClick={() =>
                        launchLab(
                          activeSection,
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
                        )
                      }
                    >
                      {loadingLab === lab.name ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Launching...
                        </>
                      ) : activeLabName ? (
                        "Session Active"
                      ) : blockedUser ? (
                        "User Blocked"
                      ) : sessionLocked ? (
                        "Session Active Elsewhere"
                      ) : !accountsAvailable ? (
                        "No Accounts Available"
                      ) : (
                        "Launch Lab"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="footer">Lab Environment Portal | Version 3.0</div>
    </div>
  );
}
