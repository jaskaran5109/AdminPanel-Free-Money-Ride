import { Box, Button, Grid, HStack, Heading, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAppUsers } from '../redux/actions/admin'
import { JsonToExcel } from 'react-json-to-excel'
import { BiSearchAlt } from 'react-icons/bi'

const Users = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.admin)
    const [loading, setLoading] = useState(false)

    const [searchName, setSearchName] = useState('');
    const [searchUserId, setSearchUserId] = useState('');

    const getAllUsers = () => {
        dispatch(getAllAppUsers())
    }
    const deleteUserHandler = async (id) => {
    }
    useEffect(() => {
        getAllUsers()
    }, [loading])
    return (
        <Grid minH="100vh" templateColumns={['1fr']}>
            <Box p={['0', '8']} overflow="auto">
                <HStack style={{ justifyContent: "space-between" }}>
                    <Heading
                        textTransform={'uppercase'}
                        my="10"
                        textAlign={['center', 'left']}
                    >
                        All App Users
                    </Heading>
                    <Button> <JsonToExcel
                        title="Download Users"
                        data={user}
                        fileName="UsersList"
                        btnClassName="download-btn"
                        style={{ backgroundColor: "white" }}
                    /></Button>
                </HStack>
                <HStack style={{ alignItems: "center", marginBottom: 15 }}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BiSearchAlt color="gray.300" />}
                        />
                        <Input
                            type="text"
                            placeholder="Search by User Name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BiSearchAlt color="gray.300" />}
                        />
                        <Input
                            type="text"
                            placeholder="Search by User ID"
                            value={searchUserId}
                            onChange={(e) => setSearchUserId(e.target.value)}
                        />
                    </InputGroup>
                </HStack>
                <TableContainer w={['100vw', 'full']}>
                    <Table variant="simple" size="lg">
                        <TableCaption>
                            All available Users in the Database
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Eamil</Th>
                                <Th>Phone No.</Th>
                                <Th>Date Of Birth</Th>
                                <Th>Gender</Th>
                                {/* <Th isNumeric>Action</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {user && user.filter(
                                (item) =>
                                    item.name.toLowerCase().includes(searchName.toLowerCase()) &&
                                    item._id.toLowerCase().includes(searchUserId.toLowerCase())
                            ).map(
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
            <Td>#{item._id}</Td>
            <Td style={{ textTransform: "capitalize" }}>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.phoneNumber}</Td>
            <Td>{item.dateOfBirth}</Td>
            <Td style={{ textTransform: "capitalize" }}>{item.gender}</Td>
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