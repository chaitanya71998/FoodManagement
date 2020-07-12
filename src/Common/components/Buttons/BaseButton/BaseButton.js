/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { ButtonWrapper, ButtonText, CSSUsage } from './styledComponents'
import Loader from 'react-loader-spinner'
class BaseButton extends React.Component {
   // static defaultProps = {
   //    children: 'buttonName',
   //    disabled: false,
   //    isLoading: false
   // }
   render() {
      const { children, onClick, disabled, variant, className } = this.props

      return (
         <ButtonWrapper
            onClick={onClick}
            disabled={disabled}
            css={variant}
            className={className}
         >
            {children}
         </ButtonWrapper>
      )
   }
}

export { BaseButton }
