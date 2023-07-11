import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const PasswordChangedPage = () => {
    return (
        <Box height="100vh" style={{
            backgroundImage: "url('https://i.pinimg.com/originals/12/4d/e3/124de3d1b5e12f1d8fcec1685e634361.gif')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <Center height="60%" flexDir="column">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.img
                        src="https://media.tenor.com/VgCDirag6VcAAAAi/party-popper-joypixels.gif"
                        alt="Confetti"
                        style={{ width: '400px', marginBottom: '2rem' }}
                    />
                </motion.div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Heading as="h1" size="2xl" color="white" fontFamily="sans-serif" fontWeight="bold" style={{color:"black"}}>
                        Hurray!
                    </Heading>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ textAlign: "center" }}
                >
                    <Text color="white" fontSize="xl" fontFamily="sans-serif" fontWeight="bold" marginTop={10} style={{color:"black"}}>
                        Password Changed Successfully !!
                    </Text>

                    <Text color="white" fontSize="xl" fontFamily="sans-serif" fontWeight="bold" marginTop={5} style={{color:"black"}}>
                        Please return to the app and login with your new password
                    </Text>
                </motion.div>

            </Center>
        </Box>
    );
};

export default PasswordChangedPage;
