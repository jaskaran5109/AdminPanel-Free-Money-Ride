import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserReport } from '../redux/actions/admin'
import { Box, HStack, Heading, Input, InputGroup, InputLeftElement, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { BiSearchAlt } from 'react-icons/bi'

const OfferReport = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { loading, reports } = useSelector((state) => state.admin)
    useEffect(() => {
        dispatch(getUserReport(startDate, endDate, id, ""))
    }, [dispatch, startDate, endDate])
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
        <Box>
            <Heading style={{ textAlign: "left", margin: "20px", fontSize: "30px", textTransform: "uppercase" }}>Offer Reports</Heading>
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
                        {(!loading && reports === null) ? <h1>No report Found</h1> : !loading && <h1>Offer Reports</h1>}
                        {loading && <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" alignSelf={"center"}>
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

                        {!loading && reports !== null && reports && reports
                            .slice()
                            .sort((a, b) => new Date(a.Date) - new Date(b.Date))
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
                        <Td>{!loading && reports !== null && reports && <p style={{ fontWeight: "bold" }}>Total Affiliate Price : {calculateSumOfPrice(!loading && reports !== null && reports && reports)}</p>}</Td>
                        <Td>{!loading && reports !== null && reports && <p style={{ fontWeight: "bold" }}>Total Conversions : {calculateSumOfConversion(!loading && reports !== null && reports && reports)}</p>}</Td>
                        <Td></Td>
                        <Td></Td>
                    
                    </Tr>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default OfferReport



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