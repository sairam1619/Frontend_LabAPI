function Sidebar({ currentPage, setCurrentPage }) {
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

        {/* LAUNCH */}

        <div className="nav-group">
          <div className="nav-label">PORTAL</div>

          <button
            className={
              currentPage === "launch" ? "nav-item active-nav" : "nav-item"
            }
            onClick={() => setCurrentPage("launch")}
          >
            Launch Lab
          </button>
        </div>

        {/* LABS */}

        <div className="nav-group">
          <div className="nav-label">LABS</div>

          <button
            className={
              currentPage === "iam-labs" ? "nav-item active-nav" : "nav-item"
            }
            onClick={() => setCurrentPage("iam-labs")}
          >
            IAM Labs
          </button>

          <button className="nav-item" disabled>
            S3 Labs
          </button>

          <button className="nav-item" disabled>
            Lambda Labs
          </button>

          <button className="nav-item" disabled>
            EC2 Labs
          </button>

          <button className="nav-item" disabled>
            DynamoDB Labs
          </button>

          <button className="nav-item" disabled>
            Networking Labs
          </button>

          <button className="nav-item" disabled>
            RDS Labs
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
