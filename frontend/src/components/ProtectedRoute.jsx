import { Navigate, Route } from "react-router-dom"
import { useSelector } from "react-redux"

function ProtectedRoute({ component: Component, ...restOfProps }) {

    const { user } = useSelector(
        (state) => state.auth
      )
  
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          user ? <Component {...props} /> : <Navigate to="/" replace />
        }
      />
    );
  }


export default ProtectedRoute;
