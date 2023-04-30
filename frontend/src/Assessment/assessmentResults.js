import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Container,Row,Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Button } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import warning from "../Components/images/warning-66.png"
import { Bars } from "react-loader-spinner";


const AssessmentResults = () => {
      const navigate = useNavigate();
      const [validEmails, setValidEmails] = useState();
      const [userAns, setUserAns] = useState();
      const [questions, setQuestions] = useState()
      const [ValidatedAnswers, setValidatedAnswers] = useState({})
      const [checkDescInputs, setCheckDescInputs] = useState([])
      const [marks, setMarks] = useState();
      const [err, setErr] = useState(false);
      const [evaludatedAnswers, setEvaludatedAnswers] = useState();


      const [status, setStatus] = useState(() => {
            return JSON.parse(localStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if ((JSON.parse(localStorage.getItem("UserLoginStatus")) !== null)) {
                  if ((JSON.parse(localStorage.getItem("UserLoginStatus")) === "false")) {
                        navigate("/user")
                  }
            }

            if (localStorage.getItem("email") === "") {
                  navigate("/user")
            }
      }, [])


      const fetchValidEmail = async () => {
            const response = await fetch("http://localhost:4000/api/assessment/validEmails/")
            const data = await response.json()
            setValidEmails(data);
      }
      useEffect(() => {
            fetchValidEmail()
      }, [])


      const handleUserAnswers = async () => {
            const email=localStorage.getItem("email");
            const response = await fetch("http://localhost:4000/api/assessment/getEmailAnswers/" + (email))
            const data = await response.json()
            setUserAns(data);
            FetchQuestions();

            ValidatedAnswers.email = email;

      }

      useEffect(()=>{handleUserAnswers();},[])

      const FetchQuestions = async () => {
            const response = await fetch("http://localhost:4000/api/user/collectionData/assessment_questions");
            const data = await response.json();
            setQuestions(data)
      }



      const handleGetValidatedAnswers=async ()=>{
            
            let Marks=0;
            // console.log(userAns[0]["validatedAnswers"]["TEMP"])
            (Object.values(userAns[0].validatedAnswers)).map((item) => {
                  Marks += parseInt(item)
            })
            setMarks(Marks)
            
            // console.log(userAns[0].validatedAnswers)
      }

      useEffect(()=>{
            handleGetValidatedAnswers()
      })


      //CHECK THE STATUS OF THE RESULT
      const [resultView, setResultView] = useState(false);
      const handleResultView = async () => {
            const response2 = await fetch(`http://localhost:4000/api/user/assessment/status/`);
            const temp2 = await response2.json();
            setResultView(temp2[0].results)
      }

      useEffect(()=>{handleResultView()},[])


      //SETTING LOADER
      const [loader, setLoader] = useState(true);
      const handleLoader = () => {
            setLoader(true)
            setTimeout(() => {
                  setLoader(false);
            }, 2000);
      }

      useEffect(()=>{
            handleLoader()
      },[])
      return ( 
            <>
                  
                  {
                        !loader && (
                              <div>
                                    {(resultView) ? <Container>
                                          <button className="btn btn-danger" style={{ margin: 20, position: "static", float: "right" }} onClick={() => navigate("/user/")}>{<ArrowBackIosIcon />} BACK</button>
                                          <br />
                                          <div className="Cont2" style={{ width: "100%" }}>
                                                <center><h2>ASSESSMENT RESULTS</h2></center>
                                                <Container>


                                                      <div>
                                                            <hr />
                                                            {
                                                                  userAns &&
                                                                  <div style={{ display: "flex", alignContent: "center" }}>
                                                                        <h3 style={{ width: "max-content" }}>STATUS: </h3>
                                                                        {(userAns[0].assessment_status === "done") ? <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                                                              <h3 style={{ color: "green" }}><i>'COMPLETED'</i></h3>
                                                                              {/* <button onClick={handleEvaluate} className='btn btn-danger'>EVALUATE</button> */}
                                                                        </div>
                                                                              : <h3 style={{ color: "red" }}><i>'NOT COMPLETED'</i></h3>}
                                                                  </div>
                                                            }
                                                      </div>

                                                      <div>
                                                            <hr />
                                                            {
                                                                  questions && (questions).map((item, i) => (
                                                                        <div className='ValidateQuestionContainer'>
                                                                              <span className='ValidationQuestion'>{i + 1}{') '}{item.Question}</span>
                                                                              {/* <h3 id='hello'>ANSWER : {userAns[0]["answers"][item]}</h3> */}
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

                                                                                          <br /><br />
                                                                                          <center>
                                                                                                <div style={{ display: 'flex', padding: "5px", border: "3px solid black", justifyContent: "center", alignContent: "center", width: "50%", borderRadius: "15px" }}>
                                                                                                      <h4>MARKS (max : {item.marks}) : </h4>
                                                                                                      {
                                                                                                            <h4>
                                                                                                                  <h1 style={{ display: "none" }}>{checkDescInputs.push(`DesMarks${i}`)}</h1>
                                                                                                                  <input type="number" onWheel={(e) => e.target.blur()} id={`DesMarks${i}`} onChange={(e) => {
                                                                                                                        ValidatedAnswers[item.Question] = e.target.value;
                                                                                                                        // console.log(ValidatedAnswers);
                                                                                                                  }} value={userAns[0]["validatedAnswers"][item.Question]} style={{ background: "#fcd2ed", fontWeight: "500", width: "75px", borderRadius: "25px", textAlign: "center" }} disabled />
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
                                                      {/* <center>
                                          {
                                                userAns && <Button variant="contained" style={{ width: "50%" }} onClick={handleTotal}>GET RESULTS {<ArrowCircleRightIcon />}</Button>
                                          }
                                    </center> */}

                                                      <center>

                                                            {marks && <div>
                                                                  <hr /><hr />
                                                                  <h2 style={{ width: "100%", background: "#3A75E9", color: "white", padding: 10 }}>Total Marks:'{marks}'</h2>
                                                                  <hr /><hr />
                                                            </div>}
                                                      </center>
                                                      <br /><br />



                                                </Container>
                                          </div>
                                    </Container> : (

                                          <div className="EmailNotfound">
                                                <Container>
                                                      <center>
                                                            <img src={warning} alt="warning" width={350} />
                                                            <br />
                                                            <h2><i>RESULTS ARE YET TO BE PUBLISHED</i></h2>
                                                            <br />
                                                            <button className="btn btn-danger" onClick={() => navigate("/user")}>{<ArrowBackIosIcon />} BACK</button>
                                                      </center>
                                                </Container>
                                          </div>

                                    )}
                              </div>
                        )
                  }

                  {
                         

                        loader && <div className='load'>
                                    <div>
                                    <Bars
                                          height="70"
                                          width="70"
                                          color="black"
                                          ariaLabel="bars-loading"
                                          wrapperStyle={{}}
                                          wrapperClass=""
                                          visible={true}
                                    />
                                    
                                    <center>
                                          <i>loading..</i>
                                    </center>
                                                                              
                                    
                                    </div>
                        </div>
                  }
            </>
       );
}
 
export default AssessmentResults;