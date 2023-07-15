import { Avatar, Box, Button, FormControl, FormLabel, Grid, GridItem, Heading, Input, Radio, RadioGroup, Select, Stack, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { countryListAllIsoData } from '../GeoData';
import { server } from '../redux/store';
import moment from 'moment';
import { toast } from 'react-hot-toast';

const CreateOffer = () => {
    const navigate = useNavigate()
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
    const [isTrue, setIsTrue] = useState('false');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isTrue2, setIsTrue2] = useState('false');
    const [isShopping, setIsShopping] = useState(false);
    const [os, setOs] = useState('');
    const [loading, setLoading] = useState(false)
    const [expiryDate, setExpiryDate] = useState(moment().format('YYYY-MM-DD'));
    const [conversionLimit, setConversionLimit] = useState(0);
    const handleDateChange = (e) => {
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setExpiryDate(newDate);
    }
    useEffect(() => {
        setIsEnabled(isTrue === 'true' ? true : false)
    }, [isTrue])

    useEffect(() => {
        setIsShopping(isTrue2 === 'true' ? true : false)
    }, [isTrue2])

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                `${server}/offer`,
                {
                    offerName,
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
                    isShopping,
                    os,
                    conversionLimit,
                    expiryDate
                },
                config
            );
            toast.success("Offer Created successfully!");
            setLoading(false)
            navigate("/")

        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <div style={{ marginLeft: "10%", marginRight: "10%", marginBottom: "50px" }}>
            <Heading style={{ textAlign: "center", margin: "20px", fontSize: "30px", textTransform: "uppercase" }}>Add Offer</Heading>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: '20px' }}>

                {logo && <Avatar name={`${offerName}`} src={`${logo}`} size='xl' />}
            </div>
            <Box p={4}>
                <form onSubmit={submitHandler}>
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
                            <FormLabel>Shopping</FormLabel>
                            <RadioGroup onChange={(value) => setIsTrue2(value)} value={isTrue2}>
                                <Stack direction="row" display="flex" justifyContent={'flex-start'} alignItems={'center'}>
                                    <Radio size="lg" value={'true'}>
                                        Yes
                                    </Radio>
                                    <Radio size="lg" value={'false'}>
                                        No
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
        </div>
    )
}

export default CreateOffer
