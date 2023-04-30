import Navbar from "../Components/Navbar";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserSidebar from "../USER/userSidebar";
import { Container,Row,Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import resultsImage from "./images/results.jpg"
import take_into_assess from "./images/take_into_Assess.jpg"
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

const UserAssessment = () => {

      const navigate = useNavigate();
      const [temp1,setTemp1]=useState()
      const [data,setData]=useState([])
      const [open, setOpen] =useState(false);

      const handleClick = () => {
            setOpen(true);
      };

      const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen(false);
      };

      useEffect(() => {
            if ((JSON.parse(localStorage.getItem("UserLoginStatus")) === "false") || (JSON.parse(localStorage.getItem("UserLoginStatus")) === null)) {

                  navigate("/user")
            }
      }, [])

      const fetchData = async () => {
            await fetch("http://localhost:4000/api/stafflist/")
                  // const tempoData = await response.json()
                  .then(res => {
                        if (!res.ok) { throw Error("Error in the code"); }
                        return res.json()
                  })
                  .then(data2 => { setData(data2.filter((item) => item.email === localStorage.getItem("email"))) })
            // setData(data.filter((item) => item.email === localStorage.getItem("email")))
      }

      useEffect(() => {
            fetchData();
      }, [])

      const handleAssessStartButton=async ()=>{
            fetchData();
            navigate("/user/assessmentWindow/")

            await fetch("http://localhost:4000/api/user/assessment/prefetch",{
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        "name":data[0].name,
                        "email":data[0].email
                  })
            })
      }


      const handleResults=async ()=>{

            const response2 = await fetch(`http://localhost:4000/api/user/assessment/check/${localStorage.getItem("email")}`);
            const temp2 = await response2.json();
            if (temp2[0].assessment_status === "done") {
                  setOpen(false)
                  // setCookies("assessStarted",false)
                  navigate("/user/assessmentResults/")
            }
            else
            {
                  setOpen(true);
            }
            
      }


      return ( 
            <>
                  <Navbar />
                  <div style={{ display: "flex" }}>
                        <div className="Cont1">
                              <ProSidebarProvider>
                                    <UserSidebar />
                              </ProSidebarProvider>
                        </div>
                        
                       <Container>
                              <hr />
                              <center><h1>ASSESSMENT</h1></center>
                              <hr />

                              <br /><br /><br /><br />
                              <br/><br/><br/>
                              <Container>
                                    <div>
                                          <Row style={{ width: "80%", margin: "0 auto", height: 100, alignContent: "center" }}>
                                                <Col className="text-center">
                                                      <div className="userAssessLogos" onClick={handleAssessStartButton}>
                                                            <Col>
                                                                  <Row>
                                                                        <center><img src={take_into_assess} alt="img not found" /></center>
                                                                  </Row>
                                                                  <Row>
                                                                        <br/>
                                                                        <h4>GET INTO THE ASSESSMENT</h4>
                                                                  </Row>
                                                            </Col>
                                                      </div>

                                                </Col>

                                                <Col className="text-center">
                                                      <div className="userAssessLogos" onClick={handleResults}>
                                                            <Col>
                                                                  <Row>
                                                                        <center><img src={resultsImage} alt="img not found" /></center>
                                                                  </Row>
                                                                  <Row>
                                                                        <br/>
                                                                        <h4>RESULTS</h4>
                                                                  </Row>
                                                            </Col>
                                                      </div>
                                                </Col>
                                          </Row>
                                    </div>
                              </Container>

                        </Container>
                  </div>

                  <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                              YOU HAVE NOT TAKEN THE TEST
                        </Alert>
                  </Snackbar>
            </>
       );
}
 
export default UserAssessment;