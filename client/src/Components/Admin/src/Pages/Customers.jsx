import React, { useEffect,useState,useRef } from 'react'
import { Heading } from '../../../UserProducts/ProductElements';
import { useReactToPrint } from 'react-to-print';
import "./Farmers.scss";


const Customers = () => {
    const componentRef = useRef();
    const [data, setData] = useState([]);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'WeizenMart-customers',
        
      });
    useEffect(()=>{
        fetch("http://localhost:5000/allcustomers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.customers);
      });
    },[]);
  return (
    <>
    <div ref={componentRef}>
    <img style={{marginLeft:"15rem"}} alt="loading" src='https://th.bing.com/th/id/OIP.XOdyOQYl_PxeBGw32aj0NQHaF7?w=236&h=188&c=7&r=0&o=5&pid=1.7' />
   <Heading>Weizen Mart Registered Customers</Heading>
    <table className="farmer">
            {data.map((user) => (
              <div>
             <tr>
              <th>Farmer Name</th>
              <td>{user.firstName} {user.lastName}</td>
             </tr>
             <tr>
              <th>Farmer Phone</th>
              <td>{user.phone}</td>
             </tr>
             <tr>
              <th>Farmer Email</th>
              <td>{user.email}</td>
             </tr>
             <tr>
              <th>Registered Date</th>
              <td>{user.createdAt.substring(0,10)}</td>
             </tr>
          <br></br>
             </div>
            ))}
          </table>
            </div>
          <button className='farmerbttn' onClick={handlePrint}> Download </button>
          </>
  )
}

export default Customers