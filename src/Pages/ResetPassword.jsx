import { useEffect, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Stack, Container } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/actions/user';
import { duration } from 'moment/moment';

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { error, message, loading } = useSelector((state) => state.user)
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            dispatch(resetPassword(token, newPassword));
            navigate("/passwordchangedsuccessfully")
            toast.success("Please return to the app and login with your new password.",{ duration: "1000" })
            toast.success("Hurray! Password changed successfully")
        } else {
            toast.error("Pasword does not match!")
        }
    };

    return (
        <Container height={'95vh'} >
            <Box p={4} justifyContent="center" marginTop={100}>
                <Heading as="h1" mb={6}>
                    Reset Password
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="newPassword" isRequired>
                            <FormLabel>New Password</FormLabel>
                            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        </FormControl>
                        <Button type="submit" colorScheme="blue">
                            Reset Password
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
};

export default ResetPassword;
