import { Button, FormControl, FormLabel, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { sendNotification } from '../redux/actions/admin';
import { useDispatch } from 'react-redux';

const NotificationPopOver = () => {
    const dispatch=useDispatch()

    const { onOpen, onClose, isOpen } = useDisclosure()

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleNotification = () => {
        onClose()
        if (!title || !body) {
            return toast.error("Title and Message cannot be empty")
        }
        dispatch(sendNotification(title, body, imageUrl))
        toast.success("Notification Sent Successfully!")
        setTitle('')
        setBody('')
        setImageUrl('')
    }

    return (
        <Popover placement='right' isOpen={isOpen} onOpen={onOpen}
            onClose={onClose}>
            <PopoverTrigger>
                <Button>SEND NOTIFICATION</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Please Enter Details</PopoverHeader>
                <PopoverBody>
                    <FormControl mb={4}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter the title"
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Message</FormLabel>
                        <Input
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter the message"
                        />
                    </FormControl>

                    {/* <FormControl mb={4}>
                        <FormLabel>Image URL(optional)</FormLabel>
                        <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter the image URL"
                        />
                    </FormControl> */}
                </PopoverBody>
                <PopoverFooter>
                    <Button colorScheme="blue" onClick={handleNotification}>
                        SEND
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
}

export default NotificationPopOver