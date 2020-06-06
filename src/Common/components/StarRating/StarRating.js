import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Rating } from 'semantic-ui-react'

class StarRating extends React.Component {
   onChangeRating = (event, data) => {
      const { onChangeRating } = this.props
      onChangeRating(data.rating)
   }
   render() {
      return (
         <Rating
            icon='star'
            defaultRating={0}
            maxRating={5}
            onRate={this.onChangeRating}
         />
      )
   }
}

export default StarRating
