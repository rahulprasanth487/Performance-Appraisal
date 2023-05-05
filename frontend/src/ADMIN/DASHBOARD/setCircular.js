import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
import { Container,Row,Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Input } from '@mui/material';
import { useState,useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});


const SetCircular = () => {

      
      const [open1, setOpen1] = React.useState(false);
      

      const handleClickOpen1 = () => {
            setOpen1(true);
      };

      const handleClose1 = () => {
            setOpen1(false);
      };

      //CIRCULARS LIST
      const [circularList,setCircularList]=useState();

      const fetchCirculars=async()=>{
            const response=await fetch("http://localhost:4000/api/user/collectionData/circulars");
            const data=await response.json();
            setCircularList(data);
      }

      useEffect(()=>{
            fetchCirculars();
      },[]);


      const [linkText,setLinkText]=React.useState("");
      //FILE UPLOAD
      const [fileName, setFile] = useState("");

      const handleFileChange = (e) => {
            setFile(e.target.files[0].name);

            console.log(e.target.files[0].name);
      };

      const handleSubmit=async ()=>{
            alert("Circular Added!!");
            let date = new Date().toLocaleDateString();
            const text=linkText;
            console.log(File);

            const response = await fetch("http://localhost:4000/api/ADMIN/setCircular/",{
                  method:"POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                        "linkText":text,
                        "fileName":fileName,
                        "date":date
                  })
            })

            const tempData=await response.json();

            fetchCirculars();
      }

      const [haveFile,setHaveFile]=useState(false);

      

      return (
            <>
                  <Container>
                        <hr />
                        <h2>CIRCULAR</h2>
                        <hr />
                        <center>
                              <Row>
                                    {
                                          <Col>
                                                <button className="btn btn-primary" onClick={handleClickOpen1}>ADD CIRCULAR</button>
                                          </Col>
                                    }
                              </Row>
                        </center>
                  </Container>
                  <div>
                  
                        <Dialog
                              fullScreen
                              open={open1}
                              onClose={handleClose1}
                              TransitionComponent={Transition}
                        >
                              <AppBar sx={{ position: 'relative' }}>
                                    <Toolbar>
                                          <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={handleClose1}
                                                aria-label="close"
                                          >
                                                <CloseIcon />
                                          </IconButton>
                                          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                CIRCULAR
                                          </Typography>
                                          <Button autoFocus color="inherit" onClick={handleClose1}>
                                                close
                                          </Button>
                                    </Toolbar>
                              </AppBar>
                              <List>
                                    <Container>
                                          
                                                <br />
                                                      <TextareaAutosize
                                                            aria-label="empty textarea"
                                                            placeholder="ADD CIRCULAR LINK DESCRIPTION"
                                                            id="linkText"
                                                            style={{ width: "100%", padding: "15px", borderRadius: "10px", border: "1px solid #ccc", outline: "none" }}
                                                            required={true}
                                                            onChange={(e)=>{
                                                                  setLinkText(e.target.value);
                                                            }}
                                                      />
                                                      <i>(Note : Click the below switch if there is any document related to that)</i>
                                                      <FormGroup>
                                                            <FormControlLabel required control={<Switch />} label="YES" onChange={(e)=>{
                                                                  setHaveFile(e.target.checked);
                                                            }}/>
                                                      </FormGroup>
                                                      <br />

                                                      {
                                                            haveFile ? 
                                                            <form action="http://localhost:4000/api/files/singleFileUpload/" enctype="multipart/form-data" method="post" onSubmit={(e) => {
                                                            }}>

                                                                  <input type="file" name="file" onChange={(e) => {
                                                                        handleFileChange(e);
                                                                  }} />
                                                                  <br /><br />

                                                                  <center>
                                                                        <button onClick={handleSubmit} type="submit" disabled={(linkText === "")} className='btn btn-primary'>ADD CIRCULAR</button>
                                                                  </center>

                                                            </form>
                                                            :
                                                            <center>
                                                            <button onClick={handleSubmit} disabled={(linkText === "")} className='btn btn-primary'>ADD CIRCULAR</button>
                                                            </center>
                                                      }
                                    </Container>

                                    <br />
                                    

                                    <Container>
                                          

                                          {
                                                circularList && circularList.map((item)=>(
                                                      <ListItemButton>
                                                            <ListItemIcon sx={{
                                                                  "&:hover": {
                                                                        color: "red",
                                                                  },
                                                            }} onClick={async ()=>{
                                                                  if(window.confirm("Do you want to remove the circular?"))
                                                                  {
                                                                        await fetch("http://localhost:4000/api/ADMIN/circularDelete/" + item._id, {
                                                                              method: "DELETE"
                                                                        })
                                                                        .then(res=>fetchCirculars())
                                                                  }
                                                            }}>
                                                                  <DeleteIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={`${item.date+' --- '+item.linkText}`} />
                                                      </ListItemButton>
                                                ))
                                          }
                                    </Container>
                              </List>
                        </Dialog>
                  </div>

            </>
      );
}

export default SetCircular;