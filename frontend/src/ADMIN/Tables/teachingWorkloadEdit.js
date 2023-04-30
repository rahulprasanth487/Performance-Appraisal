import { useState,useEffect, createFactory, useContext,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AdminEditStatus from "../../CONTEXT/AdminEditStatus";
import { Container,Row,Col } from "react-bootstrap";


const TeachingWorkloadEdit = (props) => {

      const { showEdit,setShowEdit,handleUpdate }=useContext(AdminEditStatus)
      const [temp_obj,setTempObj]=useState(props.data)
      delete temp_obj._id
      console.log(temp_obj)
      const navigate = useNavigate()
      const [status, setStatus] = useState(() => {
            return JSON.parse(localStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if (JSON.parse(localStorage.getItem("showProfile")) === false || JSON.parse(localStorage.getItem("showProfile")) == null) {
                  navigate("/admin_log/")
            }
      }, [status])

      // const mks = temp_obj && ((temp_obj).reduce((total, currItem) => total + parseInt(currItem.marks), 0));



      return ( 
            <>
                  <Navbar />


                  {/* {console.log(props.m_id)} */}
                  <div className="Edit">
                        
                        <Container>
                              <div className="editTop">
                                    <h3 style={{ fontFamily: "monospace" }}>EDIT DETAILS</h3>
                                    <div className="closeButton" onClick={() => { setShowEdit(false) }}> <HighlightOffIcon /> </div>
                              </div>

                              <form className="EditForm">
                                    <Row>
                                          <label>NAME</label>
                                          <input style={{ margin: "1px 12px" }} type="text" name="" defaultValue={props.data.name} onInput={(e)=>{temp_obj.name=e.target.value}} />
                                    </Row>
                                    <Row>
                                          <Col>
                                                <label>YEAR</label>
                                                <input type="text" name="" defaultValue={props.data.year} onInput={(e) => { temp_obj.year = e.target.value }} />
                                          </Col>
                                          <Col>
                                                <label>SEMESTER</label>
                                                <input type="text" name="" defaultValue={props.data.semester} onInput={(e) => { temp_obj.semester = e.target.value }} />
                                          </Col>
                                    </Row>
                                    <Row>
                                          <label>BRANCH</label>
                                          <input style={{ margin: "1px 12px" }} type="text" name="" defaultValue={props.data.branch} onInput={(e) => { temp_obj.branch = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <label>SUBJECT</label>
                                          <input style={{ margin: "1px 12px" }} type="text" name="" defaultValue={props.data.subject} onInput={(e) => { temp_obj.subject = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <Col>
                                                <label>MARKS</label>
                                                <input type="text" name="" defaultValue={props.data.marks} onInput={(e) => { temp_obj.marks = e.target.value }} />
                                          </Col>
                                          <Col>
                                                <label>TOTAL STUDENTS</label>
                                                <input type="text" name="" defaultValue={props.data.total_students} onInput={(e) => { temp_obj.total_students = e.target.value }} />
                                          </Col>
                                    </Row>

                                    <button className="btn btn-primary" type="submit" onClick={async (e) => {

                                          e.preventDefault()
                                          const waiting = await fetch("/api/teachingWorkload/patch/" + props.m_id, {
                                                method: "PATCH",
                                                headers: {
                                                      "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify(temp_obj)
                                          })
                                          console.log(waiting.ok)
                                          if (waiting.ok) {
                                                handleUpdate()
                                          }
                                          alert("UPDATED SUCCESSFULLY")
                                          setShowEdit(false)
                                    }}>SUBMIT</button>
                              </form>
                        </Container>
                        
                        
                  </div>
            </>
       );
}
 
export default TeachingWorkloadEdit;