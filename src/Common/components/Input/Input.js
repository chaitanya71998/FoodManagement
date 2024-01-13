/** @jsx jsx */
import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { jsx } from '@emotion/core'

import {
   InputFiled,
   InputFiledWrapper
} from '../InputTextField/styledComponents'
import { validateTextInputField } from '../../utils/ValidationUtils'
@observer
class Input extends React.Component {
   @observable shouldShowErrorMessage = false
   @observable errorMessage = ''

   static defaultProps = {
      type: 'text',
      placeholder: 'Input',
      value: ''
   }

   render() {
      const {
         type,
         placeholder,
         value,
         onChange,
         forwardRef,
         inputBorder
      } = this.props
      return (
         <InputFiled
            css={inputBorder}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={forwardRef}
         />
      )
   }
}

export { Input }
