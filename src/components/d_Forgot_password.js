//This part is done by afrina sultana
import React, { useState } from 'react'
import axios from 'axios';
import NavigationBar from './NavigationBar';

function UserLogin(props) {


  const [eemail, setEmpEmail] = useState("");
  const [status1, setStatus] = useState(false);
  const [otpno, setOTPNo] = useState("");
  const [servergenotp, setServerGenOTP] = useState("");

  const onChangeEmpEmail = (e) => setEmpEmail(e.target.value);
  const onChangeOTPNo = (e) => setOTPNo(e.target.value);

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    sessionStorage.setItem("abc",eemail);
    console.log(`EMAIL: ${eemail}`); 

    const emplogininfo = {
      empemail: eemail
    }

    

    sendvalues(emplogininfo);
    

    setEmpEmail('')
  }

  function sendvalues(emplogininfo)
  {
    console.log(emplogininfo);
    axios.post('http://localhost:4500/deg/resetpass/designer', emplogininfo)
    .then(res => {      
      alert('Check your email');
      setStatus(true)
      setServerGenOTP(res.data[1])

    })
    .catch(err => {
      alert('INVALID UID ')
      
    })
  }

  const handleOTPCheckSubmit = (evt) => {
    evt.preventDefault();
    
    if (otpno === servergenotp) {
     
      props.history.push("/newpassword")
      
    }
    else {
      alert('INVALID OTP')
    }

    setOTPNo('')
  }

  if (status1 === false) {
    return (
      <div>
        <NavigationBar />
        <br />
        <h3>FORGET PASSWORD</h3>
        <form onSubmit={handleLoginSubmit}>
          <input type="email" value={eemail}
            onChange={onChangeEmpEmail}
            placeholder="Enter Email"
            required />
          <br /><br />
          
          <input type="submit" value="NEXT" className="btn btn-success" />
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <br />
        <h3>ENTER OTP</h3>
        <form onSubmit={handleOTPCheckSubmit}>
          <input type="text" value={otpno}
            onChange={onChangeOTPNo}
            placeholder="Enter OTP"
            required />
          <br /><br />
          <input type="submit" value="CHECK OTP" className="btn btn-success" />
        </form>
      </div>
    )
  }
}

export default UserLogin
