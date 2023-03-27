import Navbar from "../../Components/Navbar";
import AdminSidebar from "../../Components/AdminSidebar";
import { ProSidebarProvider } from "react-pro-sidebar"
import useFetch from "../../Components/useFetch";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom"
import TeachingLearningPracticesEdit from "./teachingLearningPracticesEdit";
import AdminEditStatus from "../../CONTEXT/AdminEditStatus";
import { Container,Row,Col } from "react-bootstrap";

const TeachingLearningPractices = () => {
      const { Obj: obj } = useFetch("http://localhost:4000/api/stafflist/")
      const [user_det, setUserdet] = useState()
      var { Obj: table_data } = useFetch("http://localhost:4000/api/teachingLearningPractices/" + user_det)
      const [stafflist_status, setStafflist_status] = useState(false)

      //FILTER
      const [filter_cont, setFilter_cont] = useState(table_data)
      useEffect(() => { setFilter_cont(table_data) }, [table_data])
      const [showAll, setShowAll] = useState(true);


      const [showEdit, setShowEdit] = useState(false)
      const [entryEdit, setEntryEdit] = useState()

      const navigate = useNavigate()
      const [status, setStatus] = useState(() => {
            return JSON.parse(sessionStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if (JSON.parse(sessionStorage.getItem("showProfile")) === false || JSON.parse(sessionStorage.getItem("showProfile")) == null) {
                  navigate("/admin_log/")
            }
      }, [status])

      //alert(status)

      const [id, setID] = useState(null)

      useEffect(() => {
            if (obj != null) {
                  setStafflist_status(true)
            }
      }, [obj])

      return (
            <AdminEditStatus.Provider value={{ showEdit, setShowEdit }}>
                  <>
                        {showEdit && entryEdit && <TeachingLearningPracticesEdit data={entryEdit} m_id={id} />}
                        {!showEdit && <>
                              {console.log(table_data)}
                              <Navbar />
                              <div className="teach_workload">

                                    <div className="Cont1">
                                          <ProSidebarProvider>
                                                <AdminSidebar />
                                          </ProSidebarProvider>
                                    </div>
                                    <Container>
                                          <div className="Cont2">
                                                <h1 style={{ textAlign: "center" }}>TEACHING LEARNING PRACTICES</h1>

                                                <form onSubmit={(e) => { e.preventDefault() }}>
                                                      <label>Staff name : </label>
                                                      <select onInput={(e) => { setUserdet(e.target.value) }}>
                                                            <option></option>
                                                            {
                                                                  stafflist_status && obj.map((mp) => (
                                                                        <option defaultValue={mp.name} key={mp._id}>{mp.name}</option>
                                                                  ))
                                                            }
                                                      </select>
                                                      <br />
                                                      <br /><br />

                                                      <Row className="mb-3" style={{ width: "40%" }}>
                                                            <Col>
                                                                  <label>Academic Year From : </label>
                                                                  <input type="text" name="" onInput={(e) => {
                                                                        if ((e.target.value).length === 0) { setShowAll(true) }
                                                                        if ((e.target.value).length > 0) {
                                                                              setFilter_cont(table_data.filter((item) => (item.academic_year).slice(0, (e.target.value).length) === (e.target.value)))
                                                                        }
                                                                        else {
                                                                              setFilter_cont(table_data)
                                                                        }
                                                                        console.log(filter_cont)

                                                                  }} />
                                                            </Col>
                                                            {/* <Col>
                                                                  <label>TO : </label>
                                                                  <input type="text" name="" onChange={(e) => {
                                                                        if ((e.target.value).length === 0) { setShowAll(true) }
                                                                        if ((e.target.value).length > 0) {
                                                                              setFilter_cont(filter_cont.filter((item) => item.academic_year.toLowerCase().includes(e.target.value)))
                                                                        }
                                                                        else {
                                                                              setFilter_cont(table_data)
                                                                        }
                                                                        console.log(filter_cont)

                                                                  }} />
                                                            </Col> */}
                                                      </Row>


                                                      <br /><br />
                                                </form>

                                                <h2>Details : "{user_det}"</h2>

                                                <div className="table-responsive-md">
                                                      <table className="table table-bordered table-striped">
                                                            <thead className="thead-dark">
                                                                  <tr>
                                                                        <th scope="col">Academic year</th>
                                                                        <th scope="col">Subject</th>
                                                                        <th scope="col">Innovation adopted</th>
                                                                        <th scope="col">marks</th>
                                                                        <th></th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>

                                                                  {
                                                                        filter_cont && (filter_cont).map((m) => (
                                                                              showAll && <tr>
                                                                                    <td>{m.academic_year}</td>
                                                                                    <td>{m.subject}</td>
                                                                                    <td>{m.innovation_adopted}</td>
                                                                                    <td>{m.marks}</td>
                                                                                    <td>
                                                                                          <button type="" onClick={() => { setShowEdit(true); setEntryEdit(m); setID(m._id) }}>{<EditIcon />}</button>
                                                                                          <button type="" onClick={() => {

                                                                                                if (window.confirm("Do you want to delete ??") == true) {
                                                                                                      fetch("/api/teachingLearningPractices/del/" + m._id)
                                                                                                      window.location.reload();
                                                                                                      alert("DELETED SUCCESSFULLY")
                                                                                                }
                                                                                          }}>{<DeleteForeverIcon />}</button>
                                                                                    </td>

                                                                              </tr>
                                                                        ))
                                                                  }
                                                                  {console.log("Rerendered")}
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </div>
                                    </Container>
                              </div>
                        </>}
                  </>

            </AdminEditStatus.Provider>
      );
}

export default TeachingLearningPractices;