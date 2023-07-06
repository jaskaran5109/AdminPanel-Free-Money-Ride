import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAppUsers } from '../redux/actions/admin'

const Users = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.admin)
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const getAllUsers = () => {
        dispatch(getAllAppUsers())
    }
    const deleteUserHandler = async (id) => {
        setLoading(true)
        try {
            const result = window.confirm('Are you sure you want to delete the User?');
            if (result) {
                const { data } = await axios.delete(
                    `http://localhost:4000/api/user/${id}`);
                setLoading(false)
            }
        } catch (error) {
            setLoading(true)
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [loading])
    console.log(user);
    return (
        <Grid minH="100vh" templateColumns={['1fr']}>
            <Box p={['0', '8']} overflow="auto">
                <Heading
                    textTransform={'uppercase'}
                    my="10"
                    textAlign={['center', 'left']}
                >
                    All App Users
                </Heading>
                <TableContainer w={['100vw', 'full']}>
                    <Table variant="simple" size="lg">
                        <TableCaption>
                            All available Users in the Database
                        </TableCaption>
                        <Thead>
                            <Tr>
                                {/* <Th>Id</Th> */}
                                <Th>Name</Th>
                                <Th>Eamil</Th>
                                <Th>Phone No.</Th>
                                <Th>Date Of Birth</Th>
                                <Th>Gender</Th>
                                {/* <Th isNumeric>Action</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {user && user.map(
                                item =>
                                (
                                    <Row
                                        item={item}
                                        key={item._id}
                                        deleteUserHandler={deleteUserHandler}
                                    />
                                )
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            {/* <Sidebar /> */}
        </Grid>
    )
}

export default Users


function Row({ item, loading, deleteUserHandler }) {
    return (
        <Tr>
            {/* <Td>#{item._id}</Td> */}
            <Td style={{textTransform:"capitalize"}}>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.phoneNumber}</Td>
            <Td>{item.dateOfBirth}</Td>
            <Td style={{textTransform:"capitalize"}}>{item.gender}</Td>
            {/* <Td isNumeric>
                <HStack justifyContent="flex-end">
                    <Button
                        isLoading={loading}
                        color="puprle.600"
                        onClick={() => deleteUserHandler(item._id)}
                    >
                        <AiFillDelete />
                    </Button>
                </HStack>
            </Td> */}
        </Tr>
    );
}