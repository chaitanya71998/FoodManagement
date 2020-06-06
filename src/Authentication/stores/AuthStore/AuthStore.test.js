/* global jest * /
/*global expect*/
/*global mockSetCookie*/
/*global mockRemoveCookie*/
//import React from 'react'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
}
from '@ib/api-constants'

import { AuthServices } from '../../services/AuthServices'
import getUserSignInResponse from '../../fixtures/getUserSignInResponse.json'

import { AuthStore } from './AuthStore'

import '@testing-library/jest-dom/extend-expect'

import Cookie from 'js-cookie'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()
let mockGetCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie
Cookie.get = mockGetCookie

global.mockSetCookie = mockSetCookie
global.mockRemoveCookie = mockRemoveCookie
global.mockGetCookie = mockGetCookie

describe('AuthStore Tests', () => {
   let authServices
   let authStore

   beforeEach(() => {
      authServices = new AuthServices()
      authStore = new AuthStore(authServices)
   })

   it('should test initialising signIn store', () => {
      expect(authStore.userSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.userSignInAPIError).toBe(null)
   })

   it('should test userSignInAPI data fetching state', () => {
      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authServices.signInAPI = mockSignInAPI
      const requestObject = { username: 'a', password: 'b' }
      const onSuccess = jest.fn()
      authStore.userSignIn(requestObject, onSuccess)
      expect(authStore.userSignInAPIStatus).toBe(API_FETCHING)
   })

   it('should test userSignInAPI success state', async() => {
      const mockSuccessPromise = new Promise((resolve, reject) => {
         resolve(getUserSignInResponse)
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authServices.signInAPI = mockSignInAPI
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const requestObject = { username: "a", password: "b" }
      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.userSignInAPIStatus).toBe(API_SUCCESS)
      //expect(mockSetCookie).toBeCalled()
   })

   it('should test userSignInAPI failure state', async() => {
      jest
         .spyOn(authServices, 'getUserSignInAPI')
         .mockImplementation(() => Promise.reject())
      authStore = new AuthStore(authServices)
      const requestObject = { username: "a", password: "b" }
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.userSignInAPIStatus).toBe(API_FAILED)
   })

   it('should test user sign-out', () => {
      authStore.userSignOut()
      expect(mockRemoveCookie).toBeCalled()
      expect(authStore.userSignInAPIStatus).toBe(API_INITIAL)
      expect(authStore.userSignInAPIError).toBe(null)
   })
})
