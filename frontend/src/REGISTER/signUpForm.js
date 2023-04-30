import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Input, Stack } from '@mui/material';
import signUpBg from "../Components/images/SignUpBg.jpg"
import avatar from "../Components/images/avatar.jpg"
import { Col, Container,Row } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

const SignUpForm = () => {

      const [Notpermitted,setNotPermitted]=React.useState(false);
      const [alreadyExits,setAlreadyExits]=React.useState(false);
      const [open1, setOpen1] = React.useState(true);
      const [mobileNumberLength, setMobileNumberLength] = useState();
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [experienceYN, setExpYN] = useState("No");
      const [err, setErr] = useState(false);
      const navigate=useNavigate();
      //signup form
      const [open3, setOpen3] = React.useState(false);

      const handleClose3 = () => {
            setOpen3(false);
      };


      // const handleClickOpen1 = () => {
      //       setOpen1(true);
      // };

      const handleClose1 = () => {
            setOpen1(false);
            window.location.reload();
      };

      const [data,setData]=React.useState();
      const handleCheck=async (e)=>{
            e.preventDefault();
            const mail=document.getElementById('mail').value;
            
            await fetch('http://localhost:4000/api/new_register/registration/SignUpStatusCheck/',{
                  method:'POST',
                  headers:{
                        "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                        email:mail,
                  })
            })
            .then(res=>res.json())
            .then(data=>{
                  setData(data);
                  console.log(data);
                  if (data === "true") {
                        setAlreadyExits(true);
                        setNotPermitted(false);
                  }

                  else if (data === "false") {
                        setAlreadyExits(false);
                        setNotPermitted(true);
                  }

                  else if (data === "granted") {
                        setAlreadyExits(false);
                        setNotPermitted(false);
                        setOpen3(true)
                  }
            })
            
      }       

      
      const [open2, setOpen2] = useState(false);


      const handleClose2 = () => {
            setOpen2(false);

            //need navigation to landing page
            navigate("/user")
      };


      const [signUpData]=React.useState(
            {
                  "image":"",
                  "name": firstName + " " + lastName,
                  "specialized_domain": "",
                  "prev_exp": "No",
                  "prev_det": "",
                  "dob": "",
                  "experience": "",
                  "contact_number": "",
                  "email": "",
                  "type": "signup",
                  "status": "false",
                  "about": "",
                  "gender": ""
                  
            }
      )
      const [image,setImage]=React.useState();

      const ToBase64=(e)=>{
            console.log(e);
            var reader=new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload=()=>{
                  // console.log(reader.result);
                  signUpData.image=reader.result;
                  setImage(reader.result);
                  // console.log(signUpData);
            }
            reader.onerror=()=>{
                  console.log("error");
            }
      }


      const handleImageUpload = async (e)=>{
            ToBase64(e);
      }

      const handleSubmit=async (e)=>{
            e.preventDefault();
            signUpData.name = firstName + " " + lastName;
            console.log(signUpData);
            // setOpen2(true);
            if (window.confirm("Do you want to Sign up ?")) {
                  setOpen2(true);
                  // console.log(open)
                  const response = await fetch("http://localhost:4000/api/new_register/registration/", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify(signUpData)
                  })

                  const data = await response.json();

                  alert("SUCCESSFULLY REGISTERED")

            }
      }


      return ( 
            <>
                  <div>
                        <Dialog open={open1} onClose={handleClose1}>

                              


                              <DialogTitle>VERIFICATION</DialogTitle>
                              {
                                    Notpermitted && <Alert style={{ margin: "10px" }} variant='outlined' severity="error">
                                          <AlertTitle>Error</AlertTitle>
                                          Check the status after register — <strong>Register Now!</strong> for approval
                                    </Alert>
                              }
                              {
                                    alreadyExits && <Alert style={{ margin: "10px" }} variant="outlined" severity="warning">
                                          Email exists already-<strong>Login to continue</strong>
                                    </Alert>
                              }
                              <form onSubmit={handleCheck}>
                                    <DialogContent>
                                          <DialogContentText>
                                                Enter the email id which you have used to do registration.
                                          </DialogContentText>
                                          <TextField
                                                autoFocus
                                                margin="dense"
                                                id="mail"
                                                label="Email Address"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                                required
            
                                          />
                                    </DialogContent>
                                    <DialogActions>
                                          <Button onClick={handleClose1}>Cancel</Button>
                                          <Button type="submit">Check</Button>
                                    </DialogActions>
                              </form>
                              
                        </Dialog>
                  </div>


                  <div >
                        <Dialog
                              fullScreen
                              open={open3}
                              onClose={handleClose3}
                              TransitionComponent={Transition}
                        >
                              <AppBar sx={{ position: 'relative' }}>
                                    <Toolbar>
                                          <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={handleClose3}
                                                aria-label="close"
                                          >
                                                <CloseIcon />
                                          </IconButton>
                                          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                SIGN UP
                                          </Typography>
                                          <Button autoFocus color="inherit" onClick={handleClose3}>
                                                save
                                          </Button>
                                    </Toolbar>
                              </AppBar>
                              <List>
                                    {/* <input type="file" onInput={(e)=>{signUpData.image=e.target.files[0];console.log(e.target.files[0])}} name="profile"/> */}
                                    <Container>
                                          <div className='SignUpFormContainer'>
                                                
                                                <Col>
                                                      <Row>
                                                            <div className='Image'>
                                                                  <center>
                                                                        {signUpData.image ? <img src={signUpData.image} alt="profile" width={"130vw"} height={"130vw"} />:<img src={avatar} alt="profile" width={"120vw"} height={"120vw"} />}
                                                                  </center>
                                                            </div>
                                                      </Row>

                                                      <Row>
                                                            

                                                            <form onSubmit={handleSubmit}>
                                                                  <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                                                        <TextField
                                                                              type="text"
                                                                              variant='outlined'
                                                                              color='secondary'
                                                                              label="First Name"
                                                                              onChange={async (e) => { await setFirstName(e.target.value) }}
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

                                                                  {/* <div style={{background:"red",display:"flex",alignContent:"center",justifyContent:"space-between"}} >
                                                                        <div><InputLabel sx={{fontSize:"20px"}}>CHOOSE THE PROFILE PICTURE : </InputLabel></div>
                                                                        <div>
                                                                              <Input
                                                                                    id="image"
                                                                                    type="file"
                                                                                    label="image"
                                                                                    inputProps={{ accept: 'image/*' }}
                                                                                    onChange={event =>
                                                                                          handleImageUpload(event)
                                                                                    }
                                                                                    style={{ marginBottom: 40 }}
                                                                              />
                                                                        </div>
                                                                  </div> */}

                                                                  <InputLabel sx={{ fontSize: "20px" }}>CHOOSE THE PROFILE PICTURE : </InputLabel>
                                                                  <input
                                                                        id="image"
                                                                        type="file"
                                                                        label="image"
                                                                        inputProps={{ accept: 'image/*' }}
                                                                        onChange={event =>
                                                                              handleImageUpload(event)
                                                                        }
                                                                        style={{ marginBottom: 40 }}
                                                                        required
                                                                  />

                                                                  <TextField
                                                                        type="email"
                                                                        variant='outlined'
                                                                        color='secondary'
                                                                        label="Email"
                                                                        fullWidth
                                                                        onChange={(e) => { signUpData.email = e.target.value; }}
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
                                                                              onChange={(e) => { signUpData.gender = e.target.value; }}
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
                                                                        onChange={(e) => { signUpData.dob = e.target.value; }}
                                                                        sx={{ mb: 4 }}
                                                                  />

                                                                  <TextField
                                                                        type="tel"
                                                                        variant='outlined'
                                                                        color='secondary'
                                                                        label="Contact Number"
                                                                        placeholder="Eg: 9876543210"
                                                                        onChange={(e) => {
                                                                              setMobileNumberLength(e.target.value.length)
                                                                              signUpData.contact_number = e.target.value;
                                                                              setErr(mobileNumberLength !== 9 && mobileNumberLength > 0)
                                                                        }}
                                                                        error={mobileNumberLength !== 10 && mobileNumberLength > 0}
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
                                                                        onChange={(e) => { signUpData.specialized_domain = e.target.value; }}
                                                                        sx={{ mb: 4 }}
                                                                  />


                                                                  <FormControl fullWidth style={{ marginBottom: 35 }}>
                                                                        <InputLabel id="demo-simple-select-label">Do you have any previous experience?</InputLabel>
                                                                        <Select
                                                                              labelId="demo-simple-select-label"
                                                                              id="demo-simple-select"
                                                                              label="Do you have any previous experience?"
                                                                              required
                                                                              defaultValue={"No"}
                                                                              onChange={(e) => { signUpData.prev_exp = e.target.value; setExpYN(e.target.value) }}
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
                                                                                    onChange={(e) => { signUpData.experience = e.target.value; }}
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
                                                                                    onChange={(e) => { signUpData.prev_det = e.target.value; }}
                                                                                    sx={{ mb: 4 }}
                                                                              />
                                                                        </>
                                                                  }


                                                                  <TextareaAutosize
                                                                        aria-label="minimum height"
                                                                        minRows={4}
                                                                        placeholder="ABOUT YOURSELF (minimum 100 words))"
                                                                        onChange={(e) => { signUpData.about = e.target.value; }}
                                                                        style={{ width: "100%", padding: "12px", borderRadius: "5px", marginBottom: 35 }}
                                                                  />


                                                                  <center>
                                                                        <Button variant="contained" disabled={err} color="primary" style={{ width: "30%" }} type="submit">SIGN UP</Button>
                                                                  </center>
                                                            </form>
                                                            <br /><br />
                                                      </Row>
                                                </Col>
                                          </div>

                                    </Container>
                              </List>
                        </Dialog>

                        {
                              open2 && <div>
                                    <Dialog
                                          open={true}
                                          onClose={handleClose2}
                                          aria-labelledby="alert-dialog-title"
                                          aria-describedby="alert-dialog-description"
                                    >
                                          <DialogTitle id="alert-dialog-title">
                                                {"IMPORTANT INSTRUCTION"}
                                          </DialogTitle>
                                          <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                      Check your status for the sign up approval from the admin and login to your account by setting the password during the first login.
                                                </DialogContentText>
                                          </DialogContent>
                                          <DialogActions>
                                                <Button onClick={handleClose2} autoFocus>
                                                      OK
                                                </Button>
                                          </DialogActions>
                                    </Dialog>
                              </div>
                        }
                  
                  </div>

                 
            </>
       );
}
 
export default SignUpForm;