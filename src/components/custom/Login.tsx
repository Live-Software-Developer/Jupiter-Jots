import React from 'react'
import { Box, Button, Input, VStack } from '@chakra-ui/react'

interface LoginProps {
  onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the credentials
    // For now, we'll just call onLogin
    onLogin()
  }

  return (
    <Box margin="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack gap={4}>
          {/* <FormControl isRequired>
            <FormLabel>Email</FormLabel> */}
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          {/* </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel> */}
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          {/* </FormControl> */}
          <Button type="submit" colorScheme="blue" width="full">
            Log In
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Login

