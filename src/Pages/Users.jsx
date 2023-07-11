import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Spinner, DrawerOverlay, Grid, HStack, Heading, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSolidUserDetail } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAppUsers, getUserReport } from '../redux/actions/admin'
import { JsonToExcel } from 'react-json-to-excel'
import { BiSearchAlt } from 'react-icons/bi'

const Users = () => {
    const dispatch = useDispatch();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { user, reports, loading: reportLoading, appUserloading } = useSelector((state) => state.admin)
    const [loading, setLoading] = useState(false)

    const [searchName, setSearchName] = useState('');
    const [searchUserId, setSearchUserId] = useState('');


    const [offerName, setOfferName] = useState('');
    const [offerId, setOfferId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userId, setUserId] = useState('')

    const getAllUsers = () => {
        dispatch(getAllAppUsers())
        onClose()
    }
    useEffect(() => {
        getUserReports(userId)
    }, [startDate, endDate])
    const getUserReports = (id) => {
        setUserId(id)
        dispatch(getUserReport(startDate, endDate, "", id))
        onOpen()
    }
    useEffect(() => {
        getAllUsers()
    }, [loading])
    const calculateSumOfPrice = (data) => {
        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += data[i]?.Affiliate_Price;
        }

        return sum;
    };
    const calculateSumOfConversion = (data) => {
        let sum = 0;

        for (let i = 0; i < data.length; i++) {
            sum += data[i]?.Conversions;
        }

        return sum;
    };
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

                            {!appUserloading && <h1>All available Users in the Database</h1>}
                            {appUserloading && <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" alignSelf={"center"}>
                                <Spinner size="xl" />
                            </Box>}
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Eamil</Th>
                                <Th>Phone No.</Th>
                                <Th>Date Of Birth</Th>
                                <Th>Gender</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!appUserloading && user && user.filter(
                                (item) =>
                                    item.name.toLowerCase().includes(searchName.toLowerCase()) &&
                                    item._id.toLowerCase().includes(searchUserId.toLowerCase())
                            ).map(
                                item =>
                                (
                                    <Row
                                        item={item}
                                        key={item._id}
                                        getUserReports={getUserReports}
                                    />
                                )
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>


                <Drawer
                    isOpen={isOpen}
                    size={"full"}
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Free Money Ride</DrawerHeader>
                        <Divider />
                        <DrawerBody>
                            <Box>
                                <Heading style={{ textAlign: "left", margin: "20px", fontSize: "30px", textTransform: "uppercase" }}>User Reports</Heading>
                                <HStack style={{ alignItems: "center", margin: 20 }}>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<BiSearchAlt color="gray.300" />}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Search by External Id"
                                            value={offerId}
                                            onChange={(e) => setOfferId(e.target.value)}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<BiSearchAlt color="gray.300" />}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Search by Offer Name"
                                            value={offerName}
                                            onChange={(e) => setOfferName(e.target.value)}
                                        />
                                    </InputGroup>
                                </HStack>
                                <HStack style={{ alignItems: "center", margin: 20, justifyContent: "space-between" }}>
                                    <VStack style={{ flex: 1 }}>
                                        <h1 style={{ marginRight: "auto" }}>Start Date</h1>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<BiSearchAlt color="gray.300" />}
                                            />
                                            <Input
                                                type="date"
                                                placeholder="Search by Start Date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </VStack>
                                    <VStack style={{ flex: 1 }}>
                                        <h1 style={{ marginRight: "auto" }}>End Date</h1>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<BiSearchAlt color="gray.300" />}
                                            />
                                            <Input
                                                type="date"
                                                placeholder="Search by End Date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </InputGroup>
                                    </VStack>
                                </HStack>
                                <TableContainer w={['100vw', 'full']}>
                                    <Table variant="simple" size="lg">
                                        <TableCaption>
                                            {(!reportLoading && reports === null) ? <h1>No report Found</h1> : !reportLoading && <h1>User Reports</h1>}
                                            {reportLoading && <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" alignSelf={"center"}>
                                                <Spinner size="xl" />
                                            </Box>}
                                        </TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th>User ID</Th>
                                                <Th>External ID</Th>
                                                <Th>Offer Name</Th>
                                                <Th>Affiliate Price</Th>
                                                <Th>Conversions</Th>
                                                <Th>Clicks</Th>
                                                <Th style={{ textAlign: "center" }}>Date <br />(yyyy/mm/dd)</Th>
                                            </Tr>

                                        </Thead>
                                        <Tbody>

                                            {!reportLoading && reports !== null && reports && reports
                                                .slice()
                                                .sort((a, b) => new Date(a.Date) - new Date(b.Date))
                                                .filter(
                                                    (item) =>
                                                        item.OfferID.toString().includes(offerId.toString()) &&
                                                        item.OfferName.toLowerCase().includes(offerName.toLowerCase()))
                                                .map(
                                                    item =>
                                                    (
                                                        <ReportRow
                                                            item={item}
                                                            key={item._id}
                                                        />
                                                    )
                                                )}
                                        </Tbody>
                                        <Tr>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td></Td>
                                            <Td>{!reportLoading && reports !== null && reports && <p style={{ fontWeight: "bold" }}>Total Affiliate Price : {calculateSumOfPrice(!reportLoading && reports !== null && reports && reports)}</p>}</Td>
                                            <Td>{!reportLoading && reports !== null && reports && <p style={{ fontWeight: "bold" }}>Total Conversions : {calculateSumOfConversion(!reportLoading && reports !== null && reports && reports)}</p>}</Td>
                                            <Td></Td>
                                            <Td></Td>
                                        </Tr>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </DrawerBody>

                        <DrawerFooter>

                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>

            {/* <Sidebar /> */}
        </Grid>
    )
}

export default Users


function Row({ item, loading, getUserReports }) {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td style={{ textTransform: "capitalize" }}>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.phoneNumber}</Td>
            <Td>{item.dateOfBirth}</Td>
            <Td style={{ textTransform: "capitalize" }}>{item.gender}</Td>
            <Td isNumeric>
                <HStack justifyContent="flex-end">
                    <Button
                        isLoading={loading}
                        color="puprle.600"
                        onClick={() => getUserReports(item._id)}
                    >
                        <BiSolidUserDetail />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    );
}

function ReportRow({ item }) {
    return (
        <Tr>
            <Td>#{item.Aff_Sub_2}</Td>
            <Td>{item.OfferID}</Td>
            <Td>{item.OfferName}</Td>
            <Td>{item.Affiliate_Price}</Td>
            <Td>{item.Conversions}</Td>
            <Td>{item.Clicks}</Td>
            <Td>{item.Date}</Td>
        </Tr>
    );
}