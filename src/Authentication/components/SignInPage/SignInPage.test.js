/*global expect*/
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { SignInPage } from '.'

describe('SignInPage', () => {
   it('should render typed username', () => {
      const username = 'test-user'
      const { getByPlaceholderText, debug } = render(
         <SignInPage username={username} onChangeUsername={() => {}} />
      )
      debug()
      const usernameField = getByPlaceholderText('UserName')
      fireEvent.change(usernameField, { target: { value: username } })
      expect(usernameField.value).toBe(username)
   })
})
