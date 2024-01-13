import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Container, SelectDate } from './styledComponents'

@observer
class SetDate extends Component {
   onChangeDate = event => {
      const { onChangeDate } = this.props
      onChangeDate(event.target.value)
   }
   render() {
      const { selectedDate } = this.props
      return (
         <Container>
            <SelectDate
               defaultValue={selectedDate}
               type='date'
               onChange={this.onChangeDate}
            />
         </Container>
      )
   }
}

export { SetDate }
