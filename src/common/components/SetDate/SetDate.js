import React, { Component } from 'react'
import Calendar from 'react-calendar'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Container, SelectDate } from './styledComponent'

@observer
class SetDate extends Component {
   @observable date
   @observable isCalenderShowed = false

   componentDidMount() {

      let date = new Date(),
         month = '' + (date.getMonth() + 1),
         day = '' + date.getDate(),
         year = date.getFullYear();

      if (month.length < 2)
         month = '0' + month;
      if (day.length < 2)
         day = '0' + day;

      this.date = [year, month, day].join('-');
   }

   @action.bound
   onChangeDate(event) {
      this.date = event.target.value
   }

   render() {
      return (
         <Container>
          <SelectDate defaultValue={this.date} type="date" onChange={this.onChangeDate}/>
         </Container>
      )
   }
}

export { SetDate }
