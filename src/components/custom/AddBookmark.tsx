import { Box, createListCollection, HStack, IconButton, Input, Spacer, Text, Textarea, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { LuBookmarkPlus } from 'react-icons/lu';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Field } from '../ui/field';
import OpenExtensionFullScreen from './OpenExtensionFullScreen';
import { db } from '../../db';
import { toaster } from '../ui/toaster';
import { Tooltip } from '../ui/tooltip';
import { Controller, useForm } from 'react-hook-form';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from '../ui/select';
import { useLiveQuery } from 'dexie-react-hooks';
import { BiPencil } from 'react-icons/bi';
import { AddUpdateCollection, AddUpdateTag } from './Utils';
import { extractDescription } from '../../utils/functions';

interface IBookmarkForm {
    setIsOpen: any
    updating: boolean
    id: number | null | undefined
    isExtension: boolean
    isOpen: boolean
}

export const BookmarkForm = ({ updating, setIsOpen, id, isExtension, isOpen }: IBookmarkForm) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
        getValues
    } = useForm<IBookmarkFormValues>()

    const contentRef = useRef<HTMLDivElement>(null)
    const _collections = useLiveQuery(() => db.collections.toArray())
    const collections = createListCollection({
        items: _collections?.map(collection => ({
            label: collection.name,
            value: collection.id.toString()
        })) ?? [],
    })

    const _tags = useLiveQuery(() => db.tags.toArray())
    const tags = createListCollection({
        items: _tags?.map(tag => ({
            label: tag.name,
            value: tag.id.toString()
        })) ?? [],
    })

    // Read current tab info and trigger image reading
    const loadDetails = () => {
        try {
            if (isExtension) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs.length === 0) {
                        return;
                    }

                    const activeTab = tabs[0];

                    const title: any = activeTab.title;
                    const url: any = activeTab.url;
                    const icon: any = activeTab.favIconUrl;

                    setValue('url', url)
                    setValue('icon', icon)

                    if(url.startsWith('https://x.com') || url.startsWith('https://twitter.com')){
                        let chunks = title.split(":")
                        let notes = extractDescription(title ?? "")
                        if(chunks.length >= 2 ){
                            setValue("title", chunks[0] )
                            setValue('notes', notes)
                        }
                        else{
                            setValue("title", title)
                            setValue("notes", title)
                        }
                    }
                    else{
                        setValue('title', title)
                    }

                    if (url?.startsWith('chrome')) {
                        // setIsChromeInternalPage(true)
                        // setIsOpen(true)
                    } else {
                        const tabID: any = activeTab.id
                        chrome.scripting.executeScript({
                            target: { tabId: tabID, allFrames: false },
                            files: ['static/content.js'],
                        });

                    }
                });
            }
        } catch (e) {
            console.error("Error accessing tabs:", e);
        }
    };

    async function saveBookMark(data: IBookmarkFormValues) {

        try {
            let bookmark: any = {
                title: data.title,
                icon: data.icon,
                url: data.url,
                notes: data.notes,
                image: data.image,
                tags: data.tags ? data.tags.map(t => Number(t)) : [],
                collection: data.collection ? Number(data.collection) : undefined,
            }
            if (updating && id) {
                await db.bookmarks.update(id, { ...bookmark })
            } else {
                bookmark.created_on = new Date()
                await db.bookmarks.add(bookmark);
            }

            setIsOpen(false)
            toaster.create({
                description: updating ? "Bookmark updated successfully" : "Bookmark added successfully",
                type: "success"
            })

        } catch (error) {
            toaster.create({
                description: updating ? "Failed to update the bookmark" : "Failed to add Bookmark",
                type: "error"
            })
        }
    }

    const loadBookmark = async () => {
        if (updating && id) {
            const bookmark = await db.bookmarks.get(id)
            setValue('title', bookmark?.title ?? '')
            setValue('url', bookmark?.url ?? '')
            setValue('icon', bookmark?.icon ?? '')
            setValue('notes', bookmark?.notes ?? '')
            setValue('image', bookmark?.image ?? '')
            setValue('collection', [bookmark?.collection?.toString() ?? ""])
            setValue('tags', bookmark?.tags?.map(t => t.toString()) ?? [])
        }
    }


    const onSubmit = handleSubmit((data) => {
        saveBookMark(data)
        reset()
    })

    useEffect(() => {
        if (updating) {
            loadBookmark()
        }
    }, [updating, id])

    useEffect(() => {
        const messageListener = (message: any, sender: any, sendResponse: any) => {
            setValue('image', message?.ogImage ?? "")
            const fieldValues = getValues()

            if(!fieldValues.url.startsWith('https://x.com') && !fieldValues.url.startsWith('https://twitter.com')){
                setValue('notes', message.description ?? "")
            }
            setIsOpen(true)
        };

        // Add the listener once
        chrome?.runtime?.onMessage?.addListener(messageListener);

        // Clean up listener on component unmount
        return () => {
            chrome?.runtime?.onMessage?.removeListener(messageListener);
        };
    }, [getValues().url]);

    useEffect(() => {
        if (!updating) {
            loadDetails()
        }
    }, [isOpen])

    return (
        <form id='bookmark-form' onSubmit={onSubmit}>
            <VStack gap={4} alignItems={'start'} ref={contentRef}>
                <Field label="Title"
                    invalid={!!errors?.title}
                    errorText={errors.title?.message}
                >
                    <Input borderRadius={'md'} placeholder="Bookmark Title" {...register("title", { required: "Title is required" })} />
                </Field>
                <Field label="URL">
                    <Input borderRadius={'md'} {...register("url", { required: "URL is required" })} placeholder="Bookmark URL" />
                </Field>
                <Field label="icon">
                    <Input borderRadius={'md'} {...register("icon")} placeholder="Icon" />
                </Field>
                <Field label="Image">
                    <Input borderRadius={'md'} placeholder="Image" {...register("image")} />
                </Field>
                <Field label="Notes"
                    invalid={!!errors.notes}
                    errorText={errors.notes?.message}
                >
                    <Textarea rows={7} borderRadius={'md'} placeholder="Describe the bookmark" {...register("notes")} />
                </Field>

                <Box w={'100%'}>
                    <HStack minW={'100%'} justifyContent={'space-between'}>
                        <Text>Tags</Text>
                        <AddUpdateTag updating={false} closeOnSave={true} />
                    </HStack>
                    <Spacer h={'2'} />
                    <Field
                        invalid={!!errors.tags}
                        errorText={errors.tags?.message}
                    >
                        <Controller
                            control={control}
                            name="tags"
                            render={({ field }) => (
                                <SelectRoot
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={({ value }) => field.onChange(value)}
                                    onInteractOutside={() => field.onBlur()}
                                    collection={tags}
                                    multiple={true}
                                >
                                    <SelectTrigger>
                                        <SelectValueText placeholder="Select Tag(s)" />
                                    </SelectTrigger>
                                    <SelectContent portalRef={contentRef}>
                                        {tags.items.map((tag) => (
                                            <SelectItem item={tag} key={tag.value}>
                                                {tag.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            )}
                        />
                    </Field>
                </Box>

                <Box w={'100%'}>
                    <HStack minW={'100%'} justifyContent={'space-between'}>
                        <Text>Collection</Text>
                        <AddUpdateCollection updating={false} closeOnSave={true} />
                    </HStack>
                    <Spacer h={'2'} />
                    <Field
                        invalid={!!errors.collection}
                        errorText={errors.collection?.message}
                    >
                        <Controller
                            control={control}
                            name="collection"
                            render={({ field }) => (
                                <SelectRoot
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={({ value }) => field.onChange(value)}
                                    onInteractOutside={() => field.onBlur()}
                                    collection={collections}
                                    multiple={false}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValueText placeholder="Select Collection" />
                                    </SelectTrigger>
                                    <SelectContent portalRef={contentRef}>
                                        {collections.items.map((collection) => (
                                            <SelectItem item={collection} key={collection.value}>
                                                {collection.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            )}
                        />
                    </Field>
                </Box>

            </VStack>
        </form>
    )
}

interface IAddBookmarkCreating {
    isExtension: boolean
    updating: false
    id?: undefined;
}

interface IAddBookmarkUpdating {
    isExtension: boolean
    updating: true
    id?: number
}


type IAddBookmark = IAddBookmarkCreating | IAddBookmarkUpdating


interface IBookmarkFormValues {
    title: string
    icon: string | null
    url: string
    notes: string
    image: string | null
    tags: string[]
    collection: string[] | undefined
}

const AddBookmark = ({ updating, id }: IAddBookmark) => {

    const [isExtension, setIsExtension] = useState(false)

    const [isChromInternalPage, setIsChromeInternalPage] = useState(false)

    const [isOpen, setIsOpen] = useState(false)


    const handleAddBookmarkThroughExtension = () => {
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length === 0) {
                    return;
                }

                const activeTab = tabs[0];
                const url = activeTab.url;


                if (url?.startsWith('chrome')) {
                    setIsChromeInternalPage(true)
                } else {
                    const tabID: any = activeTab.id
                    chrome.scripting.executeScript({
                        target: { tabId: tabID, allFrames: false },
                        files: ['static/content.js'],
                    });
                }
                setIsOpen(true)
            });
        } catch (e) {
            console.error("Error accessing tabs:", e);
        }
    };


    const checkIfIsChromeInternalPage = () => {
        chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                return;
            }

            const activeTab = tabs[0];
            const url = activeTab.url;

            if (url?.startsWith('chrome')) {
                setIsChromeInternalPage(true)
            }
        });
    }


    const checkIfExtension = () => {
        const isInExtension = !!(typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id);
        setIsExtension(isInExtension)
    }

    useEffect(() => {
        checkIfExtension()
    }, [])


    useEffect(() => {
        checkIfIsChromeInternalPage()
    }, [])


    return (
        <>
            {
                (isExtension && isChromInternalPage) ? (
                    <Tooltip content={updating ? 'Update bookmark' : 'Add Bookmark'} >
                        <IconButton onClick={() => setIsOpen(true)} variant={'plain'} size={'md'} >
                            {
                                updating ? (
                                    <BiPencil size={'22px'} />
                                ) : (
                                    <LuBookmarkPlus size={'22px'} />
                                )
                            }
                        </IconButton>
                    </Tooltip>
                ) : null
            }

            {
                (isExtension && !isChromInternalPage) ? (
                    <Tooltip content={updating ? "Update bookmark" : "Bookmark Page"} >
                        {
                            updating ? (
                                <IconButton onClick={() => setIsOpen(true)} variant={'plain'} size={'md'}>
                                    <BiPencil size={'22px'} />
                                </IconButton>
                            ) : (
                                <IconButton onClick={handleAddBookmarkThroughExtension} variant={'plain'} size={'md'}>
                                    <LuBookmarkPlus size={'22px'} />
                                </IconButton>
                            )
                        }
                    </Tooltip>
                ) : null
            }

            {
                !isExtension ? (
                    <IconButton onClick={() => setIsOpen(true)} variant={'plain'} size={'md'}>
                        <LuBookmarkPlus size={'22px'} />
                    </IconButton>
                ) : null
            }

            {
                (isExtension && !isChromInternalPage) ? (
                    <OpenExtensionFullScreen />
                ) : null
            }

            <DialogRoot key={new Date().getUTCMilliseconds().toString()} open={isOpen} onOpenChange={e => setIsOpen(e.open)} preventScroll={false}>
                <DialogContent borderRadius={'xl'}>
                    <DialogHeader>
                        <DialogTitle>{updating ? 'Update bookmark' : 'Add Bookmark'}</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <BookmarkForm isOpen={isOpen} updating={updating} setIsOpen={setIsOpen} id={id} isExtension={isExtension} />
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button variant="outline" type='submit' form='bookmark-form'>Save</Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
        </>
    );
};

export default AddBookmark;
