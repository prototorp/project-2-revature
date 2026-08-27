function LoadingSpinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-2 my-5"
      role="status"
    >
      <span className="spinner-border" aria-hidden="true" />
      <span>Loading movies...</span>
    </div>
  );
}

export default LoadingSpinner;