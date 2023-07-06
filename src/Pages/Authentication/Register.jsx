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
import { register } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';

export const Register = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { users, loading, error, message } = useSelector(state => state.user);


    const submitHandler = e => {
        e.preventDefault();
        dispatch(register(name, email, password));
    };
    return (
        <Container>
            <VStack height={'full'} justifyContent="center" spacing="6" my={'70'}>
                <Heading textTransform={'uppercase'}>Registration</Heading>
                <form style={{ width: '100%' }} onSubmit={submitHandler}>
                    <Box my={'2'}>
                        <FormLabel htmlFor="name" children={'UserName'} />
                        <Input
                            required
                            type={'text'}
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your name"
                            focusBorderColor="yellow.500"
                        />
                    </Box>
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
                        Sign Up
                    </Button>
                    <Box my={'4'}>
                        Already a User?{' '}
                        <Link to="/login">
                            <Button colorScheme={'yellow'} variant="link">
                                Login
                            </Button>
                        </Link>{' '}
                        here
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}
