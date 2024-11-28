import {
    Box,
    Text,
    Heading,
    VStack,
    Icon,
    Stack,
    Flex,
} from "@chakra-ui/react";
import { FaTags, FaSearch, FaBell, FaSync, FaPalette } from "react-icons/fa";
import InternalPageHero from "../components/InternalPageHero";

const About = () => {

    const primaryColor = "orange"

    return (
        <>
            <InternalPageHero title="About Jupiter Jots" description="Learn more about Jupiter Jots Bookmarking Extension" />
            <Box bg="gray.50" _dark={{
                bg: "black"
            }} minH="100vh" py={10} px={6}>
                <VStack gap={6} textAlign="center" mb={12}>
                    <Heading as="h1" size="2xl" color={`${primaryColor}.500`}>
                        About Jupiter Jots
                    </Heading>
                    <Text fontSize="lg" maxW="800px">
                        Jupiter Jots is your universal bookmarking assistant, designed to
                        simplify your digital life. With powerful tools to save, organize, and
                        personalize your favorite web content, it’s the ultimate extension for
                        seamless web content management.
                    </Text>
                </VStack>

                <Stack gap={10} maxW="800px" mx="auto">
                    <Flex bg="white" _dark={{
                        bg: 'blackAlpha.400',
                        shadow: "xs"
                    }} p={8} rounded="lg" shadow="md">
                        <Icon boxSize={10} color={`${primaryColor}.400`} mr={4}>
                            <FaTags />
                        </Icon>
                        <Box>
                            <Heading as="h3" size="md" color={`${primaryColor}.600`}>
                                Tags for Organization
                            </Heading>
                            <Text mt={2} color="gray.600">
                                Categorize your bookmarks effortlessly with custom tags, making
                                them easier to find and manage.
                            </Text>
                        </Box>
                    </Flex>

                    <Flex bg="white" _dark={{
                        bg: 'blackAlpha.400',
                        shadow: "xs"
                    }} p={8} rounded="lg" shadow="md">
                        <Icon boxSize={10} color={`${primaryColor}.400`} mr={4}>
                            <FaSearch />
                        </Icon>
                        <Box>
                            <Heading as="h3" size="md" color={`${primaryColor}.600`}>
                                Advanced Search
                            </Heading>
                            <Text mt={2} color="gray.600">
                                Quickly locate your saved pages with robust search capabilities
                                using titles, tags, or notes.
                            </Text>
                        </Box>
                    </Flex>

                    <Flex bg="white" _dark={{
                        bg: 'blackAlpha.400',
                        shadow: "xs"
                    }} p={8} rounded="lg" shadow="md">
                        <Icon boxSize={10} color={`${primaryColor}.400`} mr={4}>
                            <FaPalette />
                        </Icon>
                        <Box>
                            <Heading as="h3" size="md" color={`${primaryColor}.600`}>
                                Customizable Visuals
                            </Heading>
                            <Text mt={2} color="gray.600">
                                Personalize your bookmarks with images, icons, and color-coded
                                tags for a visually appealing experience.
                            </Text>
                        </Box>
                    </Flex>

                    <Flex bg="white" _dark={{
                        bg: 'blackAlpha.400',
                        shadow: "xs"
                    }} p={8} rounded="lg" shadow="md">
                        <Icon boxSize={10} color={`${primaryColor}.400`} mr={4}>
                            <FaSync />
                        </Icon>
                        <Box>
                            <Heading as="h3" size="md" color={`${primaryColor}.600`}>
                                Cross-Platform Integration <Text as="span" fontSize="sm">(Coming Soon)</Text>
                            </Heading>
                            <Text mt={2} color="gray.600">
                                Sync your bookmarks seamlessly across all your devices for
                                accessibility anywhere.
                            </Text>
                        </Box>
                    </Flex>

                    <Flex bg="white" _dark={{
                        bg: 'blackAlpha.400',
                        shadow: "xs"
                    }} p={8} rounded="lg" shadow="md">
                        <Icon boxSize={10} color={`${primaryColor}.400`} mr={4}>
                            <FaBell />
                        </Icon>
                        <Box>
                            <Heading as="h3" size="md" color={`${primaryColor}.600`}>
                                Smart Reminders <Text as="span" fontSize="sm">(Coming Soon)</Text>
                            </Heading>
                            <Text mt={2} color="gray.600">
                                Never lose track of important pages with customizable reminders
                                and digest settings.
                            </Text>
                        </Box>
                    </Flex>
                </Stack>
            </Box>
        </>
    );
};

export default About;
