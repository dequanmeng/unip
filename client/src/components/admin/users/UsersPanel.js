import React, { useState } from 'react'
import './UsersPanel.css'
import {useFetch }from './../../../hooks/useFetch'
import MaterialTable , { MTableToolbar }from 'material-table';
import Modal from '@material-ui/core/Modal';
import refresh from '@material-ui/icons/Refresh';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

// import Delete from '@material-ui/icons/Delete';
// import Icon from '@material-ui/core/Icon';
import {useHistory} from 'react-router-dom'
import Delete from './delete.svg'
import {icons }from './../../util/icon/icons'
import { AddUser } from './adduser/AddUser';
import { DeleteUser } from './deleteuser/DeleteUser';
import { ResetPassword } from './resetpassword/ResetPassword';
export const UsersPanel = () => {
  const tableRef = React.createRef();
   const res= useFetch('/users')
   const history=useHistory()
   const [dopen, setdopen] = useState(false)
   const [ddata, setddata] = useState('')
   const [ropen, setropen] = useState(false)
   const [rdata, setrdata] = useState('')
   const [open, setOpen] = useState(false);
   const [modalbody, setmodalbody] = useState('')
   const [editdata, seteditdata] = useState({_id:"",email:"",firstName:"",lastName:"",phoneNumber:"",isAdmin:false})
   const [editmode, seteditmode] = useState(false)
  //  const [apipath, setapipath] = useState()
  
   const handleOpen = () => {
     seteditmode(false)
     setOpen(true);
    //  seteditdata({editdata,hidepassword:false})
    
   };

   const handleClose = () => {
    setdopen(false)
    setropen(false)
     setOpen(false);
     seteditdata({_id:"",email:"",firstName:"",lastName:"",phoneNumber:"",isAdmin:false})
     window.location.reload()
    };



    return (
        <div className="user-panel">
        <div className="table-container" >
           <MaterialTable
  
           icons={icons}
              columns={[
                { title: 'id', field: '_id' 
            ,render: row => <span>{ row["_id"].substring( -1)  }</span>
            },
            { title: 'FirstName', field: 'firstName' ,cellStyle: {
                  
                color: 'green'
              }},
            { title: 'LastName', field: 'lastName' ,cellStyle: {
                  
                color: 'green'
              }},
                { title: 'Email', field: 'email'  , cellStyle: {
                  
                    color: 'blue'
                  }, },
       
                { title: 'Phone', field: 'phoneNumber' },
                { title: 'isAdmin', field: 'isAdmin' ,lookup:{ true: <span style={{color:'green'}}>&#10003;</span>, false: "_" }},
                { title: 'createdAt', field: 'createdAt' ,
            
                render: row => <span>{ moment(row["createdAt"]).format('lll')   }</span>
            },
                { title: 'updatedAt', field: 'updatedAt',  render: row => <span>{ moment(row["updatedAt"]).fromNow()   }</span> }
              ]}

           data={res.response}
           title={'Users'}
           actions={[
            rowData => ( {
              icon: () => <Edit color={ 'primary'} />,
              tooltip: 'Edit User',
              onClick: (event, rowData) => {
              //  history.push({
              //   pathname: '/users/edit',
                
              //   state: {data:rowData}
              // })

              
              seteditdata(rowData)
              seteditmode(true)
              setOpen(true)
              // seteditdata({editdata,hidepassword:true})

              }
              // disabled: rowData.isAdmin==true
        
            }),
            rowData => ({
              icon: () =><img style={{width:'1.25rem'}} src={Delete} /> ,
              tooltip: 'Delete User',
              onClick: (event, rowData) => {
                setdopen(true)
                setddata(rowData)
              
              
              },
              disabled: rowData.isAdmin==true
            }),
            rowData => ( {
              icon: () => < VpnKeyIcon/>,
              tooltip: 'change password',
              onClick: (event, rowData) => {
              //  history.push({
              //   pathname: '/users/changepassword',
                
              //   state: {data:rowData}
              // })
              setrdata(rowData)
              setropen(true)
              },
              disabled: rowData.isAdmin==true
        
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
                  <button className="adduser-btn" onClick={()=>{handleOpen()}}>+ add user</button>
           
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
            
            // aria-labelledby="simple-modal-title"
            // aria-describedby="simple-modal-description"
           >
            <AddUser handleClose={handleClose} edata={editdata} editmode={editmode}/>
           </Modal>


   
            <Modal 
               open={dopen}
               onClose={handleClose}
               style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
            
            >
              <DeleteUser ddata={ddata} close={handleClose}/>
            </Modal>


             
            <Modal 
               open={ropen}
               onClose={handleClose}
               style={{backgroundColor: 'rgba(0,0,0,0.9)'}}
            
            >
              <ResetPassword rdata={rdata} close={handleClose}/>
            </Modal>





        </div>
    )
}

// createdAt: "2020-11-27T13:17:10.117Z"
// email: "m@google.com"
// id: "5fc0fc567fa94525beb23b27"
// updatedAt: "2020-11-27T13:17:10.117Z"
// __v: 0
// _id: "5fc0fc567fa94525beb23b27"