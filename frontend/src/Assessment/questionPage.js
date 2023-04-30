import React from 'react';
import { useTimer } from 'react-timer-hook';
import { useState,useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Radio,RadioGroup,FormControlLabel,FormControl,FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';


const QuestionPage = (props) => {
      
      const navigate=useNavigate()
      const [questions,setQuestions]=useState([])
      const [currentQuestion,setCurrentQuestion]=useState()
      const [currentIndex,setCurrentIndex]=useState(0)

      //for PAGE REFRESH
      useEffect(()=>{
            const unloadCallback=(event)=>{
                  event.preventDefault();
                  event.returnValue="";
                  return ""
            };

            window.addEventListener("beforeunload",unloadCallback);
            return ()=> window.removeEventListener("beforeunload",unloadCallback);
            },[]
      )

      //TO FETCH THE QUESTIONS
      const FetchQuestions= async ()=>{
            const response = await fetch("http://localhost:4000/api/user/collectionData/assessment_questions");
            const data = await response.json();
            setQuestions(data)
            setCurrentQuestion(data[0])
      }

      useEffect(()=>{
            FetchQuestions();
            
      },[])



      

      //FOR TIMER
      const duration = props.duration;

      function MyTimer({ expiryTimestamp }) {
            const {
                  seconds,
                  minutes,
                  hours,
                  days,
                  isRunning,
                  start,
                  pause,
                  resume,
                  restart,
            } = useTimer({ expiryTimestamp, onExpire: () => {setTimeUp(true); console.warn('onExpire called');handleSubmit()} });

            return (
                  <div style={{ textAlign: 'center' }}>
                        <div>
                              <b><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></b>
                        </div>
                        {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
                        {/* <button onClick={start}>Start</button>
                        <button onClick={pause}>Pause</button>
                        <button onClick={resume}>Resume</button> */}
                        {/* <button onClick={() => {
                              // Restarts to 5 minutes timer
                              const time = new Date();
                              time.setSeconds(time.getSeconds() + 300);
                              restart(time)
                        }}>Restart</button> */}
                  </div>
            );
      }



      const time = new Date();
      time.setSeconds(duration*60);


      //to update the current question when the index is changed
      useEffect(()=>{setCurrentQuestion(questions[currentIndex])},[currentIndex])

      const handleNext=()=>{
            if(currentIndex<questions.length-1 && currentIndex>=0){
                  setCurrentIndex(currentIndex + 1);
                  // setCurrentQuestion(questions[currentIndex])
            }
      }

      const handleBack = () => {
            if (currentIndex <= questions.length - 1 && currentIndex >0) {
                  setCurrentIndex(currentIndex - 1);
                  // setCurrentQuestion(questions[currentIndex])
            }
      }


      //--------------------------------------------------------------------------------
      //ANSWERS
      const [answers,setAnswer]=useState({})
      console.log(answers)
      const [timeUp,setTimeUp]=useState(false);

      const handleSubmit = async ()=>{
            const email=localStorage.getItem("email");

            if(timeUp || (prompt("Enter 'CONFIRM' to submit") === "CONFIRM"))
            {
                  await fetch(`http://localhost:4000/api/user/assessment/answers/update/${email}`, {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(answers)

                  })

                  .then(res => alert("COMPLETED SUCCESSFULLY"))
                  .then(data => window.location.reload())
            }
      }
      
      
      return ( 
            <>
                  <Row className="justify-content-md-center" style={{ display:"flex",justifyContent:"space-between"}}>
                        <Col xs="5"  className='questionPageEmail'><h4><i>{localStorage.getItem("email")}</i></h4></Col>
                        
                        <Col xs="5" className='questionPageTimer'>
                              <b style={{color:"black"}}>DURATION=</b> <MyTimer expiryTimestamp={time} />
                        </Col>
                  </Row>
                  <hr />
                  <div className='questionPageHeading'>
                        <u><h1>ASSESSMENT</h1></u>
                        <i><h4>(Note:Do not refresh the page during the assessment)</h4></i>
                        
                  </div>
                  <div className="QuestionBg">
                        <br/>
                        
                        <div className='QuestionContainer'>
                              {
                                    currentQuestion && (currentQuestion.type === "ChoiceBased") && (
                                          < Row className="justify-content-md-center">
                                                <Col xs="12" lg="6" style={{ borderRight: "2px dotted grey" }}>
                                                      <span className='questionNumber' >Question No : #{currentIndex + 1}/{questions.length}</span>
                                                      <hr />
                                                      {
                                                            currentQuestion && <>
                                                                  <span className='question'>{currentQuestion.Question}</span>
                                                            </>
                                                      }
                                                </Col>

                                                <Col xs="12" lg="6">
                                                      <div className='options'>
                                                            <FormControl component="fieldset">
                                                                  <FormLabel component="legend">Options:</FormLabel>
                                                                  <RadioGroup aria-label="gender" name="options" defaultValue={answers[currentQuestion.Question]} onChange={(e)=>{
                                                                        answers[currentQuestion.Question]=e.target.value;
                                                                  }}>
                                                                        <FormControlLabel value={currentQuestion.option1} control={<Radio />} label={currentQuestion.option1} />
                                                                        <FormControlLabel value={currentQuestion.option2} control={<Radio />} label={currentQuestion.option2} />
                                                                        <FormControlLabel value={currentQuestion.option3} control={<Radio />} label={currentQuestion.option3} />
                                                                        <FormControlLabel value={currentQuestion.option4} control={<Radio />} label={currentQuestion.option4} />
                                                                  </RadioGroup>
                                                            </FormControl>
                                                      </div>
                                                </Col>

                                          </Row>  
                                    )

                              }

                              {
                                    (currentQuestion) && (currentQuestion.type === "DescriptiveBased") && (
                                          < Row className="justify-content-md-center">
                                                <Col xs="12" lg="6" style={{ borderRight: "2px dotted grey" }}>
                                                      <span className='questionNumber' >Question No : #{currentIndex + 1}/{questions.length}</span>
                                                      <hr />
                                                      {
                                                            currentQuestion && <>
                                                                  <span className='question'>{currentQuestion.Question}</span>
                                                            </>
                                                      }
                                                </Col>
                                                <Col xs="12" lg="6">
                                                      <div className='AnswerBox'>
                                                            <textarea placeholder='Enter the answer in this region' defaultValue={answers[currentQuestion.Question]} onChange={(e) => {
                                                                  answers[currentQuestion.Question] = e.target.value;
                                                            }}></textarea>
                                                      </div>
                                                </Col>
                                          </Row>
                                    )
                              }



                        </div>

                        <br /><br />
                        <div className='buttonContainer'>
                              <button className='f_b_buttons' onClick={handleBack}>{<ArrowBackIosTwoToneIcon />}</button>
                              <button className="submitButton" onClick={handleSubmit}>SUBMIT{<ArrowUpwardTwoToneIcon />}</button>
                              <button className='f_b_buttons' onClick={handleNext}>{<ArrowForwardIosTwoToneIcon />}</button>
                        </div>
                  </div>
            </>
       );
}
 
export default QuestionPage;