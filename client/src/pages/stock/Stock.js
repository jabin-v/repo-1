import React from 'react'
import { useGetStockQuery } from '../../redux/services/assesmentApi';
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper} from "@mui/material"

const Stock = () => {

    const { data:tableData, isFetching, error } = useGetStockQuery();

    console.log(tableData)


  return (
    <div>
        <table>
        <tr>
    <th>Out of stock</th>
    
  </tr>
  <tr>
    <th>Product_Id</th>
    <th>Product_Name</th>
  </tr>

  {
    tableData?.map((item)=>(
        <tr>
             <td>{item.product_id}</td>
             <td>{item.productName}</td>

        </tr>
    ))
  }
</table>
    </div>

  )
}



export default Stock