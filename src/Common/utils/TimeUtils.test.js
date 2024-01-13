/*global expect*/
import React from 'react'
import {
   getTimeDistanceInWords,
   setDateFormate,
   isTimeBeforeDeadLine
} from './TimeUtils'

describe('ProductStore Tests', () => {
   it('should test setDateFormates', () => {
      expect(setDateFormate('2020/06/03')).toBe('2020-06-03')
   })

   it('should test isTimeBeforeDeadLine', () => {
      const time = '2000-06-09 11:00:00'
      const deadLine = '2000-06-09 12:00:00'
      expect(isTimeBeforeDeadLine(time, deadLine)).toBe(true)
   })

   it('should test getTimeDistanceInWords', () => {
      const toTime = '2000-06-09 12:00:00'
      const fromTime = '2000-06-09 11:00:00'
      expect(getTimeDistanceInWords(toTime, fromTime)).toMatch(
         /in about 1 hour/
      )
   })
})
