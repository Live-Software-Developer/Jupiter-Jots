import { ReactNode, useRef, useState } from "react"
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field } from "../ui/field"
import { createListCollection, HStack, IconButton, Input, parseColor, VStack } from "@chakra-ui/react"
import { Tooltip } from "../ui/tooltip"
import { LuPlus } from "react-icons/lu"
import { Button } from "../ui/button"
import { ColorPickerArea, ColorPickerContent, ColorPickerControl, ColorPickerEyeDropper, ColorPickerInput, ColorPickerRoot, ColorPickerSliders, ColorPickerTrigger } from "../ui/color-picker"
import { Collection, db, Tag } from "../../db"
import { toaster } from "../ui/toaster"
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select"
import { useLiveQuery } from "dexie-react-hooks"
import { BiPencil } from "react-icons/bi"
import { MdEdit } from "react-icons/md"


interface IBookmarkDialog {
    trigger: ReactNode
    title: string
    content: ReactNode
    showFooter: boolean
    footerContent: ReactNode
    open: boolean
    setOpen: (value: boolean) => void
    closeOnSave?: boolean

    size?: "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full" | undefined
}

export const BookmarkDialog = ({ trigger, title, content, showFooter, footerContent, open, setOpen, size, closeOnSave }: IBookmarkDialog) => {

    return (
        <DialogRoot size={size ?? "md"} placement="top" motionPreset="slide-in-bottom" open={open} onOpenChange={e => setOpen(e.open)} preventScroll={false}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent borderRadius={'2xl'}>
                <DialogHeader>
                    <DialogTitle pr={'2'} fontWeight={500}>{title}</DialogTitle>
                    <DialogCloseTrigger hidden={closeOnSave} />
                </DialogHeader>
                <DialogBody>
                    {content}
                </DialogBody>
                {
                    showFooter ? (
                        <DialogFooter>
                            {footerContent}
                        </DialogFooter>
                    ) : null
                }
            </DialogContent>
        </DialogRoot>

    )
}


interface IAddTagForm {
    name: string
    setName: (value: string) => void

    color: string
    setColor: (value: string) => void
}

const AddTagForm = ({ name, setName, color, setColor }: IAddTagForm) => {
    const contentRef = useRef<HTMLDivElement>(null)
    return (
        <VStack ref={contentRef}>

            <Field label="Tag Name" w={'100%'}>
                <Input placeholder="Tag name..." borderRadius={'lg'} value={name} onChange={e => setName(e.target.value)} />
            </Field>
            <Field label="Color" w={'100%'}>
                <ColorPickerRoot defaultValue={parseColor(color)} onValueChange={e => setColor(e.valueAsString)} w={'100%'}>
                    {/* <ColorPickerLabel>Color</ColorPickerLabel> */}
                    <ColorPickerControl>
                        <ColorPickerInput borderRadius={'md'} />
                        <ColorPickerTrigger />
                    </ColorPickerControl>
                    <ColorPickerContent portalRef={contentRef}>
                        <ColorPickerArea borderRadius={'md'} />
                        <HStack>
                            <ColorPickerEyeDropper />
                            <ColorPickerSliders />
                        </HStack>
                    </ColorPickerContent>
                </ColorPickerRoot>
            </Field>
        </VStack>
    )
}


interface IAddUpdateTagUpdating {
    updating: true;
    data: Tag;
    closeOnSave?: boolean
}

interface IAddUpdateTagNotUpdating {
    updating: false;
    data?: undefined;
    closeOnSave?: boolean
}

// This is a discriminated union; ie if updating is true, typescript will enforce one to enter `data`
type IAddUpdateTag = IAddUpdateTagUpdating | IAddUpdateTagNotUpdating;

export const AddUpdateTag = ({ updating, data, closeOnSave }: IAddUpdateTag) => {
    const [open, setOpen] = useState(false)

    const [name, setName] = useState(updating ? data.name : "")
    const [color, setColor] = useState(updating ? data.color : "#360642")

    const saveTag = () => {

        if (!name || name === "") {
            toaster.create({
                description: "Tag name is required",
                type: 'error'
            })
            return
        }

        if (updating) {
            db.tags.update(data.id, {
                name,
                color,
            }).then(() => {
                toaster.create({
                    description: "Tag Updated successfully",
                    type: "success"
                })
            })
        } else {
            db.tags.add({
                name,
                color,
            }).then(() => {
                toaster.create({
                    description: "Tag added successfully",
                    type: "success"
                })
            })
        }
    }

    async function deleteTagAndUpdateBookmarks(tagId: number): Promise<void> {
        await db.transaction('rw', [db.tags, db.bookmarks], async () => {
            // Delete the target collection
            await db.tags.delete(tagId);
            const affectedBookmarks = await db.bookmarks
                .filter((bookmark) => bookmark.tags.includes(tagId))
                .toArray();

            // Update each bookmark to remove the tag
            await Promise.all(
                affectedBookmarks.map((bookmark) =>
                    db.bookmarks.update(bookmark.id, {
                        tags: bookmark.tags.filter((id) => id !== tagId), // Remove the tag
                    })
                )
            );
        });
    }

    const deleteTag = () => {
        if (updating) {
            deleteTagAndUpdateBookmarks(data.id).then(() => {
                toaster.create({
                    description: "Tag deleted successfully",
                    type: "success"
                })
            }).catch((e) => {
                toaster.create({
                    description: `Unable to delete tag ${e}`,
                    type: "error"
                })
            })
        }
    }

    return (
        <>
            <BookmarkDialog
                closeOnSave={true}
                open={open}
                setOpen={setOpen}
                trigger={
                    <Tooltip content={updating ? "Edit" : "Add Tag"}>
                        <IconButton variant={'subtle'} onClick={() => setOpen(true)} borderRadius={'md'} size={'xs'}>

                            {
                                updating ? (
                                    <MdEdit />
                                ) : (
                                    <LuPlus />
                                )
                            }
                        </IconButton>
                    </Tooltip>
                }
                title={updating ? `Update: ${data.name}` : `Add Tag`}
                content={
                    <>
                        <AddTagForm name={name} setName={setName} color={color} setColor={setColor} />
                    </>
                }
                showFooter={true}
                footerContent={
                    <HStack justifyContent={'space-between'} w='100%'>
                        <Button size="sm" borderRadius={'md'} hidden={!updating} colorPalette={'red'} variant={'surface'} onClick={deleteTag}>Delete</Button>
                        <Button size="sm" borderRadius={'md'} ms={'auto'} onClick={saveTag}>Save</Button>
                    </HStack>
                }
            />
        </>

    )
}


interface IAddCollectionForm {
    name: string
    color: string
    parent: string[]
    updateField: (field: string, value: any) => void

}

const AddCollectionForm = ({ name, color, parent, updateField }: IAddCollectionForm) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const _parents = useLiveQuery(() => db.collections.toArray())
    const parents = createListCollection({
        items: _parents?.map(par => ({
            label: par.name,
            value: par.id.toString()
        })) ?? [],
    })

    return (
        <VStack ref={contentRef}>

            <Field label="Collection Name" w={'100%'}>
                <Input placeholder="Collection name..." borderRadius={'lg'} value={name} onChange={e => updateField('name', e.target.value)} />
            </Field>
            <Field label="Color" w={'100%'}>
                <ColorPickerRoot defaultValue={parseColor(color)} onValueChange={e => updateField('color', e.valueAsString)} w={'100%'}>
                    <ColorPickerControl>
                        <ColorPickerInput borderRadius={'md'} />
                        <ColorPickerTrigger />
                    </ColorPickerControl>
                    <ColorPickerContent portalRef={contentRef}>
                        <ColorPickerArea borderRadius={'md'} />
                        <HStack>
                            <ColorPickerEyeDropper />
                            <ColorPickerSliders />
                        </HStack>
                    </ColorPickerContent>
                </ColorPickerRoot>
            </Field>
            <Field label="Parent" w={'100%'}>
                <SelectRoot collection={parents ?? []} borderRadius={'md'} multiple={false} value={parent} onValueChange={e => updateField('parent', e.value)}>
                    <SelectLabel>Select framework</SelectLabel>
                    <SelectTrigger clearable>
                        <SelectValueText placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent portalRef={contentRef}>
                        {parents.items.map((parent) => (
                            <SelectItem item={parent} key={parent.value}>
                                {parent.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
            </Field>
        </VStack>
    )
}


interface IAddUpdateCollectionUpdating {
    updating: true;
    data: Collection;
    closeOnSave?: boolean
}

interface IAddUpdateCollectionNotUpdating {
    updating: false;
    data?: undefined;
    closeOnSave?: boolean
}

// This is a discriminated union; ie if updating is true, typescript will enforce one to enter `data`
type IAddUpdateCollection = IAddUpdateCollectionUpdating | IAddUpdateCollectionNotUpdating;

export const AddUpdateCollection = ({ updating, data, closeOnSave }: IAddUpdateCollection) => {
    const [open, setOpen] = useState(false)

    const [name, setName] = useState(updating ? data.name : "")
    const [color, setColor] = useState(updating ? data.color : "#360642")
    const [parent, setParent] = useState<string[]>(updating ? [data.parent ? data.parent.toString() : ""] : [])

    const saveCollection = () => {

        const _parent = (parent.length === 0 || parent[0] === '') ? undefined : Number(parent[0])

        if (!name || name === "") {
            toaster.create({
                description: "Collection name is required",
                type: 'error'
            })
            return
        }

        if (updating) {
            db.collections.update(data.id, {
                name,
                color,
                parent: _parent,
            }).then(() => {
                toaster.create({
                    description: "Collection Updated successfully",
                    type: "success"
                })
            })
        } else {
            db.collections.add({
                name,
                color,
                parent: _parent,
            }).then(() => {
                toaster.create({
                    description: "Collection added successfully",
                    type: "success"
                })
            })
        }
    }

    const updateField = (field: string, value: any) => {
        if (field === "name") {
            setName(value)
        }
        if (field === "parent") {
            setParent(value)
        }
        if (field === "color") {
            setColor(value)
        }
    }

    async function deleteCollectionAndUpdateParents(collectionId: number): Promise<void> {
        await db.transaction('rw', db.collections, async () => {
            // Delete the target collection
            await db.collections.delete(collectionId);

            // Update collections with this as parent
            await db.collections
                .where('parent')
                .equals(collectionId)
                .modify({ parent: undefined });

            await db.bookmarks
                .where('collection')
                .equals(collectionId)
                .modify({ collection: undefined });
        });
    }

    const deleteCollection = () => {
        if (updating) {

            deleteCollectionAndUpdateParents(data.id).then(() => {
                toaster.create({
                    description: "Collection deleted successfully",
                    type: "success"
                })
            })
        }
    }

    return (
        <>
            <BookmarkDialog
                closeOnSave={true}
                open={open}
                setOpen={setOpen}
                trigger={
                    <Tooltip content="Edit">
                        <IconButton variant={'subtle'} onClick={() => setOpen(true)} borderRadius={'md'} size={'xs'}>

                            {
                                updating ? <BiPencil /> : <LuPlus />
                            }
                        </IconButton>
                    </Tooltip>
                }
                title={updating ? `Update: ${data.name}` : `Add Collection`}
                content={
                    <>
                        <AddCollectionForm name={name} color={color} parent={parent} updateField={updateField} />
                    </>
                }
                showFooter={true}
                footerContent={
                    <HStack justifyContent={'space-between'} w='100%'>
                        <Button size="sm" borderRadius={'md'} onClick={deleteCollection} hidden={!updating} colorPalette={'red'} variant={'surface'}>Delete</Button>
                        <Button size="sm" borderRadius={'md'} ms={'auto'} onClick={saveCollection}>Save</Button>
                    </HStack>
                }
            />
        </>

    )
}