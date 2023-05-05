import "./register.css"
import Navbar from "../Components/Navbar"
import { Container,Row,Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StatusCheck from "./statusCheck";
import SignUpForm from "./signUpForm";
import Snackbar from '@mui/material/Snackbar';
import React from "react";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const NewRegisterForm = () => {

      const [mobileNumberLength, setMobileNumberLength] = useState();
      const [firstName,setFirstName]=useState("");
      const [lastName, setLastName] = useState("");
      const [experienceYN,setExpYN]=useState("No");
      const [err,setErr]=useState(false);
      const navigate=useNavigate();
      const [emailErr,setEmailErr]=useState(false);
      const [open2, setOpen2] = useState(false);

      const handleErrClose = (event, reason) => {
            if (reason === 'clickaway') {
                  return;
            }

            setOpen2(false);
      };
      
      
      const [registerDetails]=useState({
            "name":firstName+" "+lastName,
            "specialized_domain":"",
            "prev_exp":"No",
            "prev_det":"",
            "dob":"",
            "experience":"",
            "contact_number":"",
            "email":"",
            "type":"registration",
            "status":"false",
            "about":"",
            "gender":""
      })

      const handleSubmit=async (e)=>{
            e.preventDefault();
            registerDetails.name=firstName+" "+lastName;
            // console.log(registerDetails)

            const tempResponse=await fetch("http://localhost:4000/api/new_register/registration/"+registerDetails.email);
            const tempData=await tempResponse.json();

            console.log(tempData)
            if(tempData.length == 0)
            {
                  setEmailErr(false);
                  if (!emailErr && window.confirm("Do you want to register ?")) {
                        setOpen(true);
                        // console.log(open)
                        const response = await fetch("http://localhost:4000/api/new_register/registration/", {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify(registerDetails)
                        })

                        const data = await response.json();

                        alert("SUCCESSFULLY REGISTERED")

                  }
            }
            else{
                  setEmailErr(true);
                  setOpen2(true);
            }
      }

      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
            setOpen(true);
      };

      const handleClose = () => {
            setOpen(false);

            //need navigation to landing page
            navigate("/user")
      };
      

      
      
      return ( 
            <>
                  <Navbar/>
                  <Container>

                        {/* {temp && <StatusCheck />}
                        <button onClick={() => { setTemp(true) }}>CLICK</button>
                        <br/>
                        {temp2 && <SignUpForm />}
                        <button onClick={() => { setTemp2(true) }}>SignUp</button> */}

                        <br/>
                        <h1 className="text-center">Register</h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                    <TextField
                                          type="text"
                                          variant='outlined'
                                          color='secondary'
                                          label="First Name"
                                          onChange={async (e) => { await setFirstName(e.target.value)}}
                                          fullWidth
                                          required
                                    />
                                    <TextField
                                          type="text"
                                          variant='outlined'
                                          color='secondary'
                                          label="Last Name"
                                          onChange={async (e) => {
                                                setLastName(e.target.value);
                                          }}
                                          fullWidth
                                          required
                                    />
                                    
                              </Stack>
                              <TextField
                                    type="email"
                                    variant='outlined'
                                    color='secondary'
                                    label="Email"
                                    error={emailErr}
                                    fullWidth
                                    onChange={(e)=>{registerDetails.email=e.target.value;}}
                                    required
                                    sx={{ mb: 4 }}
                              />

                              <FormControl fullWidth style={{ marginBottom: 35 }}>
                                    <InputLabel id="demo-simple-select-label">GENDER*</InputLabel>
                                    <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="GENDER"
                                          required
                                          onChange={(e) => { registerDetails.gender = e.target.value;}}
                                    >
                                          <MenuItem value={"male"}>MALE</MenuItem>
                                          <MenuItem value={"female"}>FEMALE</MenuItem>
                                          <MenuItem value={"others"}>OTHERS</MenuItem>
                                    </Select>

                              </FormControl>

                              <TextField
                                    type="date"
                                    variant='outlined'
                                    color='secondary'
                                    fullWidth
                                    required
                                    onChange={(e) => { registerDetails.dob = e.target.value; }}
                                    sx={{ mb: 4 }}
                              />
                              
                              <TextField
                                    type="tel"
                                    variant='outlined'
                                    color='secondary'
                                    label="Contact Number"
                                    placeholder="Eg: 9876543210"
                                    onChange={(e)=>{
                                          setMobileNumberLength(e.target.value.length)
                                          registerDetails.contact_number=e.target.value;
                                          setErr(mobileNumberLength !== 9 && mobileNumberLength > 0)
                                    }}
                                    error={mobileNumberLength !==10 && mobileNumberLength >0 }
                                    fullWidth
                                    required
                                    sx={{ mb: 4 }}
                              />
                              <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    label="Specialized Domains"
                                    placeholder="Eg: Web Development, App Development, etc"
                                    fullWidth
                                    required
                                    onChange={(e) => { registerDetails.specialized_domain = e.target.value; }}
                                    sx={{ mb: 4 }}
                              />
                              

                              <FormControl fullWidth style={{marginBottom:35}}>
                                    <InputLabel id="demo-simple-select-label">Do you have any previous experience?</InputLabel>
                                    <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Do you have any previous experience?"
                                          required
                                          defaultValue={"No"}
                                          onChange={(e) => { registerDetails.prev_exp = e.target.value; setExpYN(e.target.value) }}
                                    >
                                          <MenuItem value={"Yes"}>YES</MenuItem>
                                          <MenuItem value={"No"}>NO</MenuItem>
                                    </Select>
                                    
                              </FormControl>
                              
                              {
                                    
                                   
                                    (experienceYN === "Yes") && <>
                                          <TextField
                                                type="text"
                                                variant='outlined'
                                                color='secondary'
                                                label="Number of years of Experience"
                                                placeholder="Eg: 2"
                                                fullWidth
                                                required
                                                onChange={(e) => { registerDetails.experience = e.target.value; }}
                                                sx={{ mb: 4 }}
                                          />

                                          <TextField
                                                type="text"
                                                variant='outlined'
                                                color='secondary'
                                                label="Name of the organization"
                                                placeholder="Eg: Anna Univeristy, etc"
                                                fullWidth
                                                required
                                                onChange={(e) => { registerDetails.prev_det = e.target.value; }}
                                                sx={{ mb: 4 }}
                                          />
                                    </>
                              }


                              <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={4}
                                    placeholder="ABOUT YOURSELF (minimum 100 words))"
                                    onChange={(e) => { registerDetails.about = e.target.value; }}
                                    style={{ width: "100%",padding:"12px",borderRadius:"5px",marginBottom:35}}
                              />


                              <center>
                                    <Button variant="contained" disabled={err} color="primary" style={{ width: "30%" }} type="submit">Register</Button>
                              </center>
                        </form>
                        <br/><br/>
                  </Container>
                  

                  {
                        open && <div>
                              <Dialog
                                    open={true}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                              >
                                    <DialogTitle id="alert-dialog-title">
                                          {"IMPORTANT INSTRUCTION"}
                                    </DialogTitle>
                                    <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                                Check your status for the approval from the admin to write the assessment.
                                          </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                          <Button onClick={handleClose} autoFocus>
                                                OK
                                          </Button>
                                    </DialogActions>
                              </Dialog>
                        </div>
                  }


                  <Snackbar open={open2} autoHideDuration={1000} onClose={handleErrClose}>
                        <Alert onClose={handleErrClose} severity="error" sx={{ width: '100%' }}>
                             Email already exists
                        </Alert>
                  </Snackbar>
            </>
       );
}
 
export default NewRegisterForm;