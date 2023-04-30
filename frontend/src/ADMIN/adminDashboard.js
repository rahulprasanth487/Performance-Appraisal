import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom"
import Navbar from "../Components/Navbar"
import AdminSidebar from "../Components/AdminSidebar"
import {ProSidebarProvider} from "react-pro-sidebar"
import {Container,Row,Col} from "react-bootstrap"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SetAcademicYear from "./DASHBOARD/setAcademicYear";
import "./DASHBOARD/dashboard.css"

const AdminDashboard = () => {
      const [examDuration,setExamDuration] = useState()
      const navigate = useNavigate()
      const [status, setStatus] = useState(() => {
            return JSON.parse(localStorage.getItem("showProfile"));
      })
      const [tableData, setTableData] = useState([]);

      useEffect(() => {
            if (JSON.parse(localStorage.getItem("showProfile")) === false) {
                  navigate("/admin_log/")
            }
      }, [status])


      const handleFetchTableData = async () => {
            const response = await fetch("http://localhost:4000/api/user/collectionData/assessment_start_table")
            const data = await response.json()
            setTableData(data)
            // console.log(data)
      }


      useEffect(() => {
            handleFetchTableData()
      }, [])




      const handleStartPatch = async () => {
            if(window.confirm("Are you sure you want to start the assessment?")){
                  const response = await fetch("http://localhost:4000/api/ADMIN/assessStatus/start", {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              status: true,
                              timeInMins: examDuration,
                              results: false
                        })
                  })
                  handleFetchTableData()
            }

            
      }
      const handleStart = async () => {
            handleClickOpen1();
            handleFetchTableData()
      }

      const handleStop = async () => {
            const response = await fetch("http://localhost:4000/api/ADMIN/assessStatus/stop", {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        status: false
                  })
            })
            handleFetchTableData()
      }

      const handlePublishResults = async () => {
            if(window.confirm("Are you sure you want to publish results?")){
                  const response = await fetch("http://localhost:4000/api/ADMIN/assessStatus/publish", {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                              status:false,
                              results: true
                        })
                  })
                  handleFetchTableData()
            }
      }


      const [open1, setOpen1] = useState(false);

      const handleClickOpen1 = () => {
            setOpen1(true);
      };

      const handleClose1 = () => {
            setOpen1(false);
            return true;
      };


      return ( 

            <div>
                  <Navbar />
                  <div className="teach_workload">
                        <div className="Cont1">
                              <ProSidebarProvider>
                                    <AdminSidebar />
                              </ProSidebarProvider>
                        </div>

                        <div className="Cont2" style={{ width: "100%" }}>

                              <br/>

                              <SetAcademicYear />

                              
                              <Container>
                                    <h2>ASSESSMENTS</h2>
                                    <hr />

                                    <center>
                                          <Row>
                                                {
                                                      tableData[0] && !tableData[0].status && <Col>
                                                            <button className="btn btn-primary" onClick={handleStart}>START ASSESSMENT</button>
                                                      </Col>
                                                }
                                                {
                                                      tableData[0] && tableData[0].status && <Col>
                                                            <button className="btn btn-danger" onClick={handleStop}>STOP ASSESSMENT</button>
                                                      </Col>
                                                }
                                                {
                                                      tableData[0] && !tableData[0].status && !tableData[0].results && <Col>
                                                            <button className="btn btn-success" onClick={handlePublishResults}>PUBLISH RESULTS</button>
                                                      </Col>
                                                }
                                          </Row>
                                    </center>
                              </Container>
                        </div>
                  </div>
            

                  <div>
                        <Dialog open={open1} onClose={handleClose1}>
                              <DialogTitle>DURATION</DialogTitle>
                              <DialogContent>
                                    <DialogContentText>
                                          Enter the duration of the assessment in minutes<br/>
                                          Example:120
                                    </DialogContentText>
                                    <TextField
                                          autoFocus
                                          margin="dense"
                                          id="duration"
                                          label="duration in minutes"
                                          type="text"
                                          fullWidth
                                          variant="standard"
                                          onInput={e =>setExamDuration(e.target.value)}
                                    />
                              </DialogContent>
                              <DialogActions>
                                    <Button onClick={()=>{
                                          handleClose1();
                                          handleStartPatch();
                                    }}>Set Duration</Button>
                              </DialogActions>
                        </Dialog>
                  </div>
            </div>
       );
}
 
export default AdminDashboard;