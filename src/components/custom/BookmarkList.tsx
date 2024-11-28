import React, { useEffect, useState } from 'react'
import { Box, Card, Center, Heading, SimpleGrid, Spacer, Text, VStack } from '@chakra-ui/react'
import BookmarkCard from './BookmarkCard'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, FilterFormEntity } from '../../db'
import { BiFileBlank } from 'react-icons/bi'
import FilterForm from './FilterForm'

const BookmarkList: React.FC = () => {

  const [currentFilters, setCurrentFilters] = useState<FilterFormEntity | null>(null);

  let savedFilters = useLiveQuery(() => db.filters.filter(filter => filter.key === 'main').toArray())

  const bookmarks = useLiveQuery(async () => {
    
    // Fetch bookmarks
    let bookmarks = (await db.bookmarks.toArray()).reverse();
    
    // If no filters, return bookmakrs
    if (!currentFilters) return bookmarks;

    // Apply filters from settings
    const { search, tags, collections } = currentFilters;

    // Filter by search
    if (search) {
      const searchTerm = search.toLowerCase();
      bookmarks = bookmarks.filter(
        (bookmark) =>
          bookmark.title.toLowerCase().includes(searchTerm) ||
          bookmark.notes.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by tags (at least one tag matches)
    if (tags?.length > 0) {
      bookmarks = bookmarks.filter((bookmark) =>
        bookmark.tags.some((tagId) => tags.includes(tagId))
      );
    }

    // Filter by collection
    if (collections?.length > 0) {
      bookmarks = bookmarks.filter(
        (bookmark) => collections.includes(bookmark.collection ?? 0)
      );
    }

    // Reverse bookmarks (if needed)
    const reversedBookmarks = bookmarks.reverse();

    // Map over bookmarks to resolve tags
    const bookmarksWithTags = await Promise.all(
      reversedBookmarks.map(async (bookmark) => {
        const tags = await Promise.all(
          bookmark.tags.map((tagId) => db.tags.get(tagId))
        );
        return { ...bookmark, _tags: tags };
      })
    );

    bookmarksWithTags.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    return bookmarksWithTags;
  }, [currentFilters]); // Re-run query when settings change

  useEffect(() => {
    if (savedFilters && savedFilters?.length > 0) {
      setCurrentFilters(savedFilters[0]);
    }
  }, [savedFilters]);

  return (
    <Box gap={4} py={'8'}>

      <FilterForm />
      <Spacer h={'4'} />

      <SimpleGrid columns={{
        base: 1,
        md: 3,
      }} gap={4} w={'100%'}>
        {bookmarks?.map((bookmark: any, i: number) => (
          <BookmarkCard key={`${bookmark.id}_${i}`} bookmark={bookmark} />
        ))}
      </SimpleGrid>
      {
        bookmarks?.length === 0 ? (
          <Center h={'300px'}>
            <Card.Root minW={'300px'}>
              <Card.Body>
                <VStack>
                  <Heading as='h3'>No Bookmarks</Heading>
                  <BiFileBlank size={'50px'} />
                  <Text fontWeight={400}>Add Some bookmarks by visiting the page you intend to bookmark, <br />then clicking the Jupiter Jots extension and click the bookmark Icon</Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Center>
        ) : null
      }
    </Box>
  )
}

export default BookmarkList


