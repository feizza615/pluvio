import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

const Protected = ({children}) => {
    const user = useSelector(selectUser);
    if (!user) {
        return <Navigate to="/" replace />;
    }
        return children;
    };
export default Protected;
