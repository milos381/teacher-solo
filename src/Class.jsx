import React, { Component } from 'react';
import Draggable from 'react-draggable';
import trash from './images/delete.png';
import edit from './images/edit.png';
import user from './images/user.png';
import Cookies from 'universal-cookie';
import styles from './index.css'
import bckg from './images/bckg.jpeg'

class Class extends Component {
  
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
		fetch('http://localhost:8080/api/class')
		.then(response => response.json())
		.then(students => this.setState({students}));
	}

	getStudent = (id) => {

		fetch("api/class/students/" + id)
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
		
	fetch("api/class/delete-student/" + id, requestOptions)
		.then((response) => {
		  return response.json();
		})
		.then(() => {
			fetch('http://localhost:8080/api/class')
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
		  	body: JSON.stringify({firstName: this.state.firstName , lastName: this.state.lastName, id}),
		};

		fetch("api/class/update/" + id, requestOptions)
			.then((response) => {
		  		return response.json();
			})
			.then(() => {
				location.reload()
			})
			.catch((err) => {
				console.log(err)
			})
	}

	addStudent = () => {

		const requestOptions = {
			method: 'POST',
			headers: {
			  	Accept: 'application/json',
			  	'Content-Type': 'application/json',
			},
			body: JSON.stringify({firstName: this.state.firstName , lastName: this.state.lastName}),
		};
		fetch("api/class/add-student", requestOptions)
			.then((response) => {
				console.log('this is response')
				return response.json();
			})
			.then(() => {
				location.reload()
			})
			.catch((err) => {
				console.log(err)
			})
	}

	logout = () => {
		const requestOptions = {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			}
		}
		fetch("api/teacher/logout", requestOptions)
			.then((response) => {
				window.location.href = "http://localhost:8080/teacher"
			})
			.then((student) => {
				this.setState({student: student})
			})
	}

	render() {
		if (!this.state.students) return null;
			const studentNames = this.state.students.map(student => <Draggable bounds="parent" key={student.id}><div className="handle" style={{backgroundColor:"white", padding: "5px", borderRadius:"20px" , boxShadow: "0px 0px 5px #3498DB" ,margin:"5px", position: "relative", display: "inline-block", width: "120px", height:"180px", textAlign: "center"}}><img style={{cursor: "pointer"}}onClick={() => this.getStudent(student.id)} className="imgLogo" src={user} alt="user-logo"/><div></div> {student.firstName}<div></div> {student.lastName}<div></div> <div><div style={{display: "inline-block"}}></div><img onClick={() => this.showForm(student.id)} className="imgBox" src={edit} alt="edit-logo"/><img onClick={() => this.deleteStudent(student.id)} className="imgBox" src={trash} alt="delete-logo"/></div></div></Draggable>);
			const cookies = new Cookies()
		return (

			<div onClick={(event) => {
				event.preventDefault()
				this.setState({
					student: {}
				})
			}} className="float-container" style={{display: "flex", height: "800px", width: "100%"}} >
				
			<div style={{height: "100%", backgroundImage: "url(" + bckg + ")"}} className="container float-child">{studentNames}</div>
			
			<div className="float-child" style={{backgroundColor:"rgba(255, 255, 255)", width: "20%", height:"100%", textAlign:"center", margin:"0 auto"}}>
			
			<div style={{marginTop: "100px"}}><h4>Teacher:</h4><div></div><p>{cookies.get('teacherFirstName')}</p></div>
			
			<button onClick={(e) => {
            	e.preventDefault()
            this.logout()}} style={{backgroundColor:"white", border:"0", color:"#3498DB"}}>Logout</button>
			  
			<h3 style={{marginTop: "70px", marginBottom: "30px"}}>Student Info</h3>

			<div id = "editForma" style={{display: this.state.edit}}>
			<form >
				<label >First Name:</label>
				<input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
				<div></div>
				<br></br>
				<label >Last Name:</label>
				<input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/>
				
				<button onClick={(e) => {
					e.preventDefault()
					this.editStudent(this.state.studentId)}} type="Submit" className="button button2">Finish
				</button>
			</form>
			</div>
			<div id = "addForma" style={{display: this.state.add}}>
        	<form  >
				<label >First Name:</label>
				<input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
				<div></div>
				<br></br>
				<label >Last Name:</label>
				<input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange}/>
				
				<button onClick={this.addStudent} type="Submit" className="button button2">Add</button>
        	</form>
			</div>
			<div id="studentInfo">
				<h3 style={{marginTop: "50px"}}>{this.state.student.firstName}</h3>
				<h3>{this.state.student.lastName}</h3>
			</div>

			</div>
			</div>

		);
	  }
}

export default Class;
