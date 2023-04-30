import React,{useState,useContext} from "react";
import AdminLoginStatus from "../CONTEXT/AdminLoginStatus";
import { useNavigate } from "react-router-dom";

const AdminHomeLogin = () => {
      const [username,setUsername]=useState("");
      const {setShowProfile}=useContext(AdminLoginStatus)
      const [password,setPassword]=useState("")
      const navigate=useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault()
            const response = await fetch("/api/adminlogin/");
            const temp = await response.json();
            console.log(temp)
            if ((temp.admin_username === username) && (temp.admin_password === password)) {
                  alert("Successfully Logged in");
                  setShowProfile('true');
                  localStorage.setItem('showProfile', true);
                  // Cookies.set("showProfile",true)
                  navigate("/ADMIN/adminDashboard")
                  //CAN USE COOKIES AS WELL

            }
            else {
                  // setPassword('');
                  // setUsername('');
                  alert("Wrong username and password")
            }

      }
      return ( 
            <div className="ad_log_container">
                  <div className="admin_log_form">
                        <form method="post" onSubmit={handleSubmit}>
                              <h2 className="admin_title">ADMIN LOGIN</h2>
                              <label>USERNAME : </label>
                              <input type="text" name="username" required placeholder="username" onInput={(e) => setUsername(e.target.value)} />
                              <label>PASSWORD : </label>
                              <input type="password" name="password" required placeholder="password" onInput={(e) => setPassword(e.target.value)} />
                              <button type="submit">SUBMIT</button>
                        </form>
                  </div>
            </div>
       );
}
 
export default AdminHomeLogin;