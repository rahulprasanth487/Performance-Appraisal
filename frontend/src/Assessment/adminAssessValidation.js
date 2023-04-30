import * as React from 'react';
import Navbar from "../Components/Navbar";
import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../Components/AdminSidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,TextField,Button} from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'


const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const AdminAssessValidation = () => {

      const navigate = useNavigate();
      const [validEmails,setValidEmails]=useState();
      const [userAns,setUserAns]=useState();
      const [questions,setQuestions]=useState()
      const [ValidatedAnswers,setValidatedAnswers]=useState({})
      const [checkDescInputs,setCheckDescInputs]=useState([])
      const [marks,setMarks]=useState();
      const [err,setErr]=useState(false);

      const [status, setStatus] = useState(() => {
            return JSON.parse(localStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if (JSON.parse(localStorage.getItem("showProfile")) === false || JSON.parse(localStorage.getItem("showProfile")) == null) {
                  navigate("/admin_log/")
            }
      }, [status])


      const fetchValidEmail=async () =>{
            const response = await fetch("http://localhost:4000/api/assessment/validEmails/")
            const data=await response.json()
            setValidEmails(data);
      }
      useEffect(()=>{
            fetchValidEmail()
      },[])


      const handleUserAnswers =async (e)=>{
            const response = await fetch("http://localhost:4000/api/assessment/getEmailAnswers/"+(e.target.value))
            const data = await response.json()
            if(Object.keys(data).length===0){
                  setOpen2(true);
                  setTimeout(() => {
                        setOpen2(false)
                  }, 1000);
                  setErr(true);
            }
            else
            {
                  setUserAns(data);
                  FetchQuestions();
                  setErr(false);
                  ValidatedAnswers.email = e.target.value;
            }
            
      }

      const FetchQuestions = async () => {
            const response = await fetch("http://localhost:4000/api/user/collectionData/assessment_questions");
            const data = await response.json();
            setQuestions(data)
      }

      // const handleEvaluate=()=>{
      //       document.getElementById("ans").style.backgroundColor = "green";
      // }
      

      const [open1, setOpen1] = React.useState(false);

      const handleClick1 = () => {
            setOpen1(true);
      };

      const handleClose1 = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen1(false);
      };

      const [open2, setOpen2] = React.useState(false);

      const handleClick = () => {
            setOpen2(true);
      };

      const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen2(false);
      };

      const handleTotal=async () => {

            (checkDescInputs).map((item) => (
                  (document.getElementById(item).value === '') && 
                        <>
                              {
                                    setOpen1(true)
                              }

                        </>
            ))

            let Marks = 0;
            var tempObj = ValidatedAnswers;
            const mail=tempObj.email;
            delete tempObj.email;
            
            (Object.values(tempObj)).map((item) => {
            
                  Marks+=parseInt(item)
            
            })
            

            setMarks(Marks);
            
            await fetch("http://localhost:4000/api/assessment/validatedAns/update/",{
                  method:"PATCH",
                  body:JSON.stringify({
                        "email":mail,
                        "validatedAnswers":tempObj,
                        "marks":Marks
                  }),
                  headers: {
                        'Content-type': 'application/json',
                  }
            })
      }


      return ( 
            <>
                  <Navbar />
                   <div className="teach_workload">
                        <div className="Cont1">
                              <ProSidebarProvider>
                                    <AdminSidebar />
                             </ProSidebarProvider>
                        </div>

                        <div className="Cont2" style={{ width: "100%" }}>
                              <center><h2>VALIDATION OF ASSESSMENTS</h2></center>
                              <Container>
                                    
                                   
                                    <Row style={{ width: "fit-content"}}>
                                          <Col ><label style={{fontSize:"18px",padding:"2px"}}>USER:</label></Col>
                                          <Col >
                                                <select onChange={handleUserAnswers} style={{ padding: 5 }} >
                                                      <option selected disabled>Choose</option>

                                                      {
                                                            validEmails && (validEmails).map((item)=>(
                                                                  <option value={item.email}>{item.name} - {item.email}</option>
                                                            ))
                                                      }
                                                </select>
                                          </Col>
                                    </Row>

                                    {
                                          !err && <>
                                                <div>
                                                      <hr />
                                                      {
                                                            userAns &&
                                                            <div style={{ display: "flex", alignContent: "center" }}>
                                                                  <h4 style={{ width: "max-content" }}>STATUS: </h4>
                                                                  {(userAns[0].assessment_status === "done") ? <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                                                        <h4 style={{ color: "green" }}><i>'COMPLETED'</i></h4>
                                                                        {/* <button onClick={handleEvaluate} className='btn btn-danger'>EVALUATE</button> */}
                                                                  </div>
                                                                        : <h4 style={{ color: "red" }}><i>'NOT COMPLETED'</i></h4>}
                                                            </div>
                                                      }

                                                      {
                                                            userAns &&
                                                            <div style={{ display: "flex", alignContent: "center" }}>
                                                                  <h4 style={{ width: "23%" }}>EVALUATION STATUS: </h4>
                                                                        {(userAns[0].validatedAnswers !== undefined) ? <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                                                        <h4 style={{ color: "green" }}><i>'EVALUATED'</i></h4>
                                                                        {/* <button onClick={handleEvaluate} className='btn btn-danger'>EVALUATE</button> */}
                                                                  </div>
                                                                        : <h4 style={{ color: "red" }}><i>'NOT EVALUATED'</i></h4>}
                                                            </div>
                                                      }
                                                </div>

                                                <div>
                                                      <hr />
                                                      {
                                                            // userAns && (Object.keys(userAns[0]["answers"])).map((item,count)=>(
                                                            //       <div>
                                                            //             <h4>QUESTION : {item}</h4>
                                                            //             <h4 id='hello'>ANSWER : {userAns[0]["answers"][item]}</h4>
                                                            //             <hr/>

                                                            //       </div>
                                                            // ))

                                                            questions && (questions).map((item, i) => (
                                                                  <div className='ValidateQuestionContainer'>
                                                                        <span className='ValidationQuestion'>{i + 1}{') '}{item.Question}</span>
                                                                        {/* <h4 id='hello'>ANSWER : {userAns[0]["answers"][item]}</h4> */}
                                                                        {(item.type === "ChoiceBased") ? (
                                                                              //Choice Based
                                                                              <div className='options2'>
                                                                                    <FormControl component="fieldset">
                                                                                          <RadioGroup aria-label="gender" name="options" value={userAns[0]["answers"][item.Question]}>
                                                                                                <FormControlLabel id={(item.answer === item.option1) && "ans"} className={(userAns[0]["answers"][item.Question] === item.option1) && "wrongAns"} value={item.option1} control={<Radio />} label={item.option1} />
                                                                                                <FormControlLabel id={(item.answer === item.option2) && "ans"} className={(userAns[0]["answers"][item.Question] === item.option2) && "wrongAns"} value={item.option2} control={<Radio />} label={item.option2} />
                                                                                                <FormControlLabel id={(item.answer === item.option3) && "ans"} className={(userAns[0]["answers"][item.Question] === item.option3) && "wrongAns"} value={item.option3} control={<Radio />} label={item.option3} />
                                                                                                <FormControlLabel id={(item.answer === item.option4) && "ans"} className={(userAns[0]["answers"][item.Question] === item.option4) && "wrongAns"} value={item.option4} control={<Radio />} label={item.option4} />
                                                                                          </RadioGroup>
                                                                                    </FormControl>
                                                                                    <br />
                                                                                    <center>
                                                                                          <div style={{ display: 'flex', padding: "5px", border: "3px solid black", justifyContent: "center", width: "50%", borderRadius: "15px" }}>
                                                                                                <h4>MARKS : </h4>
                                                                                                {
                                                                                                      (userAns[0]["answers"][item.Question] === item.answer) ? (
                                                                                                            <h4>
                                                                                                                  <h1 style={{ display: "none" }}>{ValidatedAnswers[item.Question] = item.marks}   </h1>
                                                                                                                  <i style={{ color: "green" }}>'{item.marks}/{item.marks}'</i>
                                                                                                            </h4>


                                                                                                      ) : (
                                                                                                            <h4>
                                                                                                                  <h1 style={{ display: "none" }}>{ValidatedAnswers[item.Question] = "0"}   </h1>
                                                                                                                  <i style={{ color: "red" }}>'0/{item.marks}'</i>
                                                                                                            </h4>
                                                                                                      )
                                                                                                }

                                                                                          </div>
                                                                                    </center>

                                                                              </div>
                                                                        ) : (
                                                                              <div className='ValidationTextbox'>
                                                                                    <textarea rows={userAns[0]["answers"][item.Question] && (userAns[0]["answers"][item.Question].length) / 50} disabled>{userAns[0]["answers"][item.Question]}</textarea>

                                                                                    <br />
                                                                                    <center>
                                                                                          <div style={{ display: 'flex', padding: "5px", border: "3px solid black", justifyContent: "center", alignContent: "center", width: "50%", borderRadius: "15px" }}>
                                                                                                      <h4>MARKS (max : {item.marks})(prev:{userAns[0]["validatedAnswers"] && userAns[0]["validatedAnswers"][item.Question]}) : </h4>
                                                                                                {
                                                                                                      <h4>
                                                                                                            <h1 style={{ display: "none" }}>{checkDescInputs.push(`DesMarks${i}`)}</h1>
                                                                                                            <input type="number" onWheel={(e) => e.target.blur()} id={`DesMarks${i}`} onChange={(e) => {
                                                                                                                  ValidatedAnswers[item.Question] = e.target.value;
                                                                                                                  console.log(ValidatedAnswers);
                                                                                                                  }} style={{ background: "#fcd2ed", fontWeight: "500", width: "75px", borderRadius: "25px", textAlign: "center" }} 
                                                                                                                  
                                                                                                                  />
                                                                                                      </h4>
                                                                                                }
                                                                                          </div>
                                                                                    </center>
                                                                              </div>
                                                                        )}
                                                                  </div>
                                                            ))
                                                      }
                                                </div>


                                                <br />
                                                <center>
                                                      {
                                                            userAns && <Button variant="contained" style={{ width: "50%" }} onClick={handleTotal}>Calcuate & Update Total Marks {<ArrowCircleRightIcon />}</Button>
                                                      }
                                                </center>

                                                <center>

                                                      {marks && <div>
                                                            <hr /><hr />
                                                            <h2 style={{ width: "100%", background: "#3A75E9",color:"white", padding: 10 }}>Total Marks:{marks}</h2>
                                                            <hr /><hr />
                                                      </div>}
                                                </center>
                                                <br /><br />

                                          </>
                                    }

                                    
                              </Container>
                        </div>
                  </div>

                  <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose1}>
                        <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
                              **All the marks should be entered!
                        </Alert>
                  </Snackbar>

                  <Snackbar open={open2} autoHideDuration={1000} onClose={handleClose1}>
                        <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
                              **Not attempted the Assessment
                        </Alert>
                  </Snackbar>
            </>
       );
}
 
export default AdminAssessValidation;