import { useState, useEffect, createFactory, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AdminEditStatus from "../../CONTEXT/AdminEditStatus";
import { Container, Row, Col } from "react-bootstrap";


const ProjectGuidanceEdit = (props) => {

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
                                          <label>NAME OF THE STUDENT</label>
                                          <input style={{ margin: "1px 12px" }} type="text" name="" defaultValue={props.data.name_student} onInput={(e) => { temp_obj.name_student = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <label>DATE</label>
                                          <input type="text" name="" defaultValue={props.data.date} onInput={(e) => { temp_obj.date = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <Col>
                                                <label>UG/PG</label>
                                                <input type="text" name="" defaultValue={props.data.UG_PG} onInput={(e) => { temp_obj.UG_PG = e.target.value }} />
                                          </Col>
                                          <Col>
                                                <label>mark</label>
                                                <input type="text" name="" defaultValue={props.data.mark} onInput={(e) => { temp_obj.mark = e.target.value }} />
                                          </Col>
                                    </Row>
                                    

                                    <button className="btn btn-primary" type="submit" onClick={(e) => {
                                          // console.log(props.data._id)
                                          // console.log(temp_obj)
                                          fetch("/api/projectGuidance/patch/" + props.m_id, {
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

export default ProjectGuidanceEdit;