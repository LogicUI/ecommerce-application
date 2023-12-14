type ErrorProps = {
  message: string;
};

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => {
  return <div style={{ color: "red", marginBottom: "1rem" }}>{message}</div>;
};

export default ErrorComponent;
