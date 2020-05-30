/*global expect*/
import React from 'react'
import { render } from '@testing-library/react'

import { SignInPage } from '.'

describe('SignInPage', () => {
   it('should render typed username', () => {
      const username = 'test-user'
      const { getByPlaceholderText } = render(
         <SignInPage username={username} onChangeUsername={() => {}} />
      )

      const usernameField = getByPlaceholderText('UserName')

      expect(usernameField.value).toBe(username)
   })

   it('should render typed password', () => {
      const password = 'test-password'
      const { getByPlaceholderText } = render(
         <SignInPage password={password} onChangePassword={() => {}} />
      )

      const passwordField = getByPlaceholderText('Password')

      expect(passwordField.value).toBe(password)
   })

   it('should render given error message for usernameField ', () => {
      const { getByText } = render(
         <SignInPage errorMessageForUserName='Invalid username' />
      )
      getByText(/invalid username/i)
   })
   it('should render given error message for passwordField ', () => {
      const { getByText } = render(
         <SignInPage errorMessageForPassword='Invalid password' />
      )
      getByText(/invalid password/i)
   })
})
