/*global url*/
import React from 'react'
import './index.css'
import BannerAnim, { Element } from 'rc-banner-anim'
import TweenOne from 'rc-tween-one'
import 'rc-banner-anim/assets/index.css'
const BgElement = Element.BgElement
class SetCarousel extends React.Component {
   render() {
      return (
         <BannerAnim
            prefixCls='banner-user'
            autoPlay
            style={{ height: '100%' }}
         >
            <Element prefixCls='banner-user-elem' key='0'>
               <BgElement
                  key='bg'
                  className='bg'
                  style={{
                     backgroundImage:
                        "url('https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/ef1325dc-61e4-477d-b844-74200156dac2.png')"
                  }}
               />
               <TweenOne
                  className='banner-user-title'
                  animation={{ y: 30, opacity: 0, type: 'from' }}
               >
                  "Please don't waste food"
               </TweenOne>
               <TweenOne
                  className='banner-user-text'
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  Food Waste,not in good taste
               </TweenOne>
            </Element>
            <Element prefixCls='banner-user-elem' key='1'>
               <BgElement
                  key='bg'
                  className='bg'
                  style={{
                     backgroundImage:
                        "url('https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/0dc43def-3197-4330-a9de-3d56b12c6011.png')"
                  }}
               />
               <TweenOne
                  className='banner-user-title'
                  animation={{ y: 30, opacity: 0, type: 'from' }}
               >
                  "Today Breakfast Change"
               </TweenOne>
               <TweenOne
                  className='banner-user-text'
                  animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
               >
                  Idly to Poori
               </TweenOne>
            </Element>
         </BannerAnim>
      )
   }
}
export { SetCarousel }
