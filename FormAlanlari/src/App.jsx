import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FormAlani from './Form';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Main from './HomePage';
import Error from './ErrorPage';

function App() {


  return (
    <>
      <Switch>
        <Route path='/' exact>
          <FormAlani />
        </Route>
        <Route path='/main'>
          <Main/>
        </Route>
        <Route path='/error'>
          <Error/>
        </Route>
      </Switch>

    </>
  )
}

export default App
