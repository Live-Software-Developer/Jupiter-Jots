import { Box, Container, Group, HStack, Image } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import AddBookmark from "../components/custom/AddBookmark";
import Settings from "../components/custom/Settings";
import CollectionsAndTags from "../components/custom/CollectionsAndTags";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/Navigation";

interface IWrapper {
    children: ReactNode
}

export default function Wrapper({ children }: IWrapper) {

    const [isExtension, setIsExtension] = useState(false)
    const [isChromeProtocol, setIsChromeProtocol] = useState(false)

    const navigate = useNavigate()

    const extensionWidth = "380px"

    const checkIfExtension = () => {
        const isInExtension = !!(typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id);
        setIsExtension(isInExtension)

        if (window.location.protocol === 'chrome-extension:') {
            setIsChromeProtocol(true)
        }
    }

    useEffect(() => {
        checkIfExtension()
    }, [])

    return (
        <Box
            overflow="auto"
            maxH={{
                base: isExtension ? "600px" : "100dvh",
                sm: isExtension ? '600px' : 'fit-content',
                md: 'fit-content',
                lg: 'fit-content',
                xl: 'fit-content',
            }}
            className="hidden-scrollbar"
        >
            {
                isExtension ? (
                    <Container position={'sticky'} top={0} height={'60px'} zIndex={2} bg={'white'} _dark={{
                        bg: 'blackAlpha.400',
                        borderColor: 'whiteAlpha.100'
                    }} borderBottom={'1px solid'} borderColor={'blackAlpha.100'}
                        maxW={{
                            base: isExtension ? extensionWidth : "auto",
                            md: "breakpoint-md",
                            lg: "breakpoint-lg",
                            xl: "breakpoint-xl"
                        }}
                        w={{
                            base: isExtension ? extensionWidth : "auto",
                            md: "breakpoint-md",
                            lg: "breakpoint-lg",
                            xl: "breakpoint-xl"
                        }}
                        fluid={!isExtension}
                    >
                        <HStack height={'100%'} justifyContent={'space-between'}>
                            <Group>
                                <Image borderRadius={'sm'} h={'40px'} bg={"transparent"} src="/static/jj-128.png" onClick={() => navigate('/')} cursor={'pointer'} alt="Jupiter Jots" />
                            </Group>
                            <Group marginLeft={'auto'}>
                                <AddBookmark isExtension={isExtension} updating={false} />
                                <CollectionsAndTags />
                                <Settings />
                            </Group>
                        </HStack>
                    </Container>
                ) : (
                    <NavigationBar />
                )
            }

            <Container
                maxW={{
                    base: isExtension ? extensionWidth : "auto",
                    md: "breakpoint-md",
                    lg: "breakpoint-lg",
                    xl: "breakpoint-xl"
                }}
                fluid={!isExtension}
                w={{
                    base: isExtension ? extensionWidth : "auto",
                    md: "breakpoint-md",
                    lg: "breakpoint-lg",
                    xl: "breakpoint-xl"
                }}
                minHeight={'lg'}
            >
                {children}
            </Container>
        </Box>
    )
}