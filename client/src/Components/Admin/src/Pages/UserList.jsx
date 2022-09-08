import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './UserList.css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Topbar from '../Components/Topbar/Topbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
//import { deleteUsers, getUsers } from '../redux/apiCalls';
//import { userRequest } from "../requestMethods";

export default function UserList() {
  const dispatch = useDispatch()
  const [users,setUsers] = useState([])

  //const users = useSelector((state)=>state.user.users)
  //console.log(users)

  /*useEffect(()=>{
    getUsers(dispatch)
  },[dispatch])

  useEffect(()=>{
    const getUsers = async()=>{
      try{
      const res = await userRequest.get("users")
      setUsers(res.data)
    }catch{}
  };
  getUsers();
},[]);*/

 /* const handleDelete = (id) => {
    deleteUsers(id,dispatch)
  };
  */
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineOutlinedIcon
              className="userListDelete"
              //onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  

  return (
    
    <div >
      <Topbar/>
      <div className='container'>
      <Sidebar/>
      <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        disableSelectionOnClick
        rows={users}
        columns={columns}
        getRowId={row=>row._id}
        pageSize={10}
        checkboxSelection
      />
      </div>
      </div>
      </div>
    
  );

  }