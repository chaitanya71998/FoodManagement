import React from 'react'
import { Button, Oval, Rectangular } from './styledComponents'
import { OutLineButton } from './OutLineButton'
import { observable } from 'mobx'
class Buttons extends React.Component {
   @observable variant = Oval
   static defaultProps = {
      children: 'buttonName',
      disabled: false,
      buttonType: 'outline',
      variant: 'rectangular'
   }

   variantChanges = () => {
      const { variant } = this.props
      if (variant === 'rectangular') {
         this.variant = Rectangular
      } else {
         this.variant = Oval
      }
   }

   render() {
      const { buttonType } = this.props
      switch (buttonType) {
         case 'filled': {
            this.variantChanges()
            return <Button {...this.props} variant={this.variant} />
         }
         case 'outline': {
            this.variantChanges()
            return <OutLineButton {...this.props} variant={this.variant} />
         }
         default: {
            console.warn('warn')
            return null
         }
      }
   }
}

export { Buttons }
