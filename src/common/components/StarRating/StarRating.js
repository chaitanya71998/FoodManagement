import React, { Component } from 'react';
import StarsRating from 'stars-rating'
//import { AiOutlineStar } from 'react-icons/ai';
class StarRating extends Component {

    ratingChanged = (newRating) => {
        console.log("new Rating", newRating)
    }
    render() {
        return (

            <StarsRating
  count={5}
  onChange={this.ratingChanged}
  size={24}
  color2={'#ffd700'} />

        )
    }
}

export { StarRating }
