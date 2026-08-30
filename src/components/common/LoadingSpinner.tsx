interface LoadingSpinnerProps {
    message?: string;
  }
  
  function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center py-5"
        role="status"
        aria-live="polite"
      >
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">{message}</span>
        </div>
        <p className="mt-3 text-muted">{message}</p>
      </div>
    );
  }
  
  export default LoadingSpinner;