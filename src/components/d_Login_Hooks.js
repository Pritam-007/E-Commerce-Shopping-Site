//This part is done by Afrina sultana
import React, { useState } from 'react'
import axios from 'axios';
import NavigationBar from './NavigationBar';
import {Link} from 'react-router-dom'
import {  Button } from 'react-bootstrap';

function UserLogin(props) {
  const [eemail, setEmpEmail] = useState("");
  const [epass, setEmpPass] = useState("");
  const [msg, setMessage] = useState("");
  const [status, setStatus] = useState(false);


  const onChangeEmpEmail = (e) => setEmpEmail(e.target.value);
  const onChangeEmpPass = (e) => setEmpPass(e.target.value);

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();

    const emplogininfo = {
      empemail: eemail,
      emppass: epass
    }

    axios.post('http://localhost:4500/deg/logincheck/a/designer', emplogininfo)
      .then(res => {
        if(res.data === "fail"){
          alert("Wrong")
        }

        else{
      sessionStorage.setItem("Key_Veriable", 'DESIGNER')
      sessionStorage.setItem("useremail", eemail)
      sessionStorage.setItem("authuser",'DESIGNER')
      sessionStorage.setItem("username", res.data[0].empname)
      
      props.history.push('/')
      }
      })
      .catch(err => {
        
        setMessage('INVALID UID OR PASSWORD')
      })

    setEmpEmail('')
    setEmpPass('')
    
  }


  if (status === false) {
    return (
      <div>
        <NavigationBar />
        <br /> 
        <h3>DESIGNER LOGIN</h3>
        <b style={{ color: "red" }}> {msg} </b>
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input type="email" value={eemail}
            onChange={onChangeEmpEmail}
            placeholder="Enter Email"
            required />
          <br /><br />

          <label>Password:</label>
          <input type="password" value={epass}
            placeholder="Enter Password"
            onChange={onChangeEmpPass}
            required />
          <br /><br />
          <p className="forgot-password text-right">
            <Link to="/forgot_Pass"> <Button bsStyle="primary"> Forgot password?</Button></Link>
            </p>
          <input type="submit" value="LOGIN" className="btn btn-success" />
        </form>
      </div>
    )
  }
  
}

export default UserLogin
