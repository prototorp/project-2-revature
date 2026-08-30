interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
  }
  
  function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
      <div
        className="alert alert-danger d-flex flex-column align-items-center text-center py-4"
        role="alert"
      >
        <p className="mb-2">{message}</p>
  
        {onRetry && (
          <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }
  
  export default ErrorMessage;