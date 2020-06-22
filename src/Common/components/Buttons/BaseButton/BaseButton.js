import React from 'react'
import { ButtonWrapper, ButtonText } from './styledComponents'
import Loader from 'react-loader-spinner'
class BaseButton extends React.Component {
    static defaultProps = {
        children: 'buttonName',
        disabled: false,
        isLoading: false
    }
    render() {
        const {
            children,
            onClick,
            disabled
        } = this.props
        return (
            <ButtonWrapper
            onClick={onClick}
            disabled={disabled}
         >
        <ButtonText>{children}</ButtonText>
         </ButtonWrapper>
        )
    }
}

export { BaseButton }
