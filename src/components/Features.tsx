import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import {
    FcAbout,
    FcAlarmClock,
    FcAssistant,
    FcBookmark,
    FcCollaboration,
    FcDonate,
    FcManager,
    FcMindMap,
    FcOpenedFolder,
    FcSearch,
    FcSynchronize,
} from 'react-icons/fc'

interface CardProps {
    heading: string
    description: string
    icon: ReactElement
    href: string
}

const Card = ({ heading, description, icon, href }: CardProps) => {
    return (
        <Box
            maxW={{ base: 'full', md: '275px' }}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}>
            <Stack align={'start'} gap={1}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={'gray.100'}
                    _dark={{
                        bg: 'blackAlpha.300'
                    }}
                //   bg={useColorModeValue('gray.100', 'gray.700')}
                >
                    {icon}
                </Flex>
                <Box mt={1}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
                {/* <Button variant={'surface'} colorPalette={'blue'} size={'sm'}>
                    Learn more
                </Button> */}
            </Stack>
        </Box>
    )
}

export default function Features() {
    return (
        <Box py={4}>
            <Stack gap={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Features
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Effortless Organization, Seamless Access – Your Web Content, Perfectly Managed.
                </Text>
            </Stack>

            <Container w={'100%'} mt={12} p={0}>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }} gap={4}>
                    <Card
                        heading={'Universal Bookmarking'}
                        icon={<Icon w={10} h={10}><FcBookmark /></Icon>}
                        description={'Save web pages, links, and resources with one click.'}
                        href={'#'}
                    />
                    <Card
                        heading={'Organize by Tags & Collections'}
                        icon={<Icon w={10} h={10}><FcOpenedFolder /></Icon>}
                        description={'Add custom tags/collections to categorize your bookmarks for easier searching and management.'}
                        href={'#'}
                    />
                    <Card
                        heading={'Customizable Visuals'}
                        icon={<Icon w={10} h={10}><FcMindMap /></Icon>}
                        description={'Personalize your bookmark library with images, icons, and color-coded tags to enhance visual appeal.'}
                        href={'#'}
                    />
                    <Card
                        heading={'Advanced Search'}
                        icon={<Icon w={10} h={10}><FcSearch /></Icon>}
                        description={'A powerful search function to quickly locate bookmarks using titles, tags, or notes.'}
                        href={'#'}
                    />
                    <Card
                        heading={'Cross-Platform Integration (Coming Soon)'}
                        icon={<Icon w={10} h={10}><FcSynchronize /></Icon>}
                        description={'Sync bookmarks across multiple devices for easy access, whether for work or leisure.'}
                        href={'#'}
                    />
                    <Card
                        heading={'Smart Reminders (Coming Soon)'}
                        icon={<Icon w={10} h={10}><FcAlarmClock /></Icon>}
                        description={'Set reminders, alerts, and digest settings to help you keep track of important web pages and resources.'}
                        href={'#'}
                    />
                </SimpleGrid>
            </Container>
        </Box>
    )
}