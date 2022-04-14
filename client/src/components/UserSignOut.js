import { useEffect } from 'react';
import { useUpdateData } from './Context';
import { useNavigate } from 'react-router-dom';

//signs current user out and navigates back to list of courses
const UserSignOut = () => {
    const {signOut} = useUpdateData();
    let navigate = useNavigate();
    


    useEffect( () => {

        const signOutUser = async () => {
            await signOut();
            navigate('/')
            return null;
        }
        signOutUser();
    }, [])

    return null;

}

export default UserSignOut;