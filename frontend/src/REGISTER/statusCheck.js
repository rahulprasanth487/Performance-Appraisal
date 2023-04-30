import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import React from 'react';
import { Container } from "react-bootstrap";
import { Divider } from "@mui/material";
import approved from "../Components/images/approved.png";
import rejected from "../Components/images/rejected.png";
import waiting from "../Components/images/waiting.png";
import {Puff} from "react-loader-spinner"

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});


const StatusCheck = () => {

      const [find, setFind] = useState("");
      const [StatusApproved, setStatusApproved] = useState(false);
      const [StatusRejected, setStatusRejected] = useState(false);
      const [StatusWaiting, setStatusWaiting] = useState(false);


      const [open1, setOpen1] = useState(true);

      const handleClose1 = () => {
            setOpen1(false);
            window.location.reload();
      };

      const [open2, setOpen2] = React.useState(false);

      const handleClickOpen2 = (e) => {
            setOpen2(true);
            setFind(e.target.value)
      };

      const handleClose2 = () => {
            setOpen2(false);
      };


      const [statusLoader, setStatusLoader] = useState(false);

      const handleLoader=()=>{
            setStatusLoader(true);
            setTimeout(() => {
                  setStatusLoader(false)
            }, 3000);
      }

      const handleCheckNoTimer=async ()=>{
            const type=(find==="RegisterStatus")?"registration":"signup";
            const email = document.getElementById("email").value;
            const res = await fetch("http://localhost:4000/api/new_register/registration/statusCheck/", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        "email":email,
                        "type":type
                  })
            });
            
            const data = await res.json();
            console.log(data.status)
            if (Object.keys(data).length===0) {
                  setStatusRejected(true);
                  setStatusApproved(false);
                  setStatusWaiting(false);
            }
            else if (data[0].status === "true") {
                  setStatusApproved(true);
                  setStatusRejected(false);
                  setStatusWaiting(false);
            }

            else if (data[0].status === "false") {
                  setStatusWaiting(true);
                  setStatusApproved(false);
                  setStatusRejected(false);
            }

            // console.log("DATA",data);
      }

      const handleCheck=()=>{
            setStatusRejected(false);
            setStatusApproved(false);
            setStatusWaiting(false);
            handleLoader();
            setTimeout(()=>{
                  handleCheckNoTimer();
            },3000)
      }
      return ( 
            <>
                  <div>
                        <Dialog open={open1} onClose={handleClose1}>
                              <DialogTitle>CHECK STATUS</DialogTitle>
                              <DialogContent>
                                    <DialogContentText style={{marginBottom:20}}>
                                          Choose the following option to check the status of registration or signing up
                                    </DialogContentText>
                                    <FormControl fullWidth>
                                          <InputLabel id="demo-simple-select-label">FIND</InputLabel>
                                          <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Status"
                                                onChange={handleClickOpen2}
                                          >
                                                <MenuItem value={"RegisterStatus"}>REGISTRATION STATUS</MenuItem>
                                                <MenuItem value={"SignUpStatus"}>SIGN UP STATUS</MenuItem>
                                          </Select>
                                    </FormControl>
                              </DialogContent>
                              <DialogActions>
                                    <Button onClick={handleClose1}>CLOSE</Button>
                              </DialogActions>
                        </Dialog>
                  </div>


                  <div className="statusCheck">
                        
                        <Dialog
                              fullScreen
                              open={open2}
                              onClose={handleClose2}
                              TransitionComponent={Transition}
                        >

                              <AppBar sx={{ position: 'relative' }}>
                                    <Toolbar>
                                          <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={handleClose2}
                                                aria-label="close"
                                          >
                                                <CloseIcon />
                                          </IconButton>
                                          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                {
                                                      (find==="RegisterStatus")?("REGISTRATION STATUS"):("SIGN UP STATUS")
                                                }
                                          </Typography>
                                          <Button autoFocus color="inherit" onClick={handleClose2}>
                                                CLOSE
                                          </Button>
                                    </Toolbar>
                              </AppBar>
                              <List>
                                    <Container>
                                          <center>
                                                <i><h1>GIVE THE EMAIL TO CHECK THE STATUS</h1></i>
                                                <br />
                                                <form>
                                                      <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            id="email"
                                                            label="Enter your email"
                                                            type="email"
                                                            fullWidth
                                                            variant="standard"
                                                            sx={{
                                                                  width: "70%"
                                                            }}
                                                            required
                                                      />
                                                      <br /><br />
                                                      <button type="submit" className="btn btn-danger" onClick={(e)=>{
                                                            e.preventDefault();
                                                            handleCheck();
                                                      }}>CHECK</button>
                                                </form>
                                          </center>
                                          <Divider />
                                          
                                          <br/>
                                          <div>
                                                {
                                                      StatusApproved && <center>
                                                            <br /><br />
                                                            <img src={approved} alt="APPROVED" width="15%" height="15%" />
                                                            <h4><i>APPROVED</i></h4>
                                                            <h4><i>YOU ARE ELIGIBLE TO TAKE THE ASSESSMENT</i></h4>
                                                      </center>
                                                }

                                                {
                                                      StatusRejected && <center>
                                                            <br /><br />
                                                            <img src={rejected} alt="APPROVED" width="15%" height="15%" />
                                                            <h4><i>REJECTED</i></h4>
                                                            <h4><i>YOU ARE NOT ELIGIBLE TO TAKE THE ASSESSMENT</i></h4>
                                                      </center>
                                                }

                                                {
                                                      StatusWaiting && <center>
                                                            <br /><br />
                                                            <img src={waiting} alt="APPROVED" width="15%" height="15%" />
                                                            <h4><i>STATUS IS WAITING</i></h4>
                                                      </center>
                                                }

                                                
                                                {
                                                      statusLoader && <>
                                                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                                  <br /><br />
                                                                  <center>
                                                                        <Puff
                                                                              height="50"
                                                                              width="50"
                                                                              radius={0.75}
                                                                              color="black"
                                                                              ariaLabel="puff-loading"
                                                                              wrapperStyle={{}}
                                                                              wrapperClass=""
                                                                              visible={true}

                                                                        />
                                                                  </center>

                                                            </div>
                                                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>

                                                                  <center>
                                                                        <i>Status loading..</i>
                                                                  </center>

                                                            </div>
                                                      </>
                                                }

                                          </div>
                                    </Container>
                              </List>
                        </Dialog>
                  </div>
            </>
       );
}
 
export default StatusCheck;