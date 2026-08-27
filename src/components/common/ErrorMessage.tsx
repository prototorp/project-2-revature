interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="alert alert-danger container my-4" role="alert">
      {message}
    </div>
  );
}

export default ErrorMessage;