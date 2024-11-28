import { Box, Group, HStack, IconButton, Spacer, Span, Text, VStack } from "@chakra-ui/react"
import { Button } from "../ui/button"
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer"
import { LuSettings2, LuTag } from "react-icons/lu"
import { Tooltip } from "../ui/tooltip"
import { useState } from "react"
import TimelineTree from "./TimelineTree"
import { AddUpdateCollection, AddUpdateTag } from "./Utils"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../db"
import { BiCollection } from "react-icons/bi"

const Tags = () => {

    const tags = useLiveQuery(() => db.tags.toArray())

    return (
        <VStack gap={6} align="stretch" >
            <VStack alignItems={'start'} gap={1}>
                <HStack justifyContent={'space-between'} w={"100%"}>
                    <Group>
                        <LuTag />
                        <Text fontWeight="bold" mb={2}>Manage Tags</Text>
                    </Group>
                    <AddUpdateTag updating={false} />
                </HStack>

                {
                    tags?.map(tag => (
                        <HStack key={`tag_${tag.id}`} justifyContent={'space-between'} w={'100%'}>
                            <HStack>
                                <Box bg={tag.color} w='10px' h={'10px'} borderRadius={'50%'} />
                                <Span>{tag.name}</Span>
                            </HStack>
                            <AddUpdateTag updating={true} data={tag} />
                        </HStack>
                    ))
                }
            </VStack>
        </VStack>
    )
}

const CollectionsAndTags = () => {
    const [open, setOpen] = useState(false)

    return (
        <DrawerRoot size={"sm"} open={open} onOpenChange={e => setOpen(e.open)} placement={'start'} preventScroll={false} closeOnInteractOutside={false}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Tooltip content={'Tags & Collections'}>
                    <IconButton onClick={() => setOpen(true)} cursor={'pointer'} variant={'plain'} size={'md'}>
                        <LuSettings2 size={'20px'} />
                    </IconButton>
                </Tooltip>
            </DrawerTrigger>
            <DrawerContent portalled={true} offset={{ base: '1', md: '10' }} borderRadius={'xl'}>
                <DrawerHeader>
                    <DrawerTitle >
                        <HStack>
                            <LuTag />
                            Tags & Collections
                        </HStack>
                    </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                    <Tags />
                    <Spacer h={'8'} />
                    <Box>
                        <HStack justify={'space-between'} alignItems={'center'}>
                            <Group>
                                <BiCollection />
                                <Text fontWeight="bold">
                                    Manage Collections
                                </Text>
                            </Group>
                            <Group>
                                <AddUpdateCollection updating={false} />
                            </Group>
                        </HStack>
                        <Spacer h={'4'} />
                        <TimelineTree />
                    </Box>
                </DrawerBody>
                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerActionTrigger>
                </DrawerFooter>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}

export default CollectionsAndTags