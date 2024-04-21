import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Attend = () => {
  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);

  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setuserdata(data);
      console.log("get data");
    }
  };


  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
        <table  className="table">
        <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">UserName</th>
            </tr>
          </thead>
            
        <tbody>
        {getuserdata.map((element, id) => {
        return (
            <tr className="table-dark">
            <th scope="row">{id + 1}</th>
            <td>{element.name}</td>
            </tr>
        );

})}


        </tbody>
        </table>
      
    </div>
  );
};

export default Attend;
