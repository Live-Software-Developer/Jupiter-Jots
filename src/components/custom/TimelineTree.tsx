import { useState } from 'react'
import { TimelineConnector, TimelineContent, TimelineItem, TimelineRoot, TimelineTitle } from '../ui/timeline'
import { LuFolder, LuFolderOpen } from 'react-icons/lu'
import { Box, For, Group, HStack, IconButton, Spacer, Text } from '@chakra-ui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Collection, db } from '../../db'
import { AddUpdateCollection } from './Utils'

// interface TreeNode {
//     id: number
//     name: string
//     children?: TreeNode[]
// }

function buildTree(collections: Collection[]): Collection[] {
    // Create a map of collections by id for quick lookup
    const map = new Map<number, Collection>();
    collections.forEach((col) =>
        map.set(col.id, { ...col, children: col.children ?? [] })
    );

    const roots: Collection[] = [];

    // Iterate over the collections to build the tree
    collections.forEach((col) => {
        const node = map.get(col.id)!; // Get the current node

        if (col.parent === undefined || col.parent === null) {
            // Root node
            roots.push(node);
        } else {
            // Add to its parent's children
            const parent = map.get(col.parent);
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(node);
            }
        }
    });

    return roots;
}

const RenderTimeLine = ({ node }: { node: Collection }) => {

    const [isHovered, setIsHovered] = useState(false);
    const children_are_available = Array.isArray(node.children) && node.children.length

    return (
        <TimelineItem key={`node_${node.id}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            alignItems={'center'}
        >
            <TimelineConnector>

                <IconButton size={'xs'} borderRadius={'md'} variant={'surface'} shadow={'none'}>
                    {
                        children_are_available ? <LuFolderOpen /> : <LuFolder />

                    }
                </IconButton>
            </TimelineConnector>
            <TimelineContent pb={2}>
                <TimelineTitle>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                        <Group cursor={'pointer'}>
                            <Box bg={node.color} w='10px' h={'10px'} borderRadius={'50%'} />
                            <Text>
                                {node.name}
                            </Text>
                        </Group>
                        <AddUpdateCollection updating={true} data={node} />
                    </HStack>
                </TimelineTitle>
                {/* <TimelineDescription>13th May 2021</TimelineDescription> */}
                {children_are_available ? (
                    <TimelineRoot gap={0}>
                        <Spacer />
                        {
                            node.children?.map(child => (
                                <RenderTimeLine key={`timeline_${child.id}_${node.id}`} node={child} />
                            ))
                        }
                    </TimelineRoot>
                )
                    :
                    null
                }
            </TimelineContent>
        </TimelineItem>
    )
}

const TimelineTree = () => {

    const _collections = useLiveQuery(() => db.collections.toArray())
    const collections = buildTree(_collections ?? [])



    return (
        <div>
            <TimelineRoot gap={0}>

                <For
                    each={collections}
                >
                    {(folder, index) => (
                        <RenderTimeLine key={`folder_${folder.id}_${index}`} node={folder} />
                    )}
                </For>
            </TimelineRoot>
        </div>
    )
}

export default TimelineTree