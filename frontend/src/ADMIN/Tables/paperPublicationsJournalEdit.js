import { useState, useEffect, createFactory, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AdminEditStatus from "../../CONTEXT/AdminEditStatus";
import { Container, Row, Col } from "react-bootstrap";


const PaperInJournalsEdit = (props) => {

      const { showEdit, setShowEdit,handleUpdate } = useContext(AdminEditStatus)
      const [temp_obj, setTempObj] = useState(props.data)
      console.log(temp_obj)
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
                                          <label>TITLE</label>
                                          <input type="text" name="" defaultValue={props.data.title} onInput={(e) => { temp_obj.title = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <label>JOURNAL NAME</label>
                                          <input type="text" name="" defaultValue={props.data.journal_name} onInput={(e) => { temp_obj.journal_name = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <label>REFERENCE</label>
                                          <input type="text" name="" defaultValue={props.data.reference} onInput={(e) => { temp_obj.reference = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <label>PUBLISHER</label>
                                          <input type="text" name="" defaultValue={props.data.publisher} onInput={(e) => { temp_obj.publisher = e.target.value }} />
                                    </Row>
                                    <Row>
                                          <Col>
                                                <label>quartile</label>
                                                <input type="text" name="" defaultValue={props.data.quartile} onInput={(e) => { temp_obj.quartile = e.target.value }} />
                                          </Col>
                                          <Col>
                                                <label>marks</label>
                                                <input type="text" name="" defaultValue={props.data.marks} onInput={(e) => { temp_obj.marks = e.target.value }} />
                                          </Col>
                                    </Row>


                                    <button className="btn btn-primary" type="submit" onClick={async (e) => {
                                          e.preventDefault()
                                          const waiting = await fetch("/api/paperJournals/patch/" + props.m_id, {
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

export default PaperInJournalsEdit;