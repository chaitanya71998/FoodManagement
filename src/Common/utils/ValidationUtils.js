export function validateTextInputField(value) {
   if (value === '') {
      return {
         shouldShowErrorMessage: true,
         errorMessage: '*required'
      }
   } else if (value.length > 6) {
      return {
         shouldShowErrorMessage: false,
         errorMessage: ''
      }
   } else {
      return {
         shouldShowErrorMessage: true,
         errorMessage: 'enter at least 6 characters'
      }
   }
}
