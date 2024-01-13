import React from 'react'
import { HOCWrapper, Title } from './styledComponents'

function withTitle<T>(WrappedComponent: React.ComponentType<T>) {
   return class extends React.Component<T> {
      render() {
         const props = this.props as T
         return (
            <HOCWrapper>
               <Title>Have a great day!</Title>
               <WrappedComponent {...props} />
            </HOCWrapper>
         )
      }
   }
}

export default withTitle
