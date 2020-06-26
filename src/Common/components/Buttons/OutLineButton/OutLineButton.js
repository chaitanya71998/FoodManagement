import React from 'react'
import { Button } from './styledComponents'
import Loader from 'react-loader-spinner'

class OutLineButton extends React.Component {
   static defaultProps = {
      children: 'buttonName',
      disabled: false,
      isLoading: false
   }
   render() {
      console.log('outline render')
      return (
         <React.Fragment>
            <Button {...this.props} />
         </React.Fragment>
      )
   }
}

export { OutLineButton }
