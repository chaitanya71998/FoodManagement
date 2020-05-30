import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Container, SelectDate } from './styledComponent'

@observer
class SetDate extends Component {
   render() {
      const { date, onChangeDate } = this.props
      return (
         <Container>
            <SelectDate
               defaultValue={date}
               type='date'
               onChange={onChangeDate}
            />
         </Container>
      )
   }
}

export { SetDate }
