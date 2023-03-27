import Navbar from "../Components/Navbar"
import LoggedInUser from "../CONTEXT/LoggedInUser";
import { useState,useContext,useEffect } from "react";
import { Container } from "react-bootstrap";
import { ProSidebarProvider } from "react-pro-sidebar"
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserSidebar from "./userSidebar";


const UserDashboard = (props) => {
      //const {loggedUser}=useContext(LoggedInUser);
      const navigate=useNavigate()
      const loggedUser=useContext(LoggedInUser);
      const [temp,setTemp]=useState()
      const [data,setData]=useState()
      const fetchData = async () => {
            const response = await fetch("http://localhost:4000/api/stafflist/")
            const data = await response.json()
            setData(data.filter((item)=>item.email===sessionStorage.getItem("email")))
            
      }

      useEffect(() => {
            fetchData();
      }, [temp])

      useEffect(() => {
            if ((JSON.parse(sessionStorage.getItem("UserLoginStatus")) === "false") || (JSON.parse(sessionStorage.getItem("UserLoginStatus")) === null))
            {

                  navigate("/user")
            }
      },[])
      return ( 
            <>
                  <Navbar />
                  {
                        data && <>
                              <div style={{display:"flex"}}>
                                    <div className="Cont1">
                                          <ProSidebarProvider>
                                                <UserSidebar />
                                          </ProSidebarProvider>
                                    </div>
                                    <Container>
                                          <center><h1>WELCOME {data[0].name}</h1></center>
                                          {
                                                console.log(data[0].name)
                                          }
                                    </Container>
                              </div>
                        </>
                  }
                  

            </>
       );
}


 
export default UserDashboard;