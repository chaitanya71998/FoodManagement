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
      expect(isTimeBeforeDeadLine('2000-06-09 12:00:00')).toBe(false)
   })

   it('should test getTimeDistanceInWords', () => {
      expect(getTimeDistanceInWords('2020/06/03')).toMatch(/days/)
   })
})
