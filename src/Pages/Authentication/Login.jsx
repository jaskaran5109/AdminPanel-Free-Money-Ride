import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
    const dispatch = useDispatch();
    const { users, loading, error, message } = useSelector(state => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitHandler = e => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <Container height={'95vh'}>
            <VStack height={'full'} justifyContent="center" spacing="3">
                <Heading>Welcome To Our Admin Panel</Heading>
                <form style={{ width: '100%' }} onSubmit={submitHandler}>
                    <Box my={'4'}>
                        <FormLabel htmlFor="email" children={'Email Address'} />
                        <Input
                            type="email"
                            required
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            focusBorderColor="yellow.500"
                            textTransform={'lowercase'}
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor="password" children={'Password'} />
                        <Input
                            type="password"
                            required
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            focusBorderColor="yellow.500"
                        />
                    </Box>
                    <Button my={'4'} colorScheme={'yellow'} type="submit" isLoading={loading}>
                        Login
                    </Button>
                    <Box my={'4'}>
                        New User?{' '}
                        <Link to="/register">
                            <Button colorScheme={'yellow'} variant="link">
                                Sign Up
                            </Button>
                        </Link>{' '}
                        here
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}
