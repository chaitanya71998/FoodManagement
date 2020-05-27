import React from 'react'
import { InputFiled } from './styledComponent'
class Input extends React.Component {
    static defaultProps = {
        type: 'text',
        placeholder: "Input"
    };
    render() {
        const { type, placeholder } = this.props
        return (
            <InputFiled 
            type={type}
            placeholder={placeholder}
            />
        )
    }

}

export { Input }
