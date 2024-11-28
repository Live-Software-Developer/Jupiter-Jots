'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Icon,
    useBreakpointValue,
    useDisclosure,
    Collapsible,
    PopoverRoot,
    Group,
    Image,
    HStack,
    VStack,
    Spacer,
} from '@chakra-ui/react'
import { HiBars3 } from 'react-icons/hi2'
import { LuChevronDown, LuChevronRight, LuX } from 'react-icons/lu'
import { PopoverContent, PopoverTrigger } from './ui/popover'
import { NavLink, useNavigate } from 'react-router-dom'
import { ColorModeToggle } from './color-mode-toggle'


export default function NavigationBar() {
    const { open, onToggle } = useDisclosure()

    const navigate = useNavigate()

    return (
        <Box position={'sticky'} top={0} zIndex={2}>
            <HStack
                // bg={useColorModeValue('white', 'gray.800')}
                // color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                h="60px"
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={'gray.200'}
                _dark={{
                    borderColor: "blackAlpha.300"
                }}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    >
                        {open ? <LuX /> : <HiBars3 />}
                    </IconButton>
                </Flex>
                <Group>
                    <Image borderRadius={'sm'} h={'40px'} bg={"transparent"} src="/static/jj-128.png" onClick={() => navigate('/')} cursor={'pointer'} alt="Jupiter Jots" />
                    <Box display={{ base: 'block', md: 'none' }}>
                        <ColorModeToggle />
                    </Box>
                </Group>
                <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                    <DesktopNav />
                    <Spacer w={10} />
                    <ColorModeToggle />
                </Flex>
            </HStack>

            <Collapsible.Root open={open}>
                <Collapsible.Content>
                    <MobileNav closeMenu={onToggle} />
                </Collapsible.Content>
            </Collapsible.Root>
        </Box>
    )
}

const DesktopNav = () => {

    return (
        <HStack direction={'row'} gap={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <PopoverRoot>
                        <PopoverTrigger>
                            {
                                navItem.children && navItem.children?.length > 0 ? (
                                    <Box
                                        p={2}
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        color={'blackAlpha.900'}
                                        _hover={{
                                            textDecoration: 'none',
                                            color: 'blackAlpha.800',
                                        }}
                                        _dark={{
                                            color: 'whiteAlpha.900',
                                            _hover: {
                                                textDecoration: 'none',
                                                color: 'whiteAlpha.800',
                                            }
                                        }}
                                        cursor={"pointer"}>
                                        {navItem.label}
                                    </Box>
                                ) : (
                                    <NavLink to={navItem.href ?? "/"}>
                                        <Box
                                            p={2}
                                            fontSize={'sm'}
                                            fontWeight={500}
                                            color={'blackAlpha.900'}
                                            _hover={{
                                                textDecoration: 'none',
                                                color: 'blackAlpha.800',
                                            }}
                                            _dark={{
                                                color: 'whiteAlpha.900',
                                                _hover: {
                                                    textDecoration: 'none',
                                                    color: 'whiteAlpha.800',
                                                }
                                            }}
                                            cursor={"pointer"}>
                                            {navItem.label}
                                        </Box>
                                    </NavLink>
                                )
                            }
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={'gray.100'}
                                _dark={{
                                    bg: "blackAlpha.950"
                                }}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <VStack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </VStack>
                            </PopoverContent>
                        )}
                    </PopoverRoot>
                </Box>
            ))}
        </HStack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Box
            w={'100%'}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: "gray.200" }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}
                        _dark={{
                            _groupHover: {
                                color: 'white'
                            }
                        }}
                    >
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'}>
                        <LuChevronRight />
                    </Icon>
                </Flex>
            </Stack>
        </Box>
    )
}

export const MobileNav = ({ closeMenu }: { closeMenu?: () => void }) => {
    return (
        <Stack bg={'gray.100'} _dark={{
            bg: 'black'
        }} p={4} display={{ md: 'none' }} gap={0}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} closeMenu={closeMenu} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href, closeMenu }: NavItem) => {
    const { open, onToggle } = useDisclosure()

    return (
        <Stack gap={0} onClick={children && onToggle}>
            <HStack
                py={1}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>

                {
                    !children ? (
                        <NavLink style={{ width: "100%" }} to={href ?? ""} onClick={() => closeMenu && closeMenu()}>
                            <Text fontWeight={600} py={'1'} color={'blackAlpha.900'} _dark={{
                                color: "whiteAlpha.900"
                            }} w="100%">
                                {label}
                            </Text>
                        </NavLink>
                    ) : (
                        <Text fontWeight={600} color={'blackAlpha.900'} _dark={{
                            color: "whiteAlpha.900"
                        }}>
                            {label}
                        </Text>

                    )
                }
                {children && (
                    <Icon
                        transition={'all .25s ease-in-out'}
                        transform={open ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    >
                        <LuChevronDown />
                    </Icon>
                )}
            </HStack>

            <Collapsible.Root mt={0} p={0} open={open} style={{ marginTop: '0!important' }}>
                <Collapsible.Content>
                    <Stack
                        // mt={2}
                        gap={0}
                        pl={4}
                        borderLeft={1}
                        borderStyle={'solid'}
                        borderColor={'gray.100'}
                        align={'start'}>
                        {children &&
                            children.map((child) => (
                                <Box key={child.label} py={1}>
                                    {child.label}
                                </Box>
                            ))}
                    </Stack>
                </Collapsible.Content>
            </Collapsible.Root>
        </Stack>
    )
}

interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
    closeMenu?: () => void
}

const NAV_ITEMS: Array<NavItem> = [
    // {
    //     label: 'Inspiration',
    //     children: [
    //         {
    //             label: 'Explore Design Work',
    //             subLabel: 'Trending Design to inspire you',
    //             href: '#',
    //         },
    //         {
    //             label: 'New & Noteworthy',
    //             subLabel: 'Up-and-coming Designers',
    //             href: '#',
    //         },
    //     ],
    // },
    // {
    //     label: 'Find Work',
    //     children: [
    //         {
    //             label: 'Job Board',
    //             subLabel: 'Find your dream design job',
    //             href: '#',
    //         },
    //         {
    //             label: 'Freelance Projects',
    //             subLabel: 'An exclusive list for contract work',
    //             href: '#',
    //         },
    //     ],
    // },
    // {
    //     label: 'Learn Design',
    //     href: '#',
    // },
    // {
    //     label: 'Hire Designers',
    //     href: '#',
    // },
    {
        label: 'Home',
        href: '/',
    },
    // {
    //     label: 'Bookmarks',
    //     href: '/bookmarks',
    // },
    {
        label: 'FAQs',
        href: '/faqs',
    },
    {
        label: 'Privacy Policy',
        href: '/privacy-policy',
    },
    {
        label: 'T & Cs',
        href: '/terms-and-conditions',
    },
]