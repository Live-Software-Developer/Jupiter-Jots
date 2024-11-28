import { Container, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Button } from './ui/button'
import { NavLink } from 'react-router-dom'

export default function Hero() {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                gap={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    <Text as={'span'} color={'orange.400'}>
                        Jupiter Jots_
                    </Text>
                    {' '}
                    Redefining Bookmarking
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Capture, Organize, and Access Your Digital World – Smarter, Faster, and More Beautifully.
                </Text>
                <Stack gap={6} direction={'row'}>
                    <Link href='https://livesoftwaredeveloper.com' textDecoration={'none'} target='_blank'>
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'orange'}
                            bg={'orange.400'}
                            _hover={{ bg: 'orange.500' }}>
                            Install on Chrome
                        </Button>
                    </Link>
                    <NavLink to='/about' style={{
                        textDecoration: "none"
                    }}>
                        <Button rounded={'full'} px={6}>
                            Learn more
                        </Button>
                    </NavLink>
                </Stack>
                <Flex w={'full'}>

                </Flex>
            </Stack>
        </Container>
    )
}