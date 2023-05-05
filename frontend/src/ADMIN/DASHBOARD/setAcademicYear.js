import { useState,useEffect } from "react";
import { Container,Row,Col, Table } from "react-bootstrap";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from "react";
import { TextField } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SetAcademicYear = () => {

      const [open1, setOpen1] = React.useState(false);
      const [statusTable,setStatusTable]=useState([]);

      const FetchStatusTable = async ()=>{
            const response = await fetch("http://localhost:4000/api/user/collectionData/data_entry_status");
            const data=await response.json();
            setStatusTable(data);
      }
      
      useEffect(()=>{
            FetchStatusTable();
      },[])

      const handleClickOpen1 = () => {
            setOpen1(true);
      };

      const handleClose1 = () => {
            setOpen1(false);
      };


      const [open3, setOpen3] = React.useState(false);

      const handleClickOpen3 = () => {
            setOpen3(true);
      };

      const handleClose3 = () => {
            setOpen3(false);
      };

      const [open4, setOpen4] = React.useState(false);


      const handleClose4 = () => {
            setOpen4(false);
      };

      const [open2, setOpen2] = React.useState(false);

      const handleClick2 = () => {
            setOpen2(true);
      };

      const handleClose2 = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen2(false);
      };

      const [firstYear,setFirstYear] = useState();
      const [secondYear,setSecondYear] = useState();

      const handleSubmit = async (e) => {
            console.log(firstYear + "-" + secondYear);
            
            e.preventDefault();
            const response = await fetch("http://localhost:4000/api/ADMIN/setAcademicYear", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        "add_button":"false",
                        "academicYear":firstYear+"-"+secondYear
                  })
            })
            const data = await response.json()
            
            console.log(data)
            setOpen2(true)
            handleClose1()
            FetchStatusTable();
      }



      const handleLock = async (e,year)=>{

            await fetch("http://localhost:4000/api/ADMIN/changeLock/"+year, {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        "add_button":(e.target.value=="lock")?"true":"false",
                  })
            
            })
            .then(res => FetchStatusTable())
            .then(data => FetchStatusTable())
      }

      const handleDelete=async (id)=>{

            if(window.prompt("enter 'DELETE' to remove the academic year= ")==="DELETE")
            {
                  setOpen4(true)
                  await fetch("http://localhost:4000/api/ADMIN/deleteYear/"+id,{
                        method:"DELETE"
                  })
                  .then(res => FetchStatusTable())
                  .then(data => FetchStatusTable())

            }

      }

      return ( 
            <>
                  <Container>
                        <hr />
                        <h2>ACADEMIC YEAR</h2>
                        <hr />
                        <center>
                              <Row>
                                    {
                                          <Col>
                                                <button className="btn btn-primary" onClick={handleClickOpen1}>SET ACADEMIC YEAR</button>
                                          </Col>
                                    }
                                    {
                                          <Col>
                                                <button className="btn btn-warning" onClick={handleClickOpen3}>LOCK DATA ENTRY</button>
                                          </Col>
                                    }
                              </Row>
                        </center>
                  </Container>

                  <div>
                        <Dialog
                              open={open1}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={handleClose1}
                              aria-describedby="alert-dialog-slide-description"
                        >
                              <DialogTitle>{"ACADEMIC YEAR"}</DialogTitle>
                              
                              <form onSubmit={handleSubmit}>
                                    <DialogContent>
                                          <DialogContentText id="alert-dialog-slide-description">
                                                Enter the academic year in the format YYYY-YYYY (Eg : 2022-2023)
                                          </DialogContentText>

                                          <TextField
                                                autoFocus
                                                margin="dense"
                                                id="from"
                                                label="FROM "
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                placeholder="2022"
                                                onInput={e =>setFirstYear(e.target.value)}
                                                required
                                          />

                                          <TextField
                                                autoFocus
                                                margin="dense"
                                                id="to"
                                                label="TO "
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                placeholder="2022"
                                                onInput={e =>setSecondYear(e.target.value)}
                                                required
                                          // onInput={e =>setExamDuration(e.target.value)}
                                          />
                                    </DialogContent>
                                    <DialogActions>
                                          <Button onClick={handleClose1}>CANCEL</Button>
                                          <Button type="submit">SUBMIT</Button>
                                    </DialogActions>
                              </form>
                        </Dialog>
                  </div>


                  <div>
                        <Dialog
                              open={open3}
                              TransitionComponent={Transition}
                              keepMounted
                              onClose={handleClose3}
                              aria-describedby="alert-dialog-slide-description"
                        >
                              <DialogTitle>{"ACADEMIC YEAR"}</DialogTitle>

                                    <DialogContent>
                                          <DialogContentText id="alert-dialog-slide-description">
                                                Academic year can be removed and locked/unlocked
                                          </DialogContentText>

                                          <br/>
                                          <Table className="table table-dark table-bordered table-responsive">
                                                <thead>
                                                      <tr>
                                                            <th>ACADEMIC YEAR</th>
                                                            <th></th>
                                                            <th></th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                            {
                                                                  statusTable && (statusTable).map((item)=>(
                                                                        <tr>
                                                                              <td>{item.academicYear}</td>
                                                                              <td>
                                                                                    <center>
                                                                                          {(item.add_button == "true") ? <button className="btn btn-success" value={"unlock"} style={{ padding: "5px", fontSize: "15px" }} onClick={(e)=>{
                                                                                                if(window.confirm("Sure to UNLOCK??"))
                                                                                                {
                                                                                                      handleLock(e,item.academicYear);
                                                                                                }
                                                                                          }}>LOCK</button> : <button className="btn btn-danger" value={"lock"} style={{ padding: "5px", fontSize: "15px" }} onClick={(e)=>{
                                                                                                if (window.confirm("Sure to LOCK??")) {
                                                                                                      handleLock(e,item.academicYear);
                                                                                                }
                                                                                          }}>UNLOCK</button>}
                                                                                    </center>
                                                                              </td>
                                                                              <td><center className="deleteIconCircle" onClick={() => { handleDelete(item._id) }}><RemoveCircleOutlinedIcon /></center></td>
                                                                        </tr>
                                                                  ))
                                                            }
                                                </tbody>
                                          </Table>
                                          
                                    </DialogContent>
                                    <DialogActions>
                                          <Button onClick={handleClose3}>DONE</Button>
                                    </DialogActions>
                        </Dialog>
                  </div>


                  <Snackbar open={open2} autoHideDuration={1000} onClose={handleClose2}>
                        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                              Academic Year Set Successfully
                        </Alert>
                  </Snackbar>

                  <Snackbar open={open4} autoHideDuration={1000} onClose={handleClose4}>
                        <Alert onClose={handleClose4} severity="success" sx={{ width: '100%' }}>
                              Academic Year DELETED Successfully
                        </Alert>
                  </Snackbar>
                  <br/>

            </>
       );
}
 
export default SetAcademicYear;