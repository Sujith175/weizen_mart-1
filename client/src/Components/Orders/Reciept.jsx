import React, { useEffect ,useState,useRef} from 'react'
import { useParams } from "react-router-dom";
import './Reciept.scss';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import ReactPrint from 'react-to-print';

const Reciept = () => {
 const componentRef = useRef();
    const { id } = useParams("");
    const [data, setData] = useState([]);
const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'WeizenMart-reciept',
    
  });

const getinfo = async()=>{
    const res = await fetch(`http://localhost:5000/reciept/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
          setData(data.reciept);
      })
      .catch((err) => {
          console.log(err);
      });

      
}

useEffect(() => {
    getinfo();
  }, []);

  return (
    <>
    <div ref={componentRef}>
    <img style={{marginLeft:"35rem"}} src='https://th.bing.com/th/id/OIP.XOdyOQYl_PxeBGw32aj0NQHaF7?w=236&h=188&c=7&r=0&o=5&pid=1.7' />
    <h1 style={{marginLeft:"35rem",marginTop:"0px"}}>WEIZEN MART</h1>
    <div className='allcontainer' >
    {data.map((item)=>  
    <div>
    {/* <h1 style={{marginBottom:"10px"}}>WEIZEN MART</h1> */}
    <br></br>
    <h3 className='heading'>Order ID - {item._id}</h3>
    <h3>Sold By</h3>
     <h4 style={{color:"red"}}> Weizen Mart</h4>
      <p>No. 369, 13th Cross, 30th Main,</p>
      <p>Sultanpet 2nd Street</p>
      <p>Banglore - 560070</p>
      <p>Karnataka, India</p>
      <hr style={{marginRight:"10px" , marginBottom:"10px", marginTop:"10px"}}></hr>
    <h3 className='heading'>Billing Address</h3>
    {item.firstName} {item.lastName}
    <p>{item.address}</p>
    <p>{item.locality}</p>
    <p>{item.city}</p>
    <p>{item.State}</p>
    <p>{item.phone}</p>
    <p>Landmark : {item.landmark}</p> <br></br>
    <p>Nature of Transacrion: Sale</p>
      {/* <h4 style={{marginTop:"8px"}}>Order ID - {item._id}</h4> */}
      <hr style={{marginRight:"10px" , marginBottom:"10px", marginTop:"10px"}}></hr>

<br></br>

    <table className='reclists'>
      <tr>
      <th>Product Name :</th>
      <td>{item.productName}</td>
      </tr>
      <tr>
        <th>Product Quantity</th>
        <td>{item.cartQuantity}</td>
      </tr>
      <tr>
        <th>Product Price</th>
        <td>{item.productPrice}</td>
      </tr>
      <tr>
        <th>Subtotal</th>
        <td>{item.subtotal}</td>
      </tr>
    </table>
    <hr></hr>
    <br></br>
    </div>
   
    )}
    </div>
  
      </div>
      <br></br>
   <br></br>
      <button className='button' onClick={handlePrint}> Download </button>
   
    </>
  )
}

export default Reciept;