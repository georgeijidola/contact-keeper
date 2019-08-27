import React, {Fragment} from 'react'

// Modules
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Import Layouts
import Navbar from './components/layouts/Navbar'

// Import Static Pages
import Home from './components/pages/Home'
import About from './components/pages/About'

// Import States
import ContactState from './context/contact/ContactState'

// Import CSS
import './App.css'

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  )
}

export default App
