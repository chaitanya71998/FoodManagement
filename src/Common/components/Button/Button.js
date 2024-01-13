import React from 'react'
import { ButtonKind, ButtonText } from './styledComponents'
import Loader from 'react-loader-spinner'
class Button extends React.Component {
   static defaultProps = {
      width: '100%',
      backgroundColor: '#1db05f',
      children: 'buttonName',
      color: 'white',
      getAPIStatus: 0,
      disabled: false,
      isLoading: false
   }
   render() {
      const {
         width,
         backgroundColor,
         children,
         color,
         onClick,
         getAPIStatus,
         isLoading,
         disabled,
         className
      } = this.props
      return (
         <ButtonKind
            width={width}
            backgroundColor={backgroundColor}
            color={color}
            onClick={onClick}
            disabled={disabled}
            className={className}
         >
            {getAPIStatus === 100 || isLoading ? (
               <Loader type='Oval' color='#333300' height={20} width={20} />
            ) : (
               <ButtonText>{children}</ButtonText>
            )}
         </ButtonKind>
      )
   }
}

export { Button }
