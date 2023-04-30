import React from 'react';
import { useEffect,useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import danger from "../Components/images/danger.svg"
import warning from "../Components/images/warning-66.png"
import assessIcon from "../Components/images/assess_icon.png"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ThreeCircles } from 'react-loader-spinner'
import QuestionPage from './questionPage';

const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const AssessmentWindow = () => {
      const navigate=useNavigate();
      const [emailVer,setEmailVer]=useState(true)
      const [setStartAssess,setSetStartAssess]=useState(true)
      const [duration,setDuration]=useState("0")
      const [assessStarted,setAssessStarted]=useState(false)
      const [loader,setLoader]=useState(false)



      //FOR SNACKBAR

      const[open1, setOpen1] = React.useState(false);

      const handleClick = () => {
            setOpen1(true);
      };

      const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen1(false);
      };
      
      useEffect(() => {
            if ((JSON.parse(localStorage.getItem("UserLoginStatus")) !== null)) {
                  if ((JSON.parse(localStorage.getItem("UserLoginStatus")) === "false"))
                  {
                        navigate("/user")
                  }
            }

            if(localStorage.getItem("email") === "")
            {
                  navigate("/user")
            }
      }, [])


      const EmailCheck = async () => {
            const response = await fetch(`http://localhost:4000/api/user/assessment/emailCheck/${localStorage.getItem("email")}`)
            const temp = await response.json();
            
            if(Object.keys(temp).length == 0)
            {
                  setEmailVer(false)
            }
            else
            {
                  setEmailVer(true)
            }

            const response2 = await fetch(`http://localhost:4000/api/user/assessment/status/`);
            const temp2=await response2.json();
            // console.log(temp2)
            if(temp2[0].status === true)
            {
                  setSetStartAssess(true)
                  setDuration(temp2[0].timeInMins)
            }
            else
            {
                  setSetStartAssess(false)
            }
      }

      useEffect(()=>{
            EmailCheck()
      },[])


      const handleAssessStart=async ()=>{
            const response2 = await fetch(`http://localhost:4000/api/user/assessment/check/${localStorage.getItem("email")}`);
            const temp2=await response2.json();
            if (temp2[0].assessment_status === "done")
            {
                  setOpen1(true)
                  setAssessStarted(false)
                  // setCookies("assessStarted",false)
            }
            else
            {
                  setLoader(true)
                  setTimeout(
                        () => {
                              setLoader(false)
                              setAssessStarted(true)
                              // setCookies("assessStarted",true)

                              //FOR RELOADING of assessment
                              const unloadCallback = (event) => {
                                    event.preventDefault();
                                    event.returndefaultValue = "";
                                    return "";
                              };

                              window.addEventListener("beforeunload", unloadCallback);
                              return () => window.removeEventListener("beforeunload", unloadCallback);
                        },
                        2000
                  );
                  setOpen1(false);
                  
            }

      }

      return ( 
            <>
                  {
                        (!loader) ? (<div>

                              <>
                                    {
                                          (emailVer) ? (
                                                //If part for start assess the email
                                                (setStartAssess) ? (
                                                      <div>
                                                            {
                                                                  // console.log(cookies.assessStarted)
                                                                  //START ASSESSMENT
                                                                  (assessStarted) ? (
                                                                        <div>
                                                                              <Container>
                                                                                    {console.log("Assessment Started")}
                                                                                    {/* <center><h1>WELCOME</h1></center>
                                                                              <hr /><hr />
                                                                              <br /> */}
                                                                              </Container>
                                                                              <QuestionPage duration={duration} />
                                                                        </div>
                                                                  ) : (

                                                                        <Container>
                                                                              <center><h1>WELCOME</h1></center>
                                                                              <hr /><hr />
                                                                              <br />
                                                                              <button className="btn btn-danger" style={{ position: "static", float: "right" }} onClick={() => navigate("/user")}>{<ArrowBackIosIcon />} BACK</button>
                                                                              <h3><i>DURATION(in minutes):</i><b> "{duration}" </b></h3>
                                                                              <br />
                                                                              <Row>
                                                                                    <Col>
                                                                                          <img src={assessIcon} alt="warning" width={500} />
                                                                                    </Col>
                                                                                    <Col className="assessButtonContainer">
                                                                                          <div>
                                                                                                <center>
                                                                                                      <button className="btn btn-success" onClick={handleAssessStart}>START ASSESSMENT</button>
                                                                                                      <br /><br />
                                                                                                      <i style={{ color: "red" }}>**Click the button to start the assessment</i>
                                                                                                </center>
                                                                                          </div>
                                                                                    </Col>
                                                                              </Row>
                                                                        </Container>
                                                                  )
                                                            }


                                                      </div>
                                                ) : (
                                                      <div className="EmailNotfound">
                                                            <Container>
                                                                  <center>
                                                                        <img src={warning} alt="warning" width={350} />
                                                                        <br />
                                                                        <h2><i>ASSESSMENT IS NOT STARTED YET</i></h2>
                                                                        <br />
                                                                        <button className="btn btn-danger" onClick={() => navigate("/user")}>{<ArrowBackIosIcon />} BACK</button>
                                                                  </center>
                                                            </Container>
                                                      </div>
                                                )
                                          ) : (
                                                //Else part for not finding the email
                                                <div className="EmailNotfound">
                                                      <Container>
                                                            <center>
                                                                  <img src={danger} alt="DANGER" width={350} />
                                                                  <br /> <br />
                                                                  <h2><i>NOT ELIGIBLE TO TAKE THE TEST</i></h2>
                                                                  <br />
                                                                  <button className="btn btn-danger" onClick={() => navigate("/user")}>{<ArrowBackIosIcon />} BACK</button>
                                                            </center>
                                                      </Container>
                                                </div>
                                          )
                                    }

                                    <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
                                          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                                YOU HAVE ALREADY TAKEN THE TEST
                                          </Alert>
                                    </Snackbar>
                              </>

                        </div>) : (<div className='load'>
                                    <div>
                                          <ThreeCircles
                                                height="100"
                                                width="100"
                                                color="red"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                ariaLabel="three-circles-rotating"
                                                outerCircleColor="black"
                                                innerCircleColor="red"
                                                middleCircleColor="black"
                                          />
                                          
                                          <center>
                                                <i>loading....</i>
                                          </center>
                                    </div>
                        </div>)
                  }
            </>
       );
}
 
export default AssessmentWindow;