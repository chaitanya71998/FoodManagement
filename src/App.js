// <<<<<<< HEAD
import React from "react";
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { SignInPage } from './Authentication/components/SignInPage'
import HomePage from "./components/HomePage";
import Page1 from "./components/Page1";
import AuthStore from './Authentication/stores'
import { SignInPageRoute } from './Authentication/routes'
import { ProtectedRoutes } from './FoodManagement/routes/ProtectedRoutes'
import { FoodManagementDashBoard } from './FoodManagement/components/FoodManagementDashBoard'
// =======
// import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import HomePage from './components/HomePage'
// import Page1 from './components/Page1'
// >>>>>>> a3c31a2efba81e86d571285c049fc53aa502a25d

import './App.css'

const App = () => {
//<<<<<<< HEAD
  return (
    <Provider {...AuthStore} >
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/page-1">
          <Page1 />
        </Route>
        {SignInPageRoute}
        <ProtectedRoutes exact path='/food-management-dashboard' component={FoodManagementDashBoard}/>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
};
// === === =
//   return (
//       <Router basename={process.env.PUBLIC_URL}>
//         <Switch>
//             <Route exact path='/page-1'>
//               <Page1 />
//             </Route>
//             <Route path='/'>
//               <HomePage />
//             </Route>
//         </Switch>
//       </Router>
//   )
// }
// >>>>>>> a3c31a2efba81e86d571285c049fc53aa502a25d

export default App
