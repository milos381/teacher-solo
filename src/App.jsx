import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeacherComponent from './Teacher'
import ClassComponent from './Class'
import HomeComponent from './HomeComponent'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'

export default class App extends Component {


  

    render() {   

      return (
      //   <Router>
      //   <Switch>
      //     <PublicRoute restricted={false} component={HomeComponent} path="/" exact />
      //     <PublicRoute restricted={true} component={TeacherComponent} path="/teacher" exact />
      //     <PrivateRoute component={ClassComponent} path="/class" exact />
      //   </Switch>
      // </Router>





    <Router>
      {/* className="navbar navbar-expand-lg navbar-light bg-light" */}
         <nav className="navbar-expand-lg" style={{display: "flex", justifyContent: "center", width: "20%", height: "5%", position:"absolute", right: "0"}}>
          <ul className="navbar-nav mr-auto">
          <li><Link to={'/class'} className="nav-link"><h5>Class</h5></Link></li>
          <li ><Link to={'/teacher'} className="nav-link"><h5>Teacher</h5></Link></li>
          </ul>
          </nav>
        <Routes>
              <Route path='/class' element={<ClassComponent/>} />
              <Route path='/teacher' element={<TeacherComponent/>} />
          </Routes>
 

      </Router>
      );
    }
  }

