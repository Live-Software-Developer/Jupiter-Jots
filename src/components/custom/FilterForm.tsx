import { Controller, useForm } from "react-hook-form"
import { db, FilterFormEntity } from "../../db"
import { toaster } from "../ui/toaster"
import { useLiveQuery } from "dexie-react-hooks"
import { Box, Button, createListCollection, Input, SimpleGrid, VStack } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { Field } from "../ui/field"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select"
import { LuFilter } from "react-icons/lu"

const FilterForm = () => {

    let savedFilters = useLiveQuery(() => db.filters.filter(filter => filter.key === 'main').toArray())

    const {
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control
    } = useForm<FilterFormEntity>()

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

    async function saveFilterForm(data: FilterFormEntity) {
        try {
            let filters: FilterFormEntity = {
                key: 'main',
                search: data.search ?? "",
                collections: data.collections?.map((collection) => Number(collection)) ?? [],
                tags: data.tags?.map((tag) => Number(tag)) ?? []
            }

            let savedFilter = savedFilters && savedFilters.length > 0 ? savedFilters[0] : null

            if (savedFilter) {
                await db.filters.update(savedFilter.id, { ...filters })
            } else {
                await db.filters.add(filters)
            }
            // toaster.create({
            //     description: updating ? "Bookmark updated successfully" : "Bookmark added successfully",
            //     type: "success"
            // })

        } catch (error) {
            toaster.create({
                description: "Failed to update filters",
                type: "error"
            })
        }
    }

    const onSubmit = handleSubmit((data) => {
        saveFilterForm(data)
        reset()
    })

    useEffect(() => {
        if (savedFilters && savedFilters?.length > 0) {
            let filter = savedFilters[0]
            setValue('search', filter.search ?? "")
            setValue('tags', filter.tags ?? [])
            setValue('collections', filter.collections ?? [])
        }
    }, [savedFilters])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <SimpleGrid ref={contentRef} columns={{ base: 2, sm: 3, md: 4 }} gap={'2'}>
                    <Box>
                        <Field
                            label="Tags"
                            invalid={!!errors.search}
                            errorText={errors.search?.message}
                        >
                            <Controller
                                control={control}
                                name="search"
                                render={({ field }) => (
                                    <Input
                                        name={field.name}
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        borderRadius={'md'}
                                        placeholder="Enter Search Text"
                                        size={{ base: 'xs', sm: 'sm', md: 'md' }}
                                    />
                                )}
                            />
                        </Field>
                    </Box>

                    <Box>
                        <Field
                            label="Tag(s)"
                            invalid={!!errors.tags}
                            errorText={errors.tags?.message}
                        >
                            <Controller
                                control={control}
                                name="tags"
                                render={({ field }) => (
                                    <SelectRoot
                                        name={field.name}
                                        value={field.value?.map(val => val.toString() ?? [])}
                                        onValueChange={({ value }) => field.onChange(value)}
                                        onInteractOutside={() => field.onBlur()}
                                        collection={tags}
                                        multiple={true}
                                        size={{ base: 'xs', sm: 'sm', md: 'md' }}
                                    >
                                        <SelectTrigger clearable>
                                            <SelectValueText placeholder="Select Tag(s)" />
                                        </SelectTrigger>
                                        <SelectContent portalRef={contentRef} h={'200px'} overflowY={'auto'} borderRadius={'md'}>
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

                    <Box>
                        <Field
                            label="Collection(s)"
                            invalid={!!errors.collections}
                            errorText={errors.collections?.message}
                        >
                            <Controller
                                control={control}
                                name="collections"
                                render={({ field }) => (
                                    <SelectRoot
                                        name={field.name}
                                        value={field.value?.map(it => it.toString())}
                                        onValueChange={({ value }) => field.onChange(value)}
                                        onInteractOutside={() => field.onBlur()}
                                        collection={collections}
                                        multiple={true}
                                        size={{ base: 'xs', sm: 'sm', md: 'md' }}
                                    >
                                        <SelectTrigger clearable>
                                            <SelectValueText placeholder="Select Collection" />
                                        </SelectTrigger>
                                        <SelectContent portalRef={contentRef} h={'200px'} overflowY={'auto'} borderRadius={'md'}>
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
                    <Box>
                        <VStack alignItems={'start'} justifyContent={'end'} h={'100%'}>
                            <Button size={{ base: 'xs', sm: 'sm', md: 'md' }} borderRadius={'md'} type="submit">
                                <LuFilter />
                                Filter
                            </Button>
                        </VStack>
                    </Box>
                </SimpleGrid>
            </form>
        </div>
    )
}

export default FilterForm