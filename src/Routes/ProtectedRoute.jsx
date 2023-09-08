import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../Providers/AuthProvider'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <div>loading....</div>
  }

  if (user) {
    return children
  }
  return <Navigate to='/' state={{ from: location }} replace></Navigate>
}

export default ProtectedRoute;