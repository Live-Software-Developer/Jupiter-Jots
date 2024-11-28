'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  ListItem,
  Link,
  List,
} from "@chakra-ui/react"
import InternalPageHero from "../components/InternalPageHero"

export default function TermsAndConditions() {
  return (
    <>
      <InternalPageHero title="Terms & Conditions" description="Terms and Conditions for Jupiter Jots" />
      <Container w={'100%'} py={10}>
        <VStack gap={8} align="stretch">
          <Text>Effective Date: 28<sup>TH</sup> November, 2024</Text>
          <Text>Last Updated: 28<sup>TH</sup> November, 2024</Text>

          <Box>
            <Heading as="h2" size="xl" mb={4}>1. Introduction</Heading>
            <Text>
              Welcome to Jupiter Jots ("we," "us," "our"). By installing and using our web extension, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use Jupiter Jots.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>2. Use of the Extension</Heading>
            <Text fontWeight="bold" mb={2}>Eligibility:</Text>
            <List.Root mb={4}>
              <ListItem>You must be at least 18 years old or have the consent of a parent or legal guardian to use Jupiter Jots.</ListItem>
              <ListItem>Your use of the extension must comply with applicable laws and regulations.</ListItem>
            </List.Root>
            <Text fontWeight="bold" mb={2}>License to Use:</Text>
            <List.Root mb={4}>
              <ListItem>We grant you a non-exclusive, revocable, and limited license to use Jupiter Jots for personal or professional use.</ListItem>
              <ListItem>You may not resell, modify, or redistribute the extension without our explicit permission.</ListItem>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>3. Permissions and User Responsibilities</Heading>
            <Text mb={4}>
              To function effectively, Jupiter Jots requires certain browser permissions as detailed in our Privacy Policy. By granting these permissions, you acknowledge:
            </Text>
            <List.Root mb={4}>
              <ListItem>The permissions are necessary for the extension's intended functionality.</ListItem>
              <ListItem>You are responsible for the security of your browser and device.</ListItem>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>4. Data Storage and Privacy</Heading>
            <Text>
              All data (including bookmarks, collections, and tags) is stored locally in your browser's indexedDB. We do not access, store, or transmit your data to external servers without your consent. Please review our Privacy Policy for more details.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>5. Prohibited Activities</Heading>
            <Text mb={2}>You agree not to:</Text>
            <List.Root>
              <ListItem>Reverse-engineer, decompile, or tamper with the Jupiter Jots extension.</ListItem>
              <ListItem>Use the extension to store or share illegal, malicious, or harmful content.</ListItem>
              <ListItem>Exploit the extension to harm others or violate third-party rights.</ListItem>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>6. Intellectual Property</Heading>
            <List.Root>
              <ListItem>All intellectual property rights in Jupiter Jots, including its code, design, and branding, remain our property.</ListItem>
              <ListItem>Unauthorized use of our intellectual property is strictly prohibited.</ListItem>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>7. Limitation of Liability</Heading>
            <Text mb={4}>
              Jupiter Jots is provided "as is" without any warranties, express or implied. We do not guarantee uninterrupted or error-free performance.
            </Text>
            <List.Root>
              <ListItem>To the maximum extent permitted by law, we are not liable for damages arising from your use or inability to use the extension.</ListItem>
              <ListItem>This includes, but is not limited to, loss of data, device damage, or business interruptions.</ListItem>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>8. Indemnification</Heading>
            <Text>
              You agree to indemnify and hold us harmless from any claims, liabilities, or expenses arising from your misuse of the extension or breach of these terms.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>9. Updates and Modifications</Heading>
            <Text mb={4}>
              We may update these Terms and Conditions or modify the functionality of Jupiter Jots at any time.
            </Text>
            <List.Root>
              <ListItem>Updates will be communicated via the extension or our website.</ListItem>
              <ListItem>Continued use of the extension constitutes your acceptance of the updated terms.</ListItem>
            </List.Root>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>10. Termination</Heading>
            <Text>
              We reserve the right to terminate your use of Jupiter Jots at our discretion if you violate these terms or engage in prohibited activities.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>11. Governing Law</Heading>
            <Text>
              These Terms and Conditions are governed by the laws of [Your Country/Region]. Any disputes will be resolved in the courts of [Your Jurisdiction].
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="xl" mb={4}>12. Contact Information</Heading>
            <Text>
              For questions or support, please contact us at:{' '}
              <Link href="mailto:support@livesoftwaredeveloper.com" color="blue.500">support@livesoftwaredeveloper.com</Link>.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold">
              By using Jupiter Jots, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  )
}

