import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Tab } from 'semantic-ui-react'
import './index.css'

const color = 'blue'
const panes = [
   {
      menuItem: 'Tab 1',
      render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
   },
   {
      menuItem: 'Tab 2',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
   },
   {
      menuItem: 'Tab 3',
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
   }
]

class Tabs extends React.Component {
   onTabChange = (event, data) => {
      console.log('data', data.activeIndex)
   }
   render() {
      return (
         <Tab
            menu={{ color, pointing: false }}
            panes={panes}
            onTabChange={this.onTabChange}
         />
      )
   }
}

export default Tabs
