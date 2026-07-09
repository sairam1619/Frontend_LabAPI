function CustomAlertModal({
  icon,
  title,
  message,
  buttonText,
  buttonClass = "custom-alert-button",
  onButtonClick,
}) {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-modal">
        <div className="custom-alert-icon">{icon}</div>

        <h3>{title}</h3>

        <p>{message}</p>

        <button className={buttonClass} onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
