import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react"
import { GoHome } from "./custom/OpenExtensionFullScreen"

interface ComingSoonPlaceholderProps {
    title?: string
    message?: string
  }
  
  export const ComingSoonPlaceholder: React.FC<ComingSoonPlaceholderProps> = ({
    title = "Coming Soon",
    message = "We're working hard to bring you something amazing. Stay tuned!",
  }) => {
    return (
      <Box
        minHeight="calc(100vh - 200px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        // bg={bgColor}
        // color={textColor}
      >
        <Container maxW="container.md">
          <VStack gap={8} textAlign="center">
            <Heading as="h1" size="2xl">
              {title}
            </Heading>
            <Heading as={'h3'}>Coming Soon</Heading>
            <Text fontSize="md">{message}</Text>
            <GoHome />
          </VStack>
        </Container>
      </Box>
    )
  }
  
  