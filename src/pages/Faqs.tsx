
import { Box, Container, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { ComingSoonPlaceholder } from '../components/ComingSoonPlaceholder'
import InternalPageHero from '../components/InternalPageHero'
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '../components/ui/accordion'

const faqs = [
  {
    "id": "1",
    "title": "Can I delete bookmarks, tags, and collections separately?",
    "text": "Yes, Jupiter Jots allows you to delete bookmarks, tags, and collections independently. You can manage these through their respective sections in the extension."
  },
  {
    "id": "2",
    "title": "Which browsers are supported?",
    "text": "Currently, Jupiter Jots is only supported on Chrome. We plan to expand support to other browsers in the future."
  },
  {
    "id": "3",
    "title": "Is sharing bookmarks as a collection possible?",
    "text": "Sharing bookmarks as a collection is not yet available. However, it is an upcoming feature, so stay tuned for updates!"
  },
  {
    "id": "4",
    "title": "How can I filter bookmarks by collection or tag?",
    "text": "You can use the search/filter form within the extension to filter bookmarks by collection(s) or tag(s) quickly and efficiently."
  },
  {
    "id": "5",
    "title": "How do I add, update, or delete tags and collections?",
    "text": "Use the filters and collections popup to manage your tags and collections. This includes adding, updating, or deleting them as needed."
  },
  {
    "id": "6",
    "title": "What is the purpose of the settings icon?",
    "text": "The settings icon allows you to change the theme, modify settings, or access links to FAQs, Privacy Policy, Terms and Conditions, and more."
  },
  {
    "id": "7",
    "title": "How can I delete all data from Jupiter Jots?",
    "text": "To delete all data stored by Jupiter Jots, use the settings icon and select the appropriate option to clear your data."
  },
  {
    "id": "8",
    "title": "Where is my data stored?",
    "text": "All data, including bookmarks, tags, and collections, is stored locally in your browser using indexedDB. This ensures privacy and control over your data."
  },
  {
    "id": "9",
    "title": "Can I organize my bookmarks into collections?",
    "text": "Yes, Jupiter Jots allows you to create collections to organize your bookmarks efficiently. You can add, edit, or delete collections as needed."
  },
  {
    "id": "10",
    "title": "Can I use Jupiter Jots offline?",
    "text": "Yes, Jupiter Jots works offline since all data is stored locally in your browser. You can access and manage your bookmarks without an internet connection."
  },
  {
    "id": "11",
    "title": "Will my data sync across devices?",
    "text": "Currently, data syncing across devices is not supported. We are exploring this feature for future updates."
  },
  {
    "id": "12",
    "title": "How do I change the theme of Jupiter Jots?",
    "text": "To change the theme, click the settings icon and select the theme option. Choose from the available themes to customize your experience."
  },
  {
    "id": "13",
    "title": "Does Jupiter Jots collect any personal information?",
    "text": "No, Jupiter Jots does not collect or share any personal information. All data remains securely stored within your browser."
  },
  {
    "id": "14",
    "title": "Can I import or export bookmarks?",
    "text": "Importing and exporting bookmarks is not yet available, but it’s a feature we are considering for future versions of Jupiter Jots."
  },
  {
    "id": "15",
    "title": "How do I report an issue or provide feedback?",
    "text": "We value your feedback! Use the settings menu to find the support or feedback option, or contact us directly at support@livesoftwaredeveloper.com"
  }
]



const Faqs = () => {
  return (
    <>
      {/* <InternalPageHero title="FAQs" description="Frequently Asked Questions" /> */}
      <Container maxW={'breakpoint-lg'} py={10}>
        <VStack textAlign={'center'} gap={'6'}>
          <Text fontWeight={500}>
            Support
          </Text>
          <Heading as={'h2'} size={{ base: '2xl', md: '4xl' }}>
            Got Questions? We've Got <br /> Answers!
          </Heading>
          <Text fontWeight={500}>
            We've gathered all the answers you're looking for, neatly organized just for you.
          </Text>
        </VStack>
        <Spacer h={10} />
        <AccordionRoot collapsible defaultValue={["1"]} variant={'enclosed'} size={'lg'}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={faq.id}>
              <AccordionItemTrigger>{faq.title}</AccordionItemTrigger>
              <AccordionItemContent>{faq.text}</AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Container>
    </>
  )
}

export default Faqs