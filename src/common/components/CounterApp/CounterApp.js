import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import {
   Container,
   IncrementButton,
   Input,
   DecrementButton,
   Group
} from './styledComponents'

@observer
class CounterApp extends React.Component {
   @observable count = 0

   onIncrement = () => {
      const { onChangeQuantity } = this.props
      this.count++
      onChangeQuantity(this.count)
   }
   onDecrement = () => {
      const { onChangeQuantity } = this.props
      this.count--
      onChangeQuantity(this.count)
   }

   render() {
      return (
         <Container>
            <Group>
               <IncrementButton onClick={this.onIncrement}>+</IncrementButton>
               <Input>{this.count}</Input>
               <DecrementButton onClick={this.onDecrement}>-</DecrementButton>
            </Group>
         </Container>
      )
   }
}
export default CounterApp
