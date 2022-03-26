import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.css'
import teaching from './images/TeachingImage.png'
class Teacher extends Component {
  
	constructor(props) {
		super(props);
		this.state = {
      passField: 'hidden',
		  teachers: [],
          teacherId: '',
          isSignedUp: false,
          firstName : '',
          lastName: '',
          email: '',
          password: ''
		};
	  }

	  
	componentDidMount() {
		
		fetch('http://localhost:8080/api/teacher')
		  .then(response => response.json())
		  .then(teachers => this.setState({teachers: teachers}));
	}

    handleFirstName = (e) => {
        this.setState({firstName: e.target.value});
	}
    handleLastName = (e) => {
        this.setState({lastName: e.target.value});
	}
    handleEmail = (e) => {
        this.setState({email: e.target.value});
	}
    handlePassword = (e) => {
        this.setState({password: e.target.value});
	}



    signUp = () => {
      const cookies = new Cookies()
        const requestOptions = {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({firstName: this.state.firstName , lastName: this.state.lastName, email: this.state.email , password: this.state.password}),
		  };
		  fetch("api/teacher/signup", requestOptions)
		  .then((response) => {
      if(response.status === 403){
        location.reload()
      }
			return response.json();
		  })
		  .then((data) => {
        this.setState({
          isSignedUp: true
        })
        cookies.set('teacherFirstName', data.firstName);
        if(this.state.isSignedUp === true){
          window.location.href = "http://localhost:8080/class";
        }else{
          return (<div>Choose a teacher or sign up!</div>);
        }
		  })
		  .catch((err) => {
			  console.log(err)
		  })
    }

    logIn = () => {
      const cookies = new Cookies()
        const requestOptions = {
			method: 'POST',
			headers: {
			  Accept: 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({password: this.state.password, teacherId: this.state.teacherId}),
		  };
		  fetch("api/teacher/login", requestOptions)
		  .then((response) => {
        
			return response.json();
		  })
		  .then((data) => {
        
        this.setState({
          isLoggedIn: true
        })

        cookies.set('teacherFirstName', data.firstName);
        if(this.state.isLoggedIn === true){
          // location.reload()
          window.location.href = "http://localhost:8080/class";
        }else{
          location.reload()
          return (<div>Error occured. Try again!</div>);
        }
		  })
		  .catch((err) => {
			  console.log(err)
		  })
    }


	render() {
	  const teachers = []
      for (let i = 0; i < this.state.teachers.length; i++) {
        teachers.push({label: this.state.teachers[i].firstName + ' ' + this.state.teachers[i].lastName, value: this.state.teachers[i]._id})
      }
		return (
      <div style={{height: "765px", color:"#3498DB", display: "flex", alignItems:"center", justifyContent:"center", backgroundImage: "url(" + teaching + ")", backgroundSize: "cover"}}>
        <div style={{backgroundColor:"rgba(255, 255, 253, 0.65)",  border: "1px solid #3498DB", paddingTop:"40px", paddingLeft: "30px", paddingRight: "30px", borderRadius: "20px"}}>
        <Select placeholder="Select teacher"options={ teachers } onChange={opt => this.setState({teacherId: opt.value, passField: "visible"})}/>
          <form style={{textAlign: 'center'}}>
            <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handlePassword} style={{textAlign: "center", margin:"20px auto", border: "1px solid 	#cccccc", padding: "5px", borderRadius: "4px", display:"flex", width: "100%", visibility:this.state.passField}}/>
            <button onClick={(e) => {
              e.preventDefault()
              this.logIn()
            }} type="Submit" className="button button2" style={{margin: "0 auto", visibility:this.state.passField}}>Login</button>
          </form>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "25px"}}><h3>Sign Up:</h3></div>
          <div style={{margin: "20px auto", borderTop: "2px solid black", width: "400px", textAlign: "center"}}>
          <form style={{marginTop: "30px"}} onSubmit={(event) => {
              event.preventDefault()
              this.signUp(this.state.teacher)
          }} >
            <input style={{textAlign: "center", border: "1px solid #3498DB", borderRadius: "6px"}} type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstName} />
            <div></div>
            <br></br>
            <input style={{textAlign: "center", border: "1px solid #3498DB", borderRadius: "6px"}} type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastName}/>
            <div></div>
            <br></br>
            <input style={{textAlign: "center", border: "1px solid #3498DB", borderRadius: "6px"}} type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail}/>
            <div></div>
            <br></br>
            <input style={{textAlign: "center", border: "1px solid #3498DB", borderRadius: "6px"}} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
            <div></div>
            <br></br>
            <input style={{marginTop: "-5px", marginBottom: "15px"}} className="button button2" type="submit" />
          </form>
        </div>
      </div>
    </div>
		);
	}
}

export default Teacher;
