import React from 'react'
import { ButtonKind, ButtonText } from './styledComponent'
import { BrightBlue } from '../../themes/Colors'
import Loader from 'react-loader-spinner'
class Button extends React.Component {
   static defaultProps = {
      width: '100%',
      backgroundColor: '#1db05f',
      children: 'buttonName',
      color: 'white',
      getAPIStatus: 0
   }
   render() {
      const {
         width,
         backgroundColor,
         children,
         color,
         onClick,
         getAPIStatus
      } = this.props
      return (
         <ButtonKind
            width={width}
            backgroundColor={backgroundColor}
            color={color}
            onClick={onClick}
         >
            {getAPIStatus === 100 ? (
               <Loader type='Oval' color='white' height={30} width={30} />
            ) : (
               <ButtonText>{children}</ButtonText>
            )}
         </ButtonKind>
      )
   }
}

export { Button }
