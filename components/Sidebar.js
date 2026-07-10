function Sidebar({ currentPage, setCurrentPage }) {
  const [showLabs, setShowLabs] = React.useState(true);

  return (
    <aside className="sidebar">
      <div>
        {/* BRAND */}

        <div className="brand">
          <div className="brand-icon">
            <div className="brand-core"></div>

            <div className="brand-dot"></div>
          </div>

          <div>
            <h1>AWS Lab Portal</h1>

            <span>LEARN</span>
          </div>
        </div>

        {/* NAVIGATION */}

        <div className="nav-group">
          {/* Launch Lab */}

          <button
            className={
              currentPage === "launch" ? "nav-item active-nav" : "nav-item"
            }
            onClick={() => setCurrentPage("launch")}
          >
            Launch Lab
          </button>

          {/* Labs */}

          <button className="nav-parent" onClick={() => setShowLabs(!showLabs)}>
            <span>Labs</span>

            <i
              className={
                showLabs
                  ? "bi bi-chevron-up nav-arrow"
                  : "bi bi-chevron-down nav-arrow"
              }
            ></i>
          </button>

          {showLabs && (
            <div className="nav-dropdown">
              <button
                className={
                  currentPage === "iam-labs"
                    ? "nav-sub-item active-nav"
                    : "nav-sub-item"
                }
                onClick={() => setCurrentPage("iam-labs")}
              >
                IAM Labs
              </button>

              <button className="nav-sub-item" disabled>
                S3 Labs
              </button>

              <button className="nav-sub-item" disabled>
                Lambda Labs
              </button>

              <button className="nav-sub-item" disabled>
                EC2 Labs
              </button>

              <button className="nav-sub-item" disabled>
                DynamoDB Labs
              </button>

              <button className="nav-sub-item" disabled>
                Networking Labs
              </button>

              <button className="nav-sub-item" disabled>
                RDS Labs
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}

      <div className="sidebar-footer">
        <div className="profile">
          <div className="avatar">{username()?.charAt(0)?.toUpperCase()}</div>

          <div>
            <div className="email">{username()}</div>

            <div className="role">Learner</div>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
