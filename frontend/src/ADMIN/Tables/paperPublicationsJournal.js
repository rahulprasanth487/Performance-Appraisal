import Navbar from "../../Components/Navbar";
import AdminSidebar from "../../Components/AdminSidebar";
import { ProSidebarProvider } from "react-pro-sidebar"
import useFetch from "../../Components/useFetch";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom"
import PaperInJournalsEdit from "./paperPublicationsJournalEdit";
import AdminEditStatus from "../../CONTEXT/AdminEditStatus";
import { Container } from "react-bootstrap";

const PaperInJournals = () => {
      const { Obj: obj } = useFetch("http://localhost:4000/api/stafflist/")
      const [user_det, setUserdet] = useState()
      var { Obj: table_data } = useFetch("http://localhost:4000/api/paperJournals/" + user_det)
      const [stafflist_status, setStafflist_status] = useState(false)

      const [semester, setSem] = useState();
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

                        {showEdit && entryEdit && <PaperInJournalsEdit data={entryEdit} m_id={id} />}
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
                                                <h1 style={{ textAlign: "center" }}>PAPER PUBLICATIONS IN JOURNALS</h1>
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
                                                      {/* <label>Semester : </label> */}
                                                      {/* <input type="text" name="" onInput={(e) => {

                                                      setSem(e.target.value)
                                                      if ((e.target.value).length === 0) { setShowAll(true) }
                                                      setShowAll(false)
                                                }} />
                                                <br />
                                                <button className="btn btn-primary" onClick={() => { setShowAll(true) }}>SHOW ALL</button> */}
                                                      <br /><br />
                                                </form>

                                                <h2>Details : "{user_det}"</h2>

                                                <div className="table-responsive-md">
                                                      <table className="table table-bordered table-striped">
                                                            <thead className="thead-dark">
                                                                  <tr>
                                                                        <th scope="col">Title</th>
                                                                        <th scope="col">Journal name</th>
                                                                        <th scope="col">Reference</th>
                                                                        <th scope="col">Publisher</th>
                                                                        <th scope="col">Quartile</th>
                                                                        <th scope="col">Marks</th>
                                                                        <th></th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>

                                                                  {
                                                                        table_data && (table_data).map((m) => (
                                                                              <tr>
                                                                                    <td>{m.title}</td>
                                                                                    <td>{m.journal_name}</td>
                                                                                    <td>{m.reference}</td>
                                                                                    <td>{m.publisher}</td>
                                                                                    <td>{m.quartile}</td>
                                                                                    <td>{m.mark}</td>
                                                                                    <td>
                                                                                          <button type="" onClick={() => { setShowEdit(true); setEntryEdit(m); setID(m._id) }}>{<EditIcon />}</button>
                                                                                          <button type="" onClick={() => {

                                                                                                if (window.confirm("Do you want to delete ??") == true) {
                                                                                                      fetch("/api/paperJournals/del/" + m._id)
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

export default PaperInJournals;