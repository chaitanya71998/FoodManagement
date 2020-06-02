import eachHourOfInterval from 'date-fns/eachHourOfInterval'
import formatDistance from 'date-fns/formatDistance'


// let result = formatDistance(

//   new Date('2020-06-02 19:45:00'),
//   new Date(), { addSuffix: true }
// )
// console.log("result", result)
// let result1 = isBefore(new Date("2020-06-02 18:47:00"), new Date("2020-06-02 18:48:00"))
// console.log("result1", result1)

export function getTimeDistanceInWords(deadLine) {
    return formatDistance(

        new Date(deadLine),
        new Date(), { addSuffix: true }
    )
}

export function isTimeBeforeDeadLine() {

}
