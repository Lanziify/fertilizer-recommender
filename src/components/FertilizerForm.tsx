import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { formValidatoinSchemna } from '../utils/validation'
import { formInitialValues } from '../data/values'
import blackSoil from '../assets/soil/blacksoil.jpg'
import redSoil from '../assets/soil/redsoil.jpg'
import mediumBrownSoil from '../assets/soil/mediumbrown.jpg'
import darkBrownSoil from '../assets/soil/darkbrownsoil.jpg'
import reddishBrownSoil from '../assets/soil/redishbrown.jpg'
import sugarcane from '../assets/crops/sugarcane.jpg'
import cotton from '../assets/crops/cotton.jpg'
import rice from '../assets/crops/rice.jpg'
import wheat from '../assets/crops/wheat.jpg'
import maize from '../assets/crops/maize.jpg'
// import masoor from '../assets/crops/masoor.jpg'
import soybean from '../assets/crops/soybean.jpg'
import ginger from '../assets/crops/ginger.jpg'
import turmeric from '../assets/crops/turmeric.jpg'
import axios from 'axios'
import React from 'react'

interface FormValues {
  soil_color: string | number
  nitrogen: string | number
  phosphorus: string | number
  potassium: string | number
  pH: string | number
}

function FertilizerForm() {
  const [responseContent, setResponseContent] = React.useState({
    fertilizer: '',
    description: '',
  })

  const soils = [
    {
      name: 'Black',
      imgsrc: blackSoil,
    },
    {
      name: 'Red',
      imgsrc: redSoil,
    },
    {
      name: 'Medium Brown',
      imgsrc: mediumBrownSoil,
    },
    {
      name: 'Dark Brown',
      imgsrc: darkBrownSoil,
    },
    {
      name: 'Reddish Brown',
      imgsrc: reddishBrownSoil,
    },
  ]

  const crops = [
    {
      name: 'Sugarcane',
      imgsrc: sugarcane,
    },
    {
      name: 'Cotton',
      imgsrc: cotton,
    },
    {
      name: 'Rice',
      imgsrc: rice,
    },
    {
      name: 'Wheat',
      imgsrc: wheat,
    },
    {
      name: 'Corn',
      imgsrc: maize,
    },
    {
      name: 'Soybean',
      imgsrc: soybean,
    },
    {
      name: 'Ginger',
      imgsrc: ginger,
    },
    {
      name: 'Turmeric',
      imgsrc: turmeric,
    },
  ]

  const fields = [
    {
      name: 'nitrogen',
      placeholder: 'Nitrogen',
    },
    {
      name: 'phosphorus',
      placeholder: 'Phosphorus',
    },
    {
      name: 'potassium',
      placeholder: 'Potassium',
    },
    {
      name: 'pH',
      placeholder: 'pH',
    },
  ]

  const handleSubmit = async (
    values: FormValues
    // {resetForm, setSubmitting}
  ) => {
    try {
      const result = await axios.post('http://localhost:5000/recommend', {
        ...values,
      })
      setResponseContent({ ...result.data })
      console.log()
    } catch (error) {}
  }

  const isResponseContentEmpty = () => {
    return Object.values(responseContent).some((value) => value !== '')
  }

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidatoinSchemna}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Box>
            <Form>
              <Stack
                padding={4}
                spacing={4}
                textAlign="center"
                transition="height 0.5s"
              >
                <Heading fontSize={{ base: '4xl', lg: '4xl', xl: '4xl' }}>
                  Get Recommendations Right Away
                </Heading>
                <Text>
                  Please take a moment to provide us with some information about
                  your soil, crops, and other relevant details. This information
                  will enable us to generate customized recommendations tailored
                  to your unique requirements.
                </Text>
                <FormControl isInvalid={!!errors.crop && touched.crop}>
                  <Text as="span" fontWeight="bold">
                    Select Crop
                  </Text>
                  <SimpleGrid
                    minChildWidth={{
                      base: '100px',
                      sm: '200px',
                      md: '200px',
                      lg: '200px',
                    }}
                    mt={2}
                    spacing={4}
                  >
                    {crops.map((crop, index) => (
                      <Box
                        key={index}
                        cursor="pointer"
                        position="relative"
                        rounded="2xl"
                        sx={{
                          '&:hover': {
                            opacity: 1,
                            '& > :first-of-type': {
                              transform: 'scale(1.125)',
                            },
                            '& > :last-child': {
                              opacity: 1,
                              transform: `translate(${-50}%, ${-50}%)`,
                            },
                            '&:after': {
                              opacity: 1,
                            },
                          },
                          '& > :first-of-type': {
                            transform:
                              typeof values.crop === 'number' &&
                              values.crop === index
                                ? 'scale(1.125)'
                                : 'scale(1)',
                            transition: 'all 0.3s ease',
                          },
                          '& > :last-child': {
                            opacity:
                              typeof values.crop === 'number' &&
                              values.crop === index
                                ? 1
                                : 0,
                            position: 'absolute',
                            textColor: 'white',
                            top: `${50}%`,
                            left: `${50}%`,
                            transform:
                              typeof values.crop === 'number' &&
                              values.crop === index
                                ? `translate(${-50}%, ${-50}%)`
                                : `translate(${-50}%, ${0}%)`,
                            transition: 'all 0.3s ease',
                            zIndex: 2,
                          },
                          '&:after': {
                            content: "''",
                            opacity:
                              typeof values.crop === 'number' &&
                              values.crop === index
                                ? 1
                                : 0,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backdropFilter: 'blur(2px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.3s ease',
                            zIndex: 1,
                          },
                          overflow: 'hidden',
                        }}
                        onClick={() => {
                          if (isResponseContentEmpty()) return
                          setFieldValue('crop', index)
                        }}
                      >
                        <Image
                          width="full"
                          aspectRatio={1}
                          objectFit="cover"
                          src={crop.imgsrc}
                          alt={crop.name}
                          loading="lazy"
                        />
                        <Text fontWeight="bold" textAlign="center">
                          {crop.name}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <FormErrorMessage>{errors.crop}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={!!errors.soil_color && touched.soil_color}
                >
                  <Text as="span" fontWeight="bold">
                    Select Soil Color
                  </Text>
                  <SimpleGrid minChildWidth="100px" mt={2} spacing={4}>
                    {soils.map((soil, index) => (
                      <Box
                        key={index}
                        cursor="pointer"
                        position="relative"
                        rounded="2xl"
                        overflow="hidden"
                        sx={{
                          '&:hover': {
                            opacity: 1,
                            '& > :first-of-type': {
                              transform: 'scale(1.125)',
                            },
                            '& > :last-child': {
                              opacity: 1,
                              transform: `translate(${-50}%, ${-50}%)`,
                            },
                            '&:after': {
                              opacity: 1,
                            },
                          },
                          '& > :first-of-type': {
                            transform:
                              typeof values.soil_color === 'number' &&
                              values.soil_color === index
                                ? 'scale(1.125)'
                                : 'scale(1)',
                            transition: 'all 0.3s ease',
                          },
                          '& > :last-child': {
                            opacity:
                              typeof values.soil_color === 'number' &&
                              values.soil_color === index
                                ? 1
                                : 0,
                            position: 'absolute',
                            textColor: 'white',
                            top: `${50}%`,
                            left: `${50}%`,
                            transform:
                              typeof values.soil_color === 'number' &&
                              values.soil_color === index
                                ? `translate(${-50}%, ${-50}%)`
                                : `translate(${-50}%, ${0}%)`,
                            transition: 'all 0.3s ease',
                            zIndex: 2,
                          },
                          '&:after': {
                            content: "''",
                            opacity:
                              typeof values.soil_color === 'number' &&
                              values.soil_color === index
                                ? 1
                                : 0,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backdropFilter: 'blur(2px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            transition: 'all 0.3s ease',
                            zIndex: 1,
                          },
                        }}
                        onClick={() => {
                          if (isResponseContentEmpty()) return
                          setFieldValue('soil_color', index)
                        }}
                      >
                        <Image
                          width="full"
                          aspectRatio={1}
                          objectFit="cover"
                          src={soil.imgsrc}
                          alt={soil.name}
                        />
                        <Text fontWeight="bold" textAlign="center">
                          {soil.name}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <FormErrorMessage>{errors.soil_color}</FormErrorMessage>
                </FormControl>

                <Text as="span" fontWeight="bold">
                  Other Properties
                </Text>

                {fields.map((field, index) => (
                  <FormControl
                    key={index}
                    variant="floating"
                    isInvalid={
                      !!errors[field.name as keyof FormValues] &&
                      touched[field.name as keyof FormValues]
                    }
                  >
                    <Field
                      as={Input}
                      name={field.name}
                      placeholder=""
                      borderWidth={2}
                      borderColor="gray.300"
                      readOnly={isResponseContentEmpty()}
                    />
                    <FormLabel>{field.placeholder}</FormLabel>
                    <FormErrorMessage>
                      {errors[field.name as keyof FormValues]}
                    </FormErrorMessage>
                  </FormControl>
                ))}

                <Collapse
                  startingHeight={0.1}
                  in={isResponseContentEmpty()}
                  animateOpacity
                >
                  <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    rounded="md"
                  >
                    <CloseButton
                      position="absolute"
                      right={1}
                      top={1}
                      onClick={() => {
                        setResponseContent({
                          fertilizer: '',
                          description: '',
                        })
                      }}
                    />
                    <Stack>
                      <AlertTitle fontSize="2xl">
                        {responseContent.fertilizer}
                      </AlertTitle>
                      <AlertDescription lineHeight={1.6}>
                        {responseContent.description}
                      </AlertDescription>
                    </Stack>
                  </Alert>
                </Collapse>

                <Button
                  colorScheme="blue"
                  type="submit"
                  isDisabled={isSubmitting || isResponseContentEmpty()}
                  isLoading={isSubmitting}
                  // hidden={isResponseContentEmpty()}
                >
                  Confirm
                </Button>
              </Stack>
            </Form>
          </Box>
        )}
      </Formik>
    </>
  )
}

export default FertilizerForm
