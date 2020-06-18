import React from 'react'
import { InputFiled } from './styledComponents'
class Input extends React.Component {
   static defaultProps = {
      type: 'text',
      placeholder: 'Input',
      value: ''
   }
   render() {
      const { type, placeholder, value, onChange, onKeyDown } = this.props
      return (
         <InputFiled
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
         />
      )
   }
}

export { Input }
