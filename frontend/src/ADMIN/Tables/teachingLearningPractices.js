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

      //..
      const [table_data,setTableData]=useState();
      const [aca_year, setAcaYear] = useState("");
 
      const [stafflist_status, setStafflist_status] = useState(false)


      const [showAll, setShowAll] = useState(true);


      const [showEdit, setShowEdit] = useState(false)
      const [entryEdit, setEntryEdit] = useState()

      const navigate = useNavigate()
      const [status, setStatus] = useState(() => {
            return JSON.parse(localStorage.getItem("showProfile"));
      })

      useEffect(() => {
            if (JSON.parse(localStorage.getItem("showProfile")) === false || JSON.parse(localStorage.getItem("showProfile")) == null) {
                  navigate("/admin_log/")
            }
      }, [status])

      const FETCHDATA = async () => {
            await fetch("http://localhost:4000/api/teachingLearningPractices/" + user_det)
                  .then(res => {
                        if (!res.ok) {
                              throw Error("Error in fetching the data");
                        }
                        return res.json();
                  })
                  .then(data => { console.log("DATA IS FETCHED"); setTableData(data); handleYear(aca_year); setFilter_cont(data) })


      }
      useEffect(() => {
            FETCHDATA();
            handleUpdate();
            localStorage.setItem("academic_year", "")
      }, [user_det, showEdit])

      useEffect(() => {
            setAcaYear(localStorage.getItem("academic_year"))
            handleYear(aca_year);

      }, [aca_year])

      //FILTER
      const [filter_cont, setFilter_cont] = useState(table_data)

      // useEffect(() => { setFilter_cont(table_data) }, [table_data])
      const handleYear = (aca_year) => {
            console.log(aca_year)
            if ((aca_year).length === 0) { setShowAll(true) }
            if ((aca_year).length > 0) {
                  table_data && setFilter_cont(table_data.filter((item) => (item.academic_year).slice(0, (aca_year).length) === (aca_year)))
            }
            else {
                  table_data && setFilter_cont(table_data)
            }
      }

      

      //alert(status)

      const [id, setID] = useState(null)

      useEffect(() => {
            if (obj != null) {
                  setStafflist_status(true)
            }
      }, [obj])


      //MARK UPDATE
      //MARKS
      useEffect(() => {
            FETCHDATA();
            handleYear(aca_year);
            if (aca_year.length > 0) {
                  setFilter_cont(table_data.filter((item) => (item.academic_year).slice(0, (aca_year).length) === (aca_year)))
            }
      }, [])

      const handleUpdate = async (id = "") => {
            FETCHDATA();
            handleYear(aca_year);

            if (aca_year) {
                  let tempObj;
                  await fetch("http://localhost:4000/api/teachingLearningPractices/" + user_det)
                        .then(res => {
                              if (!res.ok) {
                                    throw Error("Error in fetching the data");
                              }
                              return res.json();
                        })
                        .then(data => {
                              setTableData(data)
                              tempObj = (table_data.filter((item) => (item.academic_year).slice(0, (aca_year).length) === (aca_year)))
                              if (id.length > 0) {
                                    tempObj = (tempObj.filter((item) => (id != item._id)))
                              }
                              // tempObj.map(item => (console.log(item.avg_marks)))
                              console.log("INSIDE FILTER : ", tempObj)
                        })
                  const obj = {
                        "table_name": "teaching_learning_practices",
                        "name": user_det,
                        "academic_year": tempObj && tempObj[0]["academic_year"],
                        "markField": "avg_marks",
                        "maxMarks": "5"
                  }

                  console.log(obj)
                  await fetch("http://localhost:4000/api/markUpdate2/", {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(obj)
                  })
            }

            localStorage.setItem("academic_year", "");
            setAcaYear("")
      }

      return (
            <AdminEditStatus.Provider value={{ showEdit, setShowEdit,handleUpdate }}>
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
                                                      <select onInput={(e) => { setUserdet(e.target.value); localStorage.setItem("name", e.target.value) }}>
                                                            <option disabled selected><i>Choose</i></option>
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
                                                                  <input type="text" name="" value={localStorage.getItem("academic_year")} onChange={(e) => {
                                                                        setAcaYear(e.target.value)
                                                                        handleYear(e.target.value)
                                                                        localStorage.setItem("academic_year", e.target.value)
                                                                  }} />
                                                            </Col>
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
                                                                        <th scope="col">Semester</th>
                                                                        <th scope="col">Innovation adopted</th>
                                                                        <th scope="col">marks</th>
                                                                        <th></th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {console.log(filter_cont)}

                                                                  {
                                                                        filter_cont && (filter_cont).map((m) => (
                                                                              <tr>
                                                                                    <td>{m.academic_year}</td>
                                                                                    <td>{m.subject}</td>
                                                                                    <td>{m.semester}</td>
                                                                                    <td>{m.innovation_adopted}</td>
                                                                                    <td>{m.marks}</td>
                                                                                    <td>
                                                                                          <button type="" onClick={() => {
                                                                                                if (localStorage.getItem("academic_year")) {
                                                                                                      setShowEdit(true); setEntryEdit(m); setID(m._id);

                                                                                                }
                                                                                                else {
                                                                                                      alert("Set The academic year")
                                                                                                }

                                                                                          }
                                                                                          }>{<EditIcon />}</button>
                                                                                          <button type="" onClick={async () => {
                                                                                                setUserdet(localStorage.getItem("name"))
                                                                                                // setAcaYear(localStorage.getItem("ac
                                                                                                if (localStorage.getItem("academic_year")) {
                                                                                                      if (window.confirm("Do you want to delete ??") === true) {
                                                                                                            await fetch("/api/teachingLearningPractices/del/" + m._id)
                                                                                                                  .then(res => {
                                                                                                                        return res.json()
                                                                                                                  })
                                                                                                                  .then(data => {
                                                                                                                        handleUpdate(m._id);
                                                                                                                  })
                                                                                                            alert("DELETED SUCCESSFULLY")
                                                                                                      }
                                                                                                }
                                                                                                else {
                                                                                                      alert("SET THE ACADEMIC YEAR")
                                                                                                }
                                                                                                localStorage.setItem("academic_year", "")
                                                                                                setAcaYear(" ")
                                                                                          }}>{<DeleteForeverIcon />}</button>
                                                                                          
                                                                                    </td>

                                                                              </tr>
                                                                        ))
                                                                  }
                                                                  
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