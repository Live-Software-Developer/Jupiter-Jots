import React, { useEffect, useState } from 'react'
import { Box, Text, Link, Button, Card, Group, HStack, VStack, Image, IconButton } from '@chakra-ui/react'
import { LuBookmarkMinus, LuExternalLink, LuEye, LuFileEdit, LuFolder } from 'react-icons/lu'
import { Bookmark, db } from '../../db'
import { formatDateWithTime, get2FirstCharacters } from '../../utils/functions'
import { DialogActionTrigger } from '../ui/dialog'
import AddBookmark from './AddBookmark'
import { toaster } from '../ui/toaster'
import { Tooltip } from '../ui/tooltip'
import { BookmarkDialog } from './Utils'
import { useLiveQuery } from 'dexie-react-hooks'



interface BookmarkCardProps {
    bookmark: Bookmark
}


const UpdateBookmark = ({ bookmark }: BookmarkCardProps) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <BookmarkDialog
                open={open}
                setOpen={setOpen}
                trigger={
                    <Tooltip content="Edit">
                        <IconButton onClick={() => setOpen(true)} variant={'subtle'} borderRadius={'md'} colorPalette={'green'} size={'sm'}>
                            <LuFileEdit />
                        </IconButton>
                    </Tooltip>
                }
                title={`Update: ${bookmark?.title}`}
                content={
                    <>
                        {/* <BookmarkForm
                            isInternalPage={false}
                            closeDialog={() => setOpen(false)}
                            updating={true}
                            id={bookmark.id}
                        /> */}
                    </>
                }
                showFooter={false}
                footerContent={null}
            />
        </>

    )
}


const DeleteBookmark = ({ bookmark }: BookmarkCardProps) => {
    const [open, setOpen] = useState(false)

    const deleteBookmark = async () => {
        try {
            await db.bookmarks.delete(bookmark.id)
            toaster.create({
                description: `Successfully delete a bookmark`,
                type: "success"
            })
        } catch (error) {
            toaster.create({
                description: `Unable to delete bookmark. ${error}`,
                type: "error"
            })
        }
        setOpen(false)
    }

    return (
        <>
            <BookmarkDialog
                open={open}
                setOpen={setOpen}
                trigger={
                    <Tooltip content="Delete">
                        <IconButton onClick={() => setOpen(true)} variant={'subtle'} borderRadius={'md'} colorPalette={'red'} size={'sm'}>
                            <LuBookmarkMinus />
                        </IconButton>
                    </Tooltip>
                }
                title={`Delete: ${bookmark?.title}`}
                content={
                    <>
                        <Text>Are you sure you want to delete this bookmark?</Text>
                    </>
                }
                showFooter={true}
                footerContent={
                    <HStack>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button variant={'surface'} colorPalette={'red'} onClick={deleteBookmark}>
                            Delete
                        </Button>
                    </HStack>
                }
            />
        </>

    )
}

const CustomIconRender = ({ icon, title }: { icon: string, title: string }) => {

    return (
        <Box
            h={'40px'}
            minH={'40px'}
            w={'40px'}
            minW={'40px'}
            overflow={"hidden"}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            textTransform={'uppcercase'}
            bg={'gray.200'}
            borderRadius={'50%'}
            _dark={{
                bg: "blackAlpha.700"
            }}
            p='1'
        >
            {
                icon ? (
                    <Image src={icon ?? ""} w={'100%'} />
                ) : get2FirstCharacters(title)
            }
        </Box>
    )
}

const PreviewBookmark = ({ bookmark }: BookmarkCardProps) => {
    const [open, setOpen] = useState(false)
    let collection = useLiveQuery(() => db.collections.get(bookmark.collection ?? 0))
    return (
        <>
            <BookmarkDialog
                size='lg'
                open={open}
                setOpen={setOpen}
                trigger={
                    <Tooltip content="Edit">
                        <IconButton onClick={() => setOpen(true)} variant={'subtle'} borderRadius={'md'} colorPalette={'green'} size={'sm'}>
                            <LuEye />
                        </IconButton>
                    </Tooltip>
                }
                title={`Update: ${bookmark?.title}`}
                content={
                    <VStack>
                        <HStack w={'100%'}>
                            <CustomIconRender title={bookmark.title ?? ""} icon={bookmark.icon ?? ""} />
                            <VStack gap={0} alignItems={'start'}>
                                <Text fontWeight={400} fontSize={'xs'}>
                                    {formatDateWithTime(bookmark?.created_on as any, true)}
                                </Text>
                                <Group>
                                    <LuFolder />
                                    <Text color={collection?.color} fontSize={'xs'}>{collection?.name}</Text>
                                </Group>
                                <Group wrap={'wrap'}>
                                    {
                                        bookmark?._tags?.map((tag) => (
                                            <Text fontSize={'xs'} key={`${bookmark.id}_${tag.id}`} color={tag.color}>#{tag.name}</Text>
                                        ))
                                    }
                                </Group>
                            </VStack>
                        </HStack>
                        <Box w={'100%'}>
                            <Image borderRadius={'md'} src={bookmark.image ?? ""} />
                        </Box>
                        <Box w={'100%'}>
                            <Text lineHeight={'tall'}>
                                {bookmark.notes}
                            </Text>
                        </Box>
                        <Box w={'100%'}></Box>
                    </VStack>
                }
                showFooter={true}
                footerContent={
                    <Box>
                        <Link href={bookmark?.url ?? ""} target='_blank'>
                            <Button variant={'surface'} colorPalette={'blue'} borderRadius={'md'} size={'sm'}>
                                Open
                                <LuExternalLink />
                            </Button>
                        </Link>
                    </Box>
                }
            />
        </>

    )
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
    const [isExtension, setIsExtension] = useState(false)
    let collection = useLiveQuery(() => db.collections.get(bookmark.collection ?? 0))

    const checkIfExtension = () => {
        const isInExtension = !!(typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id);
        setIsExtension(isInExtension)
    }


    useEffect(() => {
        checkIfExtension()
    }, [])


    return (
        <Card.Root borderRadius={'xl'} height={'100%'}>
            <Card.Body gap="1">
                <Card.Title fontWeight={500}
                    fontSize={'md'}
                    wordBreak={'break-all'}
                    textOverflow={'ellipsis'}
                    whiteSpace={'nowrap'}
                    overflow={'hidden'}
                >
                    {bookmark?.title}
                    <HStack overflow={'hidden'}>
                        <CustomIconRender title={bookmark.title ?? ""} icon={bookmark.icon ?? ""} />
                        <VStack gap={0} alignItems={'start'}>
                            <Text fontWeight={400} fontSize={'xs'}>
                                {formatDateWithTime(bookmark?.created_on as any, true)}
                            </Text>
                            <Group>
                                <LuFolder />
                                <Text color={collection?.color} fontSize={'xs'}>{collection?.name}</Text>
                            </Group>
                            <Group wrap={'wrap'}>
                                {
                                    bookmark?._tags?.map((tag) => (
                                        <Text fontSize={'xs'} key={`${bookmark.id}_${tag.id}`} color={tag.color}>#{tag.name}</Text>
                                    ))
                                }
                            </Group>
                        </VStack>
                    </HStack>
                </Card.Title>
                <HStack justifyContent={'space-between'}>
                    <Text
                        fontSize={'sm'}
                        lineHeight={'1.3rem'}
                        height={'calc(1.3rem * 3)'}
                        // maxHeight={'calc(1.3rem * 3)'}
                        // minH={'calc(1.3rem * 3)'}
                        display={'-webkit-box'}
                        lineClamp={3}
                        overflow={'hidden'}
                    >
                        {bookmark?.notes}
                    </Text>
                    <Image src={bookmark?.image ?? ""} height={'50px'} borderRadius={'md'} objectFit={'contain'} />
                </HStack>
            </Card.Body>
            <Card.Footer justifyContent="space-between" flexWrap={'wrap'} >
                <Box>
                    <Link href={bookmark?.url ?? ""} target='_blank'>
                        <Button variant={'surface'} colorPalette={'blue'} borderRadius={'md'} size={'sm'}>
                            Open
                            <LuExternalLink />
                        </Button>
                    </Link>
                </Box>
                <Group>
                    <AddBookmark updating={true} isExtension={isExtension} id={bookmark.id} />
                    <DeleteBookmark bookmark={bookmark} />
                    <PreviewBookmark bookmark={bookmark} />
                </Group>
            </Card.Footer>
        </Card.Root>
    )
}

export default BookmarkCard

