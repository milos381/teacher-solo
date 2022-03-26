import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: null
    };
  }
  
  componentDidMount() {
    // uncomment the below for proxy challenge
    
    fetch('http://localhost:8080/')
      .then(response => response.json())
      .then(students => this.setState({students}));
    
  }
  
  render() {
    if (!this.state.students) return null;
    const studentNames = this.state.students.map(student => <li key={student.id}>{student.firstName}</li>);
    return (
      <div>
        <div>Students:</div>
        <ul>{studentNames}</ul>
      </div>
    );
  }
}
  
  export default MainContainer