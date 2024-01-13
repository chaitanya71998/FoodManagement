import React from 'react'
import { Button } from './styledComponents'
import Loader from 'react-loader-spinner'

class LoadingButton extends React.Component {
   render() {
      return (
         <React.Fragment>
            <Button {...this.props}>
               {isLoading ? (
                  <Loader type='Oval' color='#333300' height={20} width={20} />
               ) : (
                  <ButtonText>{children}</ButtonText>
               )}
            </Button>
         </React.Fragment>
      )
   }
}

export { LoadingButton }
