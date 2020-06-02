import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Container, SelectDate } from './styledComponents'

@observer
class SetDate extends Component {
   render() {
      const { selectedDate, onChangeDate } = this.props
      return (
         <Container>
            <SelectDate
               defaultValue={selectedDate}
               type='date'
               onChange={onChangeDate}
            />
         </Container>
      )
   }
}

export { SetDate }
