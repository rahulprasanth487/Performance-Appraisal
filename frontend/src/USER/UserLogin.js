import Navbar from "../Components/Navbar"
import "../"
import { Row,Col,Container } from "react-bootstrap";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInUser from "../CONTEXT/LoggedInUser";
import UserDashboard from "./UserDashboard";
// import UserSidebar from "./userSidebar";



const UserLogin = () => {

      const [personal_data,setPersonalData] = useState()
      const [pass_available,setPassAvailable] = useState(false)
      const [signup_status,setSignupStatus] = useState("null")
      const [loggedUser,setLoggedUser]=useState();
      const [temp,setTemp] = useState(0)
      const navigate=useNavigate();

      const fetchData=async ()=>{
            const response = await fetch("http://localhost:4000/api/stafflist/")
            const data = await response.json()
            setPersonalData(data)
            console.log(data)
      }

      useEffect(()=>{
            fetchData();
      },[temp])


      const checkEmail=(e)=>{
            e.preventDefault();
            let email = document.getElementsByName("email")[0].value
            if(email===null){setSignupStatus("null")}
            let flag = false
            personal_data.map((item)=>{
                  
                  if(item.email===email){
                        flag=true
                        setSignupStatus("true")
                        if(!item.password){
                              setPassAvailable(false);
                              if(document.getElementsByName("set_password")[0].value===document.getElementsByName("confirm_pass")[0].value){
                                    console.log("passwords matched")
                                    item.table = "personal_details";
                                    item.password = document.getElementsByName("set_password")[0].value

                                    fetch(`http://localhost:4000/api/user/${item._id}`, {
                                          method: "PATCH",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify(item)
                                    })

                                    window.location.reload()
                                    alert("PASSWORD SET SUCCESSFULLY")
                                    
                              }
                              else{
                                    alert("passwords not matched")
                              }
                        }
                        else{
                              setPassAvailable(true)
                              if(item.password===document.getElementsByName("password")[0].value){
                                    setLoggedUser(item);
                                    alert("Logged in Successfully")
                                    localStorage.setItem("UserLoginStatus",true)
                                    localStorage.setItem("email",item.email)
                                    // alert(loggedUser.length)
                                    
                              }
                              else
                              {
                                    alert("WRONG PASSWORD")
                              }
                        }
                  }
            })
            if(!flag){
                  setSignupStatus("false")
            }
      }


      const handleForgetPassword =async (e)=>{

            window.location.reload();
            
                  await fetch(`http://localhost:4000/api/user/forgotPassword/${document.getElementsByName("email")[0].value}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ password: "" })
                  })

                  
            }
      

      return ( 
            <>

                  <LoggedInUser.Provider value={loggedUser}>
                        {((JSON.parse(localStorage.getItem("UserLoginStatus")) === false) || (JSON.parse(localStorage.getItem("UserLoginStatus")) === null)) ? <>
                              <Navbar />
                              <Container>
                                    {/* <UserSidebar /> */}
                                    <div className="userLoginForm">
                                          <center><h1>USER LOGIN</h1></center>
                                          <form onSubmit={checkEmail}>
                                                <br />
                                                <label>EMAIL : </label>
                                                <Row style={{ margin: 0 }} className="justify-content-md-center align-items-md-center">
                                                      <Col>
                                                            <input type="email" name="email" placeholder="example@gmail.com" required onInput={checkEmail} />
                                                            {signup_status === "false" && <p className="err_msg">**Email not found <b>SignUp</b> to continue</p>}
                                                      </Col>
                                                      <br />
                                                </Row>

                                                <br />
                                                {/* USER dashboard */}

                                                
                                                {signup_status === "true" && <>
                                                      {pass_available && <>
                                                            <label>PASSWORD : </label>
                                                            <Row style={{ margin: 0 }} className="justify-content-md-center">
                                                                  <Col><input type="password" name="password" required /></Col>
                                                            </Row>
                                                            <span style={{
                                                                  color:"red",
                                                                  float:"right",
                                                                  marginRight:"10px",
                                                                  cursor:"pointer"
                                                            }} onClick={
                                                                  handleForgetPassword
                                                            }>forgot password</span>
                                                            <br />
                                                      </>}

                                                      {!pass_available && <>

                                                            <h2>ENTER THE PASSWORD</h2>
                                                            <label>SET PASSWORD : </label>
                                                            <Row style={{ margin: 0 }} className="justify-content-md-center">
                                                                  <Col><input type="password" name="set_password" required /></Col>
                                                            </Row>
                                                            <br />

                                                            <label>CONFIRM PASSWORD : </label>
                                                            <Row style={{ margin: 0 }} className="justify-content-md-center">
                                                                  <Col><input type="text" name="confirm_pass" required /></Col>
                                                            </Row>
                                                            <br />
                                                      </>}

                                                      <Row style={{ margin: 0 }} className="justify-content-md-center">
                                                            <input type="submit" name="submit" value="SUBMIT" className="btn btn-primary" />
                                                      </Row>
                                                </>}
                                          </form>
                                    </div>
                              </Container>
                        </> : < UserDashboard />}
                  </LoggedInUser.Provider>
            
            </>


       );
}
 
export default UserLogin;