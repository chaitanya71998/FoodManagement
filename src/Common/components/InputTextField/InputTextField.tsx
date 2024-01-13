import React from 'react'
import { InputFiled, InputFiledWrapper, ErrorMessage } from './styledComponents'
import { validateTextInputField } from '../../utils/ValidationUtils'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

interface InputTextFieldProps {
   type: string
   placeholder: string
   value: string
   onChange: Function
}
@observer
class InputTextField extends React.Component<InputTextFieldProps> {
   @observable value: string = ''
   @observable shouldShowErrorMessage: boolean = false
   @observable errorMessage: string = ''

   static defaultProps = {
      type: 'text',
      placeholder: 'Input',
      value: ''
   }

   onChange = event => {
      const { onChange } = this.props
      this.value = event.target.value
      onChange(this.value)
      this.onBlur()
   }

   onBlur = () => {
      const { shouldShowErrorMessage, errorMessage } = validateTextInputField(
         this.value
      )
      this.shouldShowErrorMessage = shouldShowErrorMessage
      this.errorMessage = errorMessage
   }

   render() {
      const { placeholder, value } = this.props

      return (
         <InputFiledWrapper>
            <InputFiled
               placeholder={placeholder}
               value={this.value}
               onChange={this.onChange}
               onBlur={this.onBlur}
            />
            {this.shouldShowErrorMessage && (
               <ErrorMessage>{this.errorMessage}</ErrorMessage>
            )}
         </InputFiledWrapper>
      )
   }
}

export { InputTextField }
