import * as React from 'react';
import Navbar from "../Components/Navbar";
import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../Components/AdminSidebar";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const AssessmentQuestions = () => {
      const navigate=useNavigate();
      var [count,setCount]=useState(0);
      const [temp,setTemp]=useState(0);
      const [buttonClicked,setButton]=useState(true);
      const [status, setStatus] = useState(() => {
            return JSON.parse(sessionStorage.getItem("showProfile"));
      })
      

      

      const [open, setOpen] =useState("0");

      const handleClick = () => {
            setOpen(true);
      };

      const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen(false);
      };



      //data of the forms
      //-----------------------------------------------------
      const [choiceBased,setChoiceBased]=useState({
            "Question":"",
            "option1":"",
            "option2":"",
            "option3":"",
            "option4":"",
            "answer":"",
            "marks":"",
            "type":"ChoiceBased"
      });

      const [descriptiveBased,setDescriptive]=useState({
            "Question":"",
            "marks":"",
            "type":"DescriptiveBased"
      })


      //-----------------------------------------------------

      useEffect(() => {
            if (JSON.parse(sessionStorage.getItem("showProfile")) === false || JSON.parse(sessionStorage.getItem("showProfile")) == null) {
                  navigate("/admin_log/")
            }
      }, [status])

      

      const [question_list, setQuestionList] = useState();

       //FETCHING CONTENTS FROM THE DB
      //----------------------------------------------
      
      const Fetch_Question = async () => {
            fetch("http://localhost:4000/api/assessment/questionList/")
                  .then(res => {
                        if (!res.ok) { throw Error("Error in the code"); };
                        return res.json()
                  })
                  .then(data => { setQuestionList(data) })

      }

      useEffect(()=>{
            Fetch_Question();
      },[temp])



      // Handle insertion
      //-----------------------------------
      const handleSubmitCB = async (e) => {
            e.preventDefault();
            if (window.confirm("Do you want to add the questions?") === true) {

                  fetch("http://localhost:4000/api/assessment/insert/", {
                        method: 'POST',
                        body: JSON.stringify(choiceBased),
                        headers: {
                              'Content-type': 'application/json',
                        },
                  })
                        .then((response) => { response.json(); setTemp(1) })
                        .then((data) => { console.log(data) })

                  setOpen("1")

            }
            else {
                  setOpen("2")
            }
            console.log(open);
            

      }

      const handleSubmitDB = (e) => {
            e.preventDefault();
            if (window.confirm("Do you want to add the questino?") === true) {
                  fetch("http://localhost:4000/api/assessment/insert/", {
                        method: 'POST',
                        body: JSON.stringify(descriptiveBased),
                        headers: {
                              'Content-type': 'application/json',
                        },
                  })
                        .then((response) => { response.json(); setTemp(1) })
                        .then((data) => { console.log(data) })


                  setOpen("1")
            }
            else {

                  setOpen("2")
            }
            


      }
      //------------------------------------------

      // useEffect(() => { Fetch_Question() })
      
      
      //----------------------------------------------

      return ( 
            <>
                  
                  <Navbar />
                  <div className="teach_workload">
                        <div className="Cont1">
                              <ProSidebarProvider>
                                    <AdminSidebar />
                              </ProSidebarProvider>
                        </div>
                        <div className="Cont2" style={{width:"100%"}}>
                              <br/><br/>
                              <Container>
                                    <center><h1>ASSESSMENT QUESTIONS</h1></center>

                                    <br/>
                                    <Row>
                                          <Col  onClick={()=>setButton(true)}  className={buttonClicked?"btn btn-primary questionTypeButtons active":"btn btn-primary questionTypeButtons"}>CHOICE BASED QUESTIONS</Col>
                                          <Col  onClick={()=>setButton(false)} className={buttonClicked?"btn btn-primary questionTypeButtons":"btn btn-primary questionTypeButtons active"}>DESCRIPTIVE TYPE QUESTIONS</Col>
                                    </Row>
                              </Container>

                              <Container>
                                    {
                                          (open === "1") && <Snackbar sx={{ width: "700px", fontSize: "30", padding: "10px", background: "rgb(49, 204, 90)", borderRadius: "10px" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                      Question inserted Successfully
                                                </Alert>
                                          </Snackbar>
                                          
                                    }

                                    {
                                          (open === "2") && <Snackbar sx={{ width: "700px", fontSize: "30", padding: "10px", background: "rgb(255, 112, 112)", borderRadius: "10px" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                                      Question is not inserted
                                                </Alert>
                                          </Snackbar>
                                    }

                                    {
                                          (open === "3") && <Snackbar sx={{ width: "700px", fontSize: "30", padding: "10px", background: "rgb(49, 204, 90)", borderRadius: "10px" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                      Questions deleted Successfully
                                                </Alert>
                                          </Snackbar>
                                    }

                                    {
                                          (open === "4") && <Snackbar sx={{ width: "700px", fontSize: "30", padding: "10px", background: "rgb(255, 112, 112)", borderRadius: "10px" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                                      Questions are not deleted
                                                </Alert>
                                          </Snackbar>
                                    }

                                    <br/>
                                    {buttonClicked && <div className="question-form1">
                                          <form method="POST" onSubmit={handleSubmitCB}>
                                                <Row style={{ margin: "0px" }}>
                                                      <label>Question:</label>
                                                      <input type="text" name="question" placeholder="enter the question" onInput={(e)=>{choiceBased.Question=e.target.value}} required/>
                                                </Row>
                                                <br />
                                                <Row>
                                                      <Col>
                                                            <label>Option : 1</label>
                                                            <input type="text" name="option1" placeholder="option 1" onInput={(e)=>{choiceBased.option1=e.target.value}} required/>
                                                      </Col>
                                                      <Col>
                                                            <label >Option : 2</label>
                                                            <input type="text" name="option2" placeholder="option 2" onInput={(e) => { choiceBased.option2 = e.target.value }} required/>
                                                      </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                      <Col>
                                                            <label>Option : 3</label>
                                                            <input type="text" name="option3" placeholder="option 3" onInput={(e) => { choiceBased.option3 = e.target.value }} required/>
                                                      </Col>
                                                      <Col>
                                                            <label>Option : 4</label>
                                                            <input type="text" name="option4" placeholder="option 4" onInput={(e) => { choiceBased.option4 = e.target.value }} required/>
                                                      </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                      <Col>
                                                            <label>Correct Answer</label>
                                                            <input type="text" name="answer" placeholder="answer" onInput={(e) => { choiceBased.answer = e.target.value }} required/>
                                                      </Col>
                                                      <Col>
                                                            <label >Marks</label>
                                                            <input type="text" name="marks" placeholder="marks" onInput={(e) => { choiceBased.marks = e.target.value }} required/>
                                                      </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                      <Col className="submit">
                                                            <div>
                                                                  <button className="btn btn-success" type="submit" style={{ width: "max-content", padding: "5px 125px" }}>ADD</button>
                                                            </div>
                                                      </Col>
                                                </Row>


                                          </form>
                                    </div>}

                                    {!buttonClicked && <div className="question-form1">
                                          <form method="POST" onSubmit={handleSubmitDB}>
                                                <Row style={{ margin: "0px" }}>
                                                      <label>Question:</label>
                                                      <input type="text" name="question" placeholder="enter the question" onInput={(e) => { descriptiveBased.Question = e.target.value }} required/>
                                                </Row>
                                                <br />
                                                <Row style={{ margin: "0px" }}>
                                                      <label >Marks</label>
                                                      <input type="text" name="marks" placeholder="marks" onInput={(e) => { descriptiveBased.marks = e.target.value }} required />
                                                </Row>
                                                <br/>
                                                <Row>
                                                      <Col className="submit">
                                                            <div>
                                                                  <button className="btn btn-success" style={{ width: "max-content", padding: "5px 125px" }}>ADD</button>
                                                            </div>
                                                      </Col>
                                                </Row>
                                          </form>
                                    </div>}


                                    <br/><br/>

                                    <Row>
                                          <Col>
                                                <h1>QUESTIONS LIST : </h1>
                                          </Col>
                                          <Col style={{display:"flex",width:"100%"}}>
                                                <button className='btn btn-danger questionTypeButtons' onClick={()=>{
                                                      if(window.prompt("Enter 'CONFIRM' to remove - ")==="CONFIRM")
                                                      {
                                                            fetch("/api/assessment/delete/", {
                                                                  method: "DELETE"
                                                            })
                                                            setOpen("3")
                                                      }
                                                      else{
                                                            setOpen("4")
                                                      }
                                                }}>CLEAR ALL QUESTIONS</button>      
                                          </Col>
                                    </Row>

                                    <div>
                                          {question_list && (question_list).map((question)=>(
                                                
                                                <div className='questionBox'>
                                                      
                                                      <Row>
                                                            
                                                            <h4>{question.Question}</h4>
                                                            {(question.type === "DescriptiveBased") && <Col><textarea rows={3} style={{width:"100%",resize:"none"}} wrap={"hard"} ></textarea></Col>}
                                                            {(question.type === "ChoiceBased") && <div>
                                                                  <div className='form-check'>
                                                                        <input className='form-check-input' type="radio" name="option" />{question.option1}
                                                                  </div>
                                                                  <div className='form-check'>
                                                                        <input className='form-check-input' type="radio" name="option" />{question.option2}
                                                                  </div>
                                                                  <div className='form-check'>
                                                                        <input className='form-check-input' type="radio" name="option" />{question.option3}
                                                                  </div>
                                                                  <div className='form-check'>
                                                                        <input className='form-check-input' type="radio" name="option" />{question.option4}
                                                                  </div>
                                                            </div>
                                                            }
                                                            
                                                      </Row>
                                                </div>
                                          ))}
                                    </div>
                                    <br/><br/><br/>
                              </Container>


                              
                        </div>
                  </div>
            </>
       );
}
 
export default AssessmentQuestions;