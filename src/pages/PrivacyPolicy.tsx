'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link,
  Table,
  List,
} from "@chakra-ui/react"
import InternalPageHero from "../components/InternalPageHero"

export default function PrivacyPolicy() {
  return (
    <>
      <InternalPageHero title="Privacy Policy" description="Privacy Policy for Jupiter Jots" />
      <Container w={'100%'} py={10}>
        <VStack gap={8} align="stretch">
          <Text>Effective Date: 28<sup>TH</sup> November, 2024</Text>
          <Box>
            <Heading as="h2" size="xl" mb={4}>Introduction</Heading>
            <Text>
              Jupiter Jots ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our browser extension. By using Jupiter Jots, you agree to the terms outlined in this policy.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>Permissions Justification</Heading>
            <Text mb={4}>
              To provide a seamless and efficient bookmarking experience, Jupiter Jots requests the following permissions:
            </Text>
            <Table.Root mb={4}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Permission</Table.ColumnHeader>
                  <Table.ColumnHeader>Purpose</Table.ColumnHeader>
                  <Table.ColumnHeader>Security</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Storage</Table.Cell>
                  <Table.Cell>To store your bookmarks, collections, tags, and related settings in your browser's local storage or indexedDB.</Table.Cell>
                  <Table.Cell>We ensure your data is stored locally and not shared with external servers without your consent.</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>activeTab</Table.Cell>
                  <Table.Cell>To interact with the current tab, enabling you to bookmark the webpage you're currently viewing.</Table.Cell>
                  <Table.Cell>This permission is limited to the active tab you are using Jupiter Jots on and does not track other tabs.</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>tabs</Table.Cell>
                  <Table.Cell>To retrieve basic information about your open tabs, enhancing features like bulk bookmarking or bookmark categorization.</Table.Cell>
                  <Table.Cell>Data about your tabs is processed locally and not transmitted elsewhere.</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>scripting</Table.Cell>
                  <Table.Cell>To enable interactive features, such as highlighting sections of a page for quick reference or adding bookmarks via contextual menus. Also to allow read specific page meta such as titles, description, and opengraph image.</Table.Cell>
                  <Table.Cell>Scripts run only when explicitly triggered by the user.</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>sidePanel</Table.Cell>
                  <Table.Cell>To provide an easy-to-use interface for managing and organizing your bookmarks within the browser's side panel.</Table.Cell>
                  <Table.Cell>The panel operates entirely within the browser environment and does not connect to external systems.</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>Information We Collect</Heading>
            <Text fontWeight="bold" mb={2}>Data You Provide:</Text>
            <List.Root mb={4}>
              <List.Item>Bookmarks, tags, and collections you create using the extension.</List.Item>
              <List.Item>Personal preferences and settings stored within the extension.</List.Item>
            </List.Root>
            <Text fontWeight="bold" mb={2}>Automatically Collected Data:</Text>
            <List.Root mb={4}>
              <List.Item>Browser version and platform to ensure compatibility.</List.Item>
              <List.Item>Usage data to improve extension features (if you opt-in to analytics).</List.Item>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>How We Use Your Information</Heading>
            <Text>
              We use your information solely to provide and improve the functionality of Jupiter Jots. Your data is not shared, sold, or rented to third parties.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>Data Security</Heading>
            <Text mb={2}>We employ robust security measures to protect your data, including:</Text>
            <List.Root>
              <List.Item>Storing all user data locally in indexedDB within your browser.</List.Item>
              <List.Item>Encrypting sensitive information when applicable.</List.Item>
              <List.Item>Conducting regular security reviews of our codebase.</List.Item>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>User Rights</Heading>
            <Text mb={2}>You have the right to:</Text>
            <List.Root>
              <List.Item>Access and review your data stored in the extension.</List.Item>
              <List.Item>Delete all data by uninstalling the extension.</List.Item>
              <List.Item>Contact us for support or questions at support@livesoftwaredeveloper.com</List.Item>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>Changes to this Policy</Heading>
            <Text>
              We may update this Privacy Policy from time to time. Changes will be communicated via the extension or on our website. Continued use of Jupiter Jots signifies acceptance of the updated terms.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>Contact Us</Heading>
            <Text>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <Link href="mailto:support@livesoftwaredeveloper.com" color="blue.500">support@livesoftwaredeveloper.com</Link>.
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  )
}

