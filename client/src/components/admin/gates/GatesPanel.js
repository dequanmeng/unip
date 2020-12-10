import React, {  useState } from 'react'
import './GatesPanel.css'
import {useFetch }from './../../../hooks/useFetch'
import MaterialTable , { MTableToolbar }from 'material-table';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';
import refresh from '@material-ui/icons/Refresh';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import config from './../../../config/config';
import copyIcon from './copy.svg'
// import Delete from '@material-ui/icons/Delete';
// import Icon from '@material-ui/core/Icon';
import {useHistory} from 'react-router-dom'
import Delete from './../users/delete.svg'
import {icons }from './../../util/icon/icons'
import { AddGate } from './addgate/AddGate';
import { DeleteGate} from './deletegate/DeleteGate';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
// import { ResetPassword } from './resetpassword/ResetPassword';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const GatesPanel = () => {
  
   const res= useFetch('/gates')
   const history=useHistory()
   const [dopen, setdopen] = useState(false)
   const [ddata, setddata] = useState('')
   const [sopen, setsopen] = useState(false)
   const user = useCurrentUser()
   const [cdata, setcdata] = useState('')
   const [open, setOpen] = useState(false);
   const [modalbody, setmodalbody] = useState('')
   const [editdata, seteditdata] = useState({_id:"",name:"",apiKey:""})
   const [editmode, seteditmode] = useState(false)
  //  const [apipath, setapipath] = useState()
  // useEffect(() => {
  //   const cc =async()=>{
  //     const res = await fetch(
  //       config.baseUrl+'/users/currentuser',{
  //           method: 'GET',
     
  //               headers:{
  //                 // 'Access-Control-Allow-Origin': 'http://localhost:3000',
  //                 'Access-Control-Allow-Origin': "*",
  //                 'Access-Control-Allow-Headers': "*",
  //                 'Content-Type': 'application/json',
  //                 'x-auth-token': localStorage.getItem('token')
  //               }   
  //              }
  //     )    
  //  var user=await res.json()
  
  
  //   setuser(user.user)   
  //   }
  //     cc()
  // }, [])
  const checkAccess=(id)=>{
    
        

    var child=[]

   
  
      user?.creatures?.map(c=>{
       child.push(String(c._id))
     })
    
  
     // console.log(be.search('isSuperAdmin')!=-1 );
     // console.log(child.includes(id));
    
     if (user?._id==id || user?.isSuperAdmin|| child.includes(id) ){
         
           return false
     }else{
         
           return true
     }  

   }






  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsopen(false);
  };
   const handleOpen = () => {
     seteditmode(false)
     setOpen(true);
  
    
   };

   const handleClose = () => {
    setdopen(false)
   
     setOpen(false);
     seteditdata({_id:"",name:"",apiKey:""})
     window.location.reload()
    };



    return (
        <div className="user-panel">
        <div className="table-container" >
           <MaterialTable
  
           icons={icons}
              columns={[
                { title: 'id', field: '_id' },
                { title: 'name', field: 'name' ,cellStyle: {color: 'green'}},
                { title: 'apiKey', field: 'apiKey'  , cellStyle: {color: 'blue'}, },
                { title: 'topic', field: 'topic' ,cellStyle: {color: 'red'}},
                { title: 'creator', field: 'creator' ,cellStyle: {
                  
                  color: 'orange'
                }},
                { title: 'createdAt', field: 'createdAt' ,
            
                render: row => <span>{ moment(row["createdAt"]).format('lll')   }</span>
                },
                { title: 'updatedAt', field: 'updatedAt',  render: row => <span>{ moment(row["updatedAt"]).fromNow()   }</span> }
              ]}

           data={res.response}
           title={'Gates'}
           actions={[
            rowData => ( {
              icon: () => <Edit color={ 'primary'} />,
              tooltip: 'Edit Gate',
              onClick: (event, rowData) => {

              seteditdata(rowData)
              seteditmode(true)
              setOpen(true)


              },
              disabled: checkAccess(rowData['creator'])
            
        
            }),
            rowData => ({
              icon: () =><img style={{width:'1.25rem'}} src={Delete} /> ,
              tooltip: 'Delete Gate',
              onClick: (event, rowData) => {
                setdopen(true)
                setddata(rowData)
              
              
              },
              disabled: checkAccess(rowData['creator'])
            }),
            rowData => ( {
              icon: () => <AutorenewIcon/>,
              tooltip: 'change apikey',
              onClick: async(event, rowData) => {
              //----------------------------
              try {
                const res = await fetch(
                  config.baseUrl+'/gates/resetapi',{
                      method: 'PATCH',
        
                      body: JSON.stringify(
        
                        { id:rowData._id}
        
                      ),
                          headers:{
                            
                            'Access-Control-Allow-Origin': "*",
                            'Access-Control-Allow-Headers': "*",
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('token')
                          }   
                         }
                )    
                const newApiKey=await res.json()  
                console.log(newApiKey);
                setcdata(newApiKey)
                window.location.reload()
                
              } catch (err) {
                console.log(err);
              }

              //--------------------------------
              
      
              },
              disabled: checkAccess(rowData['creator'])
        
            }),
            rowData => ( {
              icon: () => <img style={{width:'1.25rem'}} src={copyIcon} />,
              tooltip: 'copy apikey',
              onClick: (event, rowData) => {
              navigator.clipboard.writeText(JSON.stringify({apiKey:rowData.apiKey,topic:rowData.topic}))
              setcdata(rowData)
              setsopen(true)
      
              }
        
            }),

            {
              icon: refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => window.location.reload()
            }
           
          ]}

          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div className="adduserbtn-container">
                  <button className="adduser-btn" onClick={()=>{handleOpen()}}>+ add gate</button>
           
                </div>
              </div>
            )
          }
        }

        options={{
          exportButton: true
        }}


           />
           </div>


           <Modal
            open={open}
            onClose={handleClose}
            style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
            

           >
            <AddGate handleClose={handleClose} edata={editdata} editmode={editmode}/>
           </Modal>


   
            <Modal 
               open={dopen}
               onClose={handleClose}
               style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
            
            >
              <DeleteGate ddata={ddata} close={handleClose} />
            </Modal>

            <Snackbar open={sopen} autoHideDuration={1000}  onClose={handleSnackClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert  severity="success" color="info">
                Successfully Copied!
              </Alert>
            </Snackbar>
             
        </div>
    )
}

// createdAt: "2020-11-27T13:17:10.117Z"
// email: "m@google.com"
// id: "5fc0fc567fa94525beb23b27"
// updatedAt: "2020-11-27T13:17:10.117Z"
// __v: 0
// _id: "5fc0fc567fa94525beb23b27"
