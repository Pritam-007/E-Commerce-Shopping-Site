//This part is done by afrina sultana
import React, {useState} from 'react'
import axios from 'axios';

function NewPassword(props)
{

    let designerEmail= sessionStorage.getItem("abc")
    


    const [epass, setEmpPass] = useState("");
    const [reenterpass, setEmpRePass] = useState("");

    const onChangeEmpPass = (e) => setEmpPass(e.target.value);
   const onChangeEmpRePass = (e) => setEmpRePass(e.target.value);



    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (epass === reenterpass)
        {
            const empinfo = {

                emppass: epass,
                empmail: designerEmail
                
        
            }
            axios.put('http://localhost:4500/deg/update/pass/designer', empinfo)
        .then(res => {
           
            props.history.push('/designerlogin')
            alert('Password changed... Now login.')
        });
        
            
        }
        else
        { 
            alert("not matched")
        }
        


    setEmpPass('')
    setEmpRePass('')

    }



    return (
         <div>
          <form onSubmit={handleSubmit}>
              <h3>CHANGE PASSWORD</h3>

                <input type="password" value={epass} onChange={onChangeEmpPass} placeholder="Enter Password"
                    required />
                    <br /><br />

                     <input type="password" value={reenterpass} onChange={onChangeEmpRePass} placeholder="Re-enter Password"
                    required />
                    <br /><br /> 


                <input type="submit" value="CHANGE" className="btn btn-primary" />


            </form>
        </div>

    )


}

export default NewPassword