function Sidebar({ currentPage, setCurrentPage, activeLabName }) {
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
          <button
            className={
              currentPage === "launch" ? "nav-item active-nav" : "nav-item"
            }
            onClick={() => setCurrentPage("launch")}
          >
            Launch Lab
          </button>

          <button
            className={
              currentPage === "details" ? "nav-item active-nav" : "nav-item"
            }
            disabled={!activeLabName}
            onClick={() => setCurrentPage("details")}
          >
            Current Lab
          </button>
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
