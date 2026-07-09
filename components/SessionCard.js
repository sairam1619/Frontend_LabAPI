function SessionCard({
  activeLabName,
  activeSectionName,
  remainingTime,
  onOpenConsole,
}) {
  return (
    <div className="session-card">
      <div className="session-title">ACTIVE SESSION</div>

      <div className="session-section">{activeSectionName}</div>

      <div className="session-lab">Current Lab: {activeLabName}</div>

      <div className="session-time">
        {remainingTime || "Calculating remaining time..."}
      </div>

      <div className="mt-3">
        <button className="btn btn-launch" onClick={onOpenConsole}>
          Open Console
        </button>
      </div>
    </div>
  );
}
