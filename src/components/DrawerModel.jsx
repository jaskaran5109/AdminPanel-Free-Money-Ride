import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Button,
    List,
    ListItem,
    ListIcon,
    IconButton,
    Divider,
    useColorModeValue,
    Heading,
    Grid,
    GridItem,
    Box,
    Text
} from '@chakra-ui/react'
import { BiSolidDashboard } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineAlignCenter } from 'react-icons/ai'
import { RiTaskFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/user'


export const DrawerModel = ({ isAuthenticated, user }) => {
    const dispatch = useDispatch()
    const { users, loading, error, message } = useSelector(state => state.user);
    const SwitchIcon = useColorModeValue(AiOutlineAlignCenter, AiOutlineAlignCenter);
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleLogout = () => {
        dispatch(logout())
        onClose()
    }
    const handleLogin = () => {
        navigate("/login")
        onClose()
    }
    const handleSignIn = () => {
        navigate("/register")
        onClose()
    }
    return (
        <div style={{ margin: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton
                colorScheme='yellow'
                variant={'outline'}
                aria-label='Call Segun'
                size='lg'
                icon={<SwitchIcon />}
                onClick={onOpen}
            />
            <Heading>Free Money Ride</Heading>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}

            >
                <DrawerOverlay />
                <DrawerContent>
                    {/* <DrawerCloseButton /> */}
                    <DrawerHeader> {isAuthenticated && <Text>Hey, {`${user && user.name}`}</Text>}</DrawerHeader>
                    <Divider />
                    <DrawerBody >
                        <List spacing={3} style={{ display: "flex", flexDirection: "column", margin: 5 }}>
                            <Button onClick={() => {
                                navigate("/")
                                onClose()
                            }}>
                                <ListItem style={{ marginRight: "auto", alignItems: "baseline" }}>
                                    <ListIcon as={BiSolidDashboard} color='green.500' style={{ marginRight: "15px", fontSize: 18 }} />
                                    Dashboard
                                </ListItem>
                            </Button>
                            <Button onClick={() => {
                                navigate("/offer")
                                onClose()
                            }}>
                                <ListItem style={{ marginRight: "auto" }}>
                                    <ListIcon as={RiTaskFill} color='green.500' style={{ marginRight: "15px", fontSize: 18 }} />
                                    Create Offer
                                </ListItem>
                            </Button>
                            <Button onClick={() => {
                                navigate("/users")
                                onClose()
                            }}>
                                <ListItem style={{ marginRight: "auto" }}>
                                    <ListIcon as={FaUserAlt} color='green.500' style={{ marginRight: "17px", fontSize: 16 }} />
                                    App Users
                                </ListItem>
                            </Button>
                            {user && user.role === "admin" && (<Button onClick={() => {
                                navigate("/admin-users")
                                onClose()
                            }}>
                                <ListItem style={{ marginRight: "auto" }}>
                                    <ListIcon as={FaUserAlt} color='green.500' style={{ marginRight: "17px", fontSize: 16 }} />
                                    Admin Users
                                </ListItem>
                            </Button>)}

                        </List>
                    </DrawerBody>
                    <Divider />
                    <DrawerFooter>
                        {isAuthenticated ? (<Box>
                            <Grid templateColumns='repeat(1, 1fr)' gap={6}>
                                <GridItem w='100%'>
                                    <Button colorScheme={'yellow'} variant="solid" onClick={handleLogout} isLoading={loading}>
                                        Logout
                                    </Button>
                                </GridItem>
                            </Grid>
                        </Box>) : (<Box>
                            <Grid templateColumns='repeat(3, 1fr)' gap={6} textAlign={'center'} alignItems={'center'}>
                                <GridItem w='100%'>
                                    <Button colorScheme={'yellow'} variant="solid" onClick={handleLogin}>
                                        Login
                                    </Button>
                                </GridItem>
                                <GridItem w='100%'>
                                    <Text>OR</Text>
                                </GridItem>
                                <GridItem w={'100%'}>
                                    <Button colorScheme={'yellow'} variant="solid" onClick={handleSignIn}>
                                        Sign Up
                                    </Button>
                                </GridItem>
                            </Grid>
                        </Box>)
                        }
                    </DrawerFooter>
                </DrawerContent >
            </Drawer >
            <ColorModeSwitcher />
        </div >
    )
}
