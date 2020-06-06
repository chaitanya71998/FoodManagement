import eachHourOfInterval from 'date-fns/eachHourOfInterval'
import formatDistance from 'date-fns/formatDistance'
import isBefore from 'date-fns/isBefore'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import format from 'date-fns/format'

export function getTimeDistanceInWords(deadLine) {
   let result = formatDistanceToNow(new Date(deadLine))
   return result
}

export function isTimeBeforeDeadLine(deadLine) {
   return isBefore(new Date(), new Date(deadLine))
}

export function setDateFormate(date) {
   return format(new Date(date), 'yyyy-MM-dd')
}
