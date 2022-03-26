import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable, {DraggableCore} from 'react-draggable';
import MainContainer from './containers/MainContainer.jsx';
// import { Swappable } from '@shopify/draggable'
import trash from './images/delete.png';
import edit from './images/edit.png';
import user from './images/user.png';
import getUser from './images/getUser.png';
import styles from './index.css'

class App extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
		  teacherId: '',
		  students: null,
		  edit: 'none',
		  add: 'block',
		  studentId: null,
		  firstName: '',
		  lastName: '',
		  student: {}
		};
	  }

	  
	  componentDidMount() {
		
		fetch('http://localhost:8080/class')
		  .then(response => response.json())
		  .then(students => this.setState({students}));
		
	  }

	  getStudent = (id) => {
		console.log('is this getting printed')
		fetch("/class/students/" + id)
		.then((response) => {
			return response.json()
		})
		.then((student) => {
			this.setState({student: student})
		})
	  }

	  deleteStudent = id => {
		const requestOptions = {
		  method: 'DELETE'
		};
		console.log(id)
		fetch("/class/delete-student/" + id, requestOptions)
		.then((response) => {
		  return response.json();
		}).then(() => {
			fetch('http://localhost:8080/class')
			.then(response => response.json())
			.then(students => this.setState({students}));
		})
		.catch((err) => {
			console.log(err)
		})
	  }

	  showForm = (id) => {
		if(this.state.edit === "none"){
			this.setState({ edit: "block" })
			this.setState({ add: "none" })
			this.setState({ studentId: id })
		}
	  }
	  handleFirstNameChange = (e) => {
		this.setState({firstName: e.target.value});
		console.log(this.state.firstName)
	 }

	 handleLastNameChange = (e) => {
		this.setState({lastName: e.target.value});
	 }

	  editStudent = id => {
		const requestOptions = {
		  method: 'PATCH',
		  headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({firstName: this.state.firstName , lastName: this.state.lastName}),
		};
		console.log(id)
		fetch("/class/update/" + id, requestOptions)
		.then((response) => {
			console.log('this is response')
		  return response.json();
		})
		.then(() => {
			fetch('http://localhost:8080/class')
			.then(response => response.json())
			.then(students => this.setState({students}));
		})
		.catch((err) => {
			console.log(err)
		})
	  }

	  addStudent = id => {
		const requestOptions = {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({firstName: this.state.firstName , lastName: this.state.lastName, teacherId: "6232c4a8f94c704d693ffbf2"}),
		  };
		  console.log(id)
		  fetch("/class/add-student", requestOptions)
		  .then((response) => {
			  console.log('this is response')
			return response.json();
		  })
		  .then(() => {
			  fetch('http://localhost:8080/class')
			  .then(response => response.json())
			  .then(students => this.setState({students}));
		  })
		  .catch((err) => {
			  console.log(err)
		  })
	  }


	  render() {
		if (!this.state.students) return null;
		const studentNames = this.state.students.map(student => <Draggable bounds="parent" key={student.id}><div className="handle" style={{backgroundColor:"white", padding: "5px", borderRadius:"20px" , boxShadow: "0px 0px 5px #3498DB", border: "2px solid #3498DB",margin:"5px", position: "relative", display: "inline-block", width: "120px", height:"150px", textAlign: "center"}}><img style={{cursor: "pointer"}}onClick={() => this.getStudent(student.id)} className="imgLogo" src={user} alt="user-logo"/><div></div> {student.firstName}<div></div> {student.lastName}<div></div> <div><div style={{display: "inline-block"}}></div><img onClick={() => this.showForm(student.id)} className="imgBox" src={edit} alt="edit-logo"/><img onClick={() => this.deleteStudent(student.id)} className="imgBox" src={trash} alt="delete-logo"/></div></div></Draggable>);
		
		return (


			<div onClick={(event) => {
				event.preventDefault()
				this.setState({
					student: {}
				})
			  }} className="float-container" style={{display: "flex", height: "800px", width: "1508px", border: "2px solid #3498DB"}}>
				
			  <div style={{borderRight: "2px solid #3498DB"}}className="container float-child">{studentNames}
			  
			  </div>
			  
			  <div className="float-child" style={{width: "300px", height:"800px", textAlign:"center", margin:"0 auto"}}>
			  <div style={{marginTop: "50px"}}><h4>Teacher:</h4><div></div><p>FIRSTNAME LASTNAME</p></div>
			  <h3>Student Info</h3>

			  <div id = "editForma" style={{display: this.state.edit, marginTop:"100px"}}>
			  <form onSubmit={(event) => {
				  event.preventDefault()
				  this.editStudent(this.state.studentId)
				}} >
				  <label >First Name:</label>
					<input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
					<div></div>
				  <br></br>
					<label >Last Name:</label>
					<input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/>
					
					<input className="button button2" type="submit" />
        		</form>
				</div>
				<div id = "addForma" style={{display: this.state.add, marginTop:"100px"}}>
				<form onSubmit={(event) => {
				  event.preventDefault()
				  this.addStudent(this.state.studentId)
				}} >
				  <label >First Name:</label>
					<input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
					<div></div>
				  <br></br>
					<label >Last Name:</label>
					<input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/>
					
					<input className="button button2" type="submit" />
        		</form>
				</div>
				<div id="studentInfo">
					{/* <img style={{width: "120px", marginTop: "10px"}}src={getUser} alt='user'/> */}
					<h3 style={{marginTop: "65px"}}>{this.state.student.firstName}</h3>
					<h3>{this.state.student.lastName}</h3>
				</div>

			  </div>
			</div>

		);
	  }
}

export default App;
