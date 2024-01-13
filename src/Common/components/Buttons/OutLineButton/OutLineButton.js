import React from 'react'
import { Butto } from './styledComponents'
import Loader from 'react-loader-spinner'

class OutLineButton extends React.Component {
   render() {
      return (
         <React.Fragment>
            <Button {...this.props} />
         </React.Fragment>
      )
   }
}

export { OutLineButton }
