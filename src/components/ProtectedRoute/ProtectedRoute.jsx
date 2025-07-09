import { Navigate, useOutletContext } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useOutletContext();

  if (!user) {
    return <Navigate to={"/user/login"} />;
  }

  return children;
};

export default ProtectedRoute;
