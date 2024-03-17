import { Stack, Heading, Text, Button } from '@chakra-ui/react'
import './App.css'
import FertilizerForm from './components/FertilizerForm'
import React from 'react'
import backgroundOverlay from './assets/backgroundoverlay.jpg'

const App = () => {
  const formRef = React.useRef(null)

  const handleScrollToView = () => {
    if (formRef.current) {
      ;(formRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Stack>
      <Stack
        minHeight="100vh"
        sx={{
          '&:before': {
            content: "''",
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundImage: `url(${backgroundOverlay})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            zIndex: -2,
          },
          '&:after': {
            content: "''",
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: -1,
          },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack
          maxWidth="2xl"
          margin="auto"
          color="white"
          textAlign="center"
          padding={4}
        >
          <Heading
            fontSize={{ base: '5xl', lg: '6xl', xl: '6xl' }}
            textTransform="uppercase"
            fontWeight={900}
          >
            Fertilizer Recommender
          </Heading>
          <Heading fontSize="2xl" mb={8}>
            Your Personalized Guide to Optimal Growth
          </Heading>
          <Text>
            Are you ready to unlock the full potential of your garden or farm?
            Look no further! Fertilize Recommender is here to revolutionize the
            way you approach fertilization. Our cutting-edge platform leverages
            advanced algorithms and expert knowledge to provide you with
            personalized fertilizer recommendations tailored to your specific
            needs.
          </Text>
          <Button
            variant="outline"
            _hover={{
              backgroundColor: '#48BB78',
              borderColor: '#48BB78',
              color: 'white',
            }}
            color="white"
            mt={4}
            onClick={handleScrollToView}
          >
            Try now
          </Button>
        </Stack>
      </Stack>
      <Stack maxWidth="3xl" margin="auto" ref={formRef}>
        <FertilizerForm />
      </Stack>
    </Stack>
  )
}

export default App
