import * as yup from 'yup'

export  const formValidatoinSchemna = yup.object().shape({
  soil_color: yup
    .number()
    .typeError('Invalid input type. Please try again.')
    .required('Please select the type of soil')
    .min(0, 'Please select the type of soil'),
  nitrogen: yup
    .number()
    .typeError('Invalid input type. Please try again.')
    .required('Please provide the nitrogen level')
    .min(40, 'Current value does not meet the minimum level required'),
  phosphorus: yup
    .number()
    .typeError('Invalid input type. Please try again.')
    .required('Please provide the phosphorus level')
    .min(1, 'Current value does not meet the minimum level required'),
  potassium: yup
    .number()
    .typeError('Invalid input type. Please try again.')
    .required('Please provide the potassium level')
    .min(1, 'Current value does not meet the minimum level required'),
  pH: yup
    .number()
    .typeError('Invalid input type. Please try again.')
    .required('Please provide the pH level')
    .min(6.5, 'Current value does not meet the minimum level required'),
  crop: yup
    .number()
    .typeError('Invalid input type. Please try again.')
    .required('Please select the type of crop')
    .min(0, 'Please select the type of crop'),
})
