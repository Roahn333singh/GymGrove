import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import profileImage from "./profile.jpg";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



const Details = () => {

  const [getuserdata, setuserdata] = useState([]);
  console.log(getuserdata);

  const {id} = useParams("");
  console.log(id);

  const getdata= async () => {
    const res = await fetch(`/getuser/${id}`, {
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
  },[]);

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {getuserdata.name}</h1>

      <Card sx={{ maxWidth: 875 }}>
        <CardContent>
          <div className="add_btn ">
            <button type="button" className="btn btn-primary mx-3">
              <EditIcon />
            </button>
            <button type="button" className="btn btn-danger">
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view mb-3 col-lg-6 clol-md-6 col-12">
              <img
                src={profileImage}
                style={{ width: 170, borderRadius: 60 }}
                alt="profile"
              />
              <h2 className="mt-3">
                Name: <span style={{ fontWeight: 400 }}>{getuserdata.name}</span>
              </h2>
              <h3 className="mt-3">
                Age: <span style={{ fontWeight: 400 }}>{getuserdata.age}</span>
              </h3>
              <p style={{ fontWeight: 600 }}>
                <EmailIcon /> Email: <span>{getuserdata.email}</span>
              </p>
              <p style={{ fontWeight: 600 }}>
                {" "}
                <WorkIcon /> Membership: <span>{getuserdata.work}</span>
              </p>
            </div>

            <div className="right_view mb-3 col-lg-6 clol-md-6 col-12">
              <p className="mt-5" style={{ fontWeight: 600 }}>
                <PhoneIphoneIcon /> Mobile: <span>{getuserdata.mobile}</span>
              </p>
              <p className="mt-3" style={{ fontWeight: 600 }}>
                <LocationOnIcon /> Location: <span>{getuserdata.add}</span>
              </p>
              <p className="mt-3" style={{ fontWeight: 600 }}>
                Description:{" "}
                <span style={{ fontWeight: 400, fontSize: 17 }}>
                {getuserdata.desc}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;





