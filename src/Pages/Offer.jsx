import { Avatar, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Grid, GridItem, HStack, Heading, Image, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Select, Stack, Switch, Table, TableCaption, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { countryListAllIsoData } from '../GeoData'
import { server } from '../redux/store'
import { Badge } from '@chakra-ui/react'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast';
import { JsonToExcel } from "react-json-to-excel";
import './Offer.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOffers, updateOffer } from '../redux/actions/admin'

const Offer = () => {
    const dispatch = useDispatch()
    const { offers, loading: loading2 } = useSelector((state) => state.admin)
    const MAX_CELL_LENGTH = 30; // Maximum length of cell content before showing three dots

    const truncateCellContent = (content) => {
        if (content.length > MAX_CELL_LENGTH) {
            return `${content.substring(0, MAX_CELL_LENGTH)}...`;
        }
        return content;
    };

    const [searchName, setSearchName] = useState('');
    const [searchAdvertiserId, setSearchAdvertiserId] = useState('');



    const { isOpen, onClose, onOpen } = useDisclosure();
    const [offerId, setOfferId] = useState('');
    const [offerName, setOfferName] = useState('');
    const [landingPage, setLandingPage] = useState('');
    const [logo, setLogo] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [offerLink, setOfferLink] = useState('');
    const [po, setPo] = useState(0);
    const [appDescription, setAppDescription] = useState('');
    const [task, setTask] = useState('');
    const [geo, setGeo] = useState('');
    const [externalId, setExternalId] = useState('');
    const [advertiser, setAdvertiser] = useState('');
    const [isTrue, setIsTrue] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [os, setOs] = useState('');
    const [loading, setLoading] = useState(false)
    const [expiryDate, setExpiryDate] = useState('');
    const [conversionLimit, setConversionLimit] = useState(0);
    const handleDateChange = (e) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setExpiryDate(newDate);
    }

    useEffect(() => {
        dispatch(getAllOffers())
    }, [loading2, isTrue])
    useEffect(() => {
        setIsEnabled(isTrue === 'true' ? true : false)
    }, [isTrue])
    const offerDetailsHandler = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.get(
                `${server}/offer/${id}`);
            setLoading(false)
            setOfferId(id)
            setOfferName(data.Offer.offerName)
            setLandingPage(data.Offer.landingPage)
            setCoverImage(data.Offer.coverImage)
            setOfferLink(data.Offer.offerLink)
            setAppDescription(data.Offer.appDescription)
            setLogo(data.Offer.logo)
            setPo(data.Offer.po)
            setTask(data.Offer.task)
            setAdvertiser(data.Offer.advertiser)
            setGeo(data.Offer.geo)
            setExternalId(data.Offer.externalId)
            setIsTrue(data.Offer.isEnabled ? "true" : "false")
            setIsEnabled(data.Offer.isEnabled)
            setOs(data.Offer.os)
            setConversionLimit(data.Offer.conversionLimit)
            setExpiryDate(data.Offer.expiryDate)
            toast.success("Offer Details");
            onOpen()
        } catch (error) {
            setLoading(true)
            console.log(error)
        }
    }
    const deleteOfferHandler = async (id) => {
        setLoading(true)
        try {
            const result = window.confirm('Are you sure you want to delete the offer?');
            if (result) {
                const { data } = await axios.delete(
                    `${server}/offer/${id}`);
                setLoading(false)
                toast.success("Offer deleted successfully!");
            }
        } catch (error) {
            setLoading(true)
            toast.error(error);
        }
    }
    const updateOfferHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            dispatch(updateOffer(offerId, offerName,
                landingPage,
                logo,
                coverImage,
                offerLink,
                po,
                appDescription,
                task,
                geo,
                externalId,
                advertiser,
                isEnabled,
                os,
                conversionLimit,
                expiryDate))
            setLoading(false)
            toast.success("Offer updated successfully");
        } catch (error) {
            setLoading(false)
            toast.error(error);
        }

        onClose()
    }
    const navigate = useNavigate()


    return (
        <Grid minH="100vh" templateColumns={['1fr']}>
            <Box p={['0', '8']} overflow="auto">
                <HStack style={{ justifyContent: "space-between" }}>
                    <Heading
                        textTransform={'uppercase'}
                        my="10"
                        textAlign={['center', 'left']}
                    >
                        All Offers
                    </Heading>
                    <HStack><Button
                        isLoading={loading}
                        color="yellow.300"
                        variant={'solid'}
                        onClick={() => navigate("/offer")}
                    >
                        Add Offer
                    </Button>
                        <Button> <JsonToExcel
                            title="Download Offers"
                            data={offers}
                            fileName="OffersList"
                            btnClassName="download-btn"
                            style={{ backgroundColor: "white" }}
                        /></Button></HStack>

                </HStack>
                <HStack style={{ alignItems: "center",marginBottom:15 }}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BiSearchAlt color="gray.300" />}
                        />
                        <Input
                            type="text"
                            placeholder="Search by Offer Name"
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
                            placeholder="Search by External ID"
                            value={searchAdvertiserId}
                            onChange={(e) => setSearchAdvertiserId(e.target.value)}
                        />
                    </InputGroup>
                </HStack>
                <TableContainer w={['100vw', 'full']}>
                    <Table variant="simple" size="md">
                        <TableCaption>
                            All available Offers in the Database
                        </TableCaption>
                        <Thead>
                            <Tr >
                                <Th>Status</Th>
                                <Th>Name</Th>
                                <Th>Poster</Th>
                                <Th isNumeric>PO</Th>
                                <Th isNumeric>External ID</Th>
                                <Th>Advertiser</Th>
                                {/* <Th>App Desc</Th> */}
                                <Th width={'150px'}>Task</Th>
                                <Th>Geo</Th>
                                <Th isNumeric>Cap</Th>
                                <Th>OS</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {offers && offers.filter(
                                (item) =>
                                    item.offerName.toLowerCase().includes(searchName.toLowerCase()) &&
                                    item.externalId.toLowerCase().includes(searchAdvertiserId.toLowerCase())
                            ).map(
                                item =>
                                (
                                    <Row
                                        key={item._id}
                                        item={item}
                                        offerDetailsHandler={offerDetailsHandler}
                                        deleteOfferHandler={deleteOfferHandler}
                                        loading={loading}
                                        truncateCellContent={truncateCellContent}
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
                        <DrawerHeader>Money Free Ride</DrawerHeader>
                        <Divider />
                        <DrawerBody>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: '20px' }}>

                                <Avatar name={`${offerName}`} src={`${logo}`} size='xl' />
                            </div>
                            <Box p={4}>
                                <form onSubmit={updateOfferHandler}>
                                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                        <GridItem w='100%'>
                                            <FormLabel>Name</FormLabel>
                                            <Input value={offerName} onChange={(e) => setOfferName(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Logo</FormLabel>
                                            <Input value={logo} onChange={(e) => setLogo(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>PO</FormLabel>
                                            <Input type='number' value={po} onChange={(e) => setPo(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Landing Page</FormLabel>
                                            <Input value={landingPage} onChange={(e) => setLandingPage(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Cover Image</FormLabel>
                                            <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Offer Link</FormLabel>
                                            <Input value={offerLink} onChange={(e) => setOfferLink(e.target.value)} />
                                        </GridItem>

                                    </Grid>

                                    <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={5}>
                                        <GridItem w='100%'>
                                            <FormLabel>Geo</FormLabel>
                                            <Select
                                                placeholder="Select a Geo location"
                                                value={geo}
                                                onChange={(e) => setGeo(e.target.value)}
                                            >
                                                {countryListAllIsoData.map((location) => (
                                                    <option key={location.name} value={location.name}>
                                                        {location.name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>External ID</FormLabel>
                                            <Input value={externalId} onChange={(e) => setExternalId(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Expiry Date</FormLabel>
                                            <Input type="date"
                                                value={expiryDate}
                                                min={moment().format('YYYY-MM-DD')}
                                                onChange={handleDateChange} />
                                        </GridItem>


                                    </Grid>
                                    <Grid templateColumns='repeat(1, 1fr)' gap={6} mt={5}>
                                        <GridItem w='100%'>
                                            <FormLabel>App Desc</FormLabel>
                                            <Textarea value={appDescription} onChange={(e) => setAppDescription(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Task</FormLabel>
                                            <Textarea value={task} onChange={(e) => setTask(e.target.value)} />
                                        </GridItem>
                                    </Grid>
                                    <Grid templateColumns='repeat(2, 1fr)' gap={6} mt={5}>

                                        <GridItem w='100%'>
                                            <FormLabel>Advertiser</FormLabel>
                                            <Input value={advertiser} onChange={(e) => setAdvertiser(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Status</FormLabel>
                                            <RadioGroup onChange={(value) => setIsTrue(value)} value={isTrue}>
                                                <Stack direction="row" display="flex" justifyContent={'flex-start'} alignItems={'center'}>
                                                    <Radio size="lg" value={'true'}>
                                                        Active
                                                    </Radio>
                                                    <Radio size="lg" value={'false'}>
                                                        Not Active
                                                    </Radio>
                                                </Stack>

                                            </RadioGroup>
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Conversion Limit</FormLabel>
                                            <Input value={conversionLimit} onChange={(e) => setConversionLimit(e.target.value)} />
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <FormLabel>Operating System</FormLabel>
                                            <Select
                                                placeholder="Select an operating system"
                                                value={os}
                                                onChange={(e) => setOs(e.target.value)}
                                            >
                                                <option value="Android">Android</option>
                                                <option value="Iphone">Iphone</option>
                                                <option value="Ipad">Ipad</option>
                                                <option value="Windows Phone">Windows Phone</option>
                                            </Select>
                                        </GridItem>

                                    </Grid>
                                    <Grid templateColumns='repeat(1, 1fr)' gap={6} mt={5}>
                                        <GridItem w='100%'>
                                            <Button isLoading={loading} variant='solid' type="submit" mr={3} width={'100%'} marginTop={"20px"} color={'yellow.300'}>
                                                SUBMIT
                                            </Button>
                                        </GridItem>

                                    </Grid>
                                </form>


                            </Box>
                        </DrawerBody>

                        <DrawerFooter>

                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Grid>
    )
}

export default Offer


function Row({ item, offerDetailsHandler, loading, deleteOfferHandler, truncateCellContent }) {
    return (
        <Tr>
            {/* <Td>{item.isEnabled === true ? "Active" : "Not Active"}</Td> */}
            <Td><Badge style={{ padding: "5px" }} colorScheme={item.isEnabled === true ? "green" : "red"}>{item.isEnabled === true ? "Active" : "Not Active"}</Badge></Td>
            <Td>{item.offerName}</Td>
            <Td>
                <Image src={`${item.logo}`} style={{ resize: 'inherit' }} />
            </Td>
            <Td>{item.po}</Td>
            <Td>{item.externalId}</Td>
            <Td>{item.advertiser}</Td>
            {/* <Td>{truncateCellContent(item.appDescription)}</Td> */}
            <Td>{truncateCellContent(item.task)}</Td>
            <Td>{item.geo}</Td>
            <Td>{item.conversionLimit}</Td>
            <Td>{item.os}</Td>
            <Td isNumeric>
                <HStack justifyContent="flex-end">
                    <Button
                        variant="outline"
                        color="puprle.500"
                        onClick={() => offerDetailsHandler(item._id)}
                        isLoading={loading}
                    >
                        <AiTwotoneEdit />
                    </Button>
                    <Button
                        isLoading={loading}
                        color="puprle.600"
                        onClick={() => deleteOfferHandler(item._id)}
                    >
                        <AiFillDelete />
                    </Button>
                </HStack>
            </Td>
        </Tr>
    );
}