import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
var moment = require('moment') // require

@observer
class SetTimer extends React.Component {
   @observable timeLeft = null
   componentDidMount() {
      setInterval(() => {
         const { deadLine } = this.props
         const currentDate = moment()
         const future = moment('2020-06-01 16:00:00')
         const time = moment.duration('05:30:00')
         future.subtract(time)
         this.timeLeft = moment(future.diff(currentDate)).format('HH:mm:ss')
      }, 1000)
   }
   render() {
      return <div>{this.timeLeft}</div>
   }
}

export { SetTimer }

//'2020-06-02T11:50-0500'
