import { Box, Heading, Text, VStack } from '@chakra-ui/react'

interface IInternalPageHero {
    title: string
    description: string
}

const InternalPageHero = ({ title, description }: IInternalPageHero) => {
    return (
        <VStack py={'50px'} borderRadius={'md'} bg={'gray.100'} _dark={{
            bg: 'blackAlpha.400'
        }}>
            <Heading as={'h1'} size={'2xl'}>{title}</Heading>
            <Text fontWeight={500}>{description}</Text>
        </VStack>
    )
}

export default InternalPageHero