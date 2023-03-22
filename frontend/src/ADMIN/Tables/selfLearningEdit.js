import { useState, useEffect, createFactory, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AdminEditStatus from "../../CONTEXT/AdminEditStatus";
import { Container, Row, Col } from "react-bootstrap";


const SelfLearningEdit = (props) => {

      const { showEdit, setShowEdit } = useContext(AdminEditStatus)
      const [temp_obj, setTempObj] = useState(props.data)
      console.log(temp_obj)
      delete temp_obj._id
      console.log(temp_obj)
      const navigate = useNavigate()
      const [status, setStatus] = useState(() => {
            return JSON.parse(sessionStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if (JSON.parse(sessionStorage.getItem("showProfile")) === false || JSON.parse(sessionStorage.getItem("showProfile")) == null) {
                  navigate("/admin_log/")
            }
      }, [status])


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
                                          <input style={{ margin: "1px 12px" }} type="text" name="" defaultValue={props.data.name} onInput={(e) => { temp_obj.name = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <label>Course</label>
                                          <input style={{ margin: "1px 12px" }} type="text" name="" defaultValue={props.data.Course} onInput={(e) => { temp_obj.Course = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <label>Institution</label>
                                          <input style={{ margin: "1px 12px" }} type="text" name="" defaultValue={props.data.Institution} onInput={(e) => { temp_obj.Institution = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <Col>
                                                <label>Duration</label>
                                                <input type="text" name="" defaultValue={props.data.Duration} onInput={(e) => { temp_obj.Duration = e.target.value }} />
                                          </Col>
                                          <Col>
                                                <label>Credits</label>
                                                <input type="text" name="" defaultValue={props.data.Credits} onInput={(e) => { temp_obj.Credits = e.target.value }} />
                                          </Col>
                                          <Col>
                                                <label>Marks</label>
                                                <input type="text" name="" defaultValue={props.data.marks} onInput={(e) => { temp_obj.marks = e.target.value }} />
                                          </Col>
                                    </Row>

                                    <button className="btn btn-primary" type="submit" onClick={(e) => {
                                          // console.log(props.data._id)
                                          // console.log(temp_obj)
                                          fetch("/api/selfLearning/patch/" + props.m_id, {
                                                method: "PATCH",
                                                headers: {
                                                      "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify(temp_obj)
                                          })
                                                .then((e) => { e.json() })
                                          alert("UPDATED SUCCESSFULLY")
                                    }}>SUBMIT</button>
                              </form>
                        </Container>


                  </div>
            </>
      );
}

export default SelfLearningEdit;