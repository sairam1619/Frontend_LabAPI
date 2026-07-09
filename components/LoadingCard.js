function LoadingCard() {
  return (
    <div className="loading-card">
      <div className="d-flex align-items-center">
        <div className="custom-spinner me-3"></div>

        <div>
          <strong>Preparing your AWS lab environment...</strong>

          <div>
            Please wait while the cloud environment is being provisioned
            securely.
          </div>
        </div>
      </div>

      <div className="loading-line">
        <div className="loading-line-inner"></div>
      </div>
    </div>
  );
}
