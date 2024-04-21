import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";

const Edit = () => {
  // const [getuserdata, setuserdata] = useState([]);
  // console.log(getuserdata);

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
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
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, work, add, mobile, desc, age } = inpval;

    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        add,
        mobile,
        desc,
        age,
      }),
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      alert("data added");
    }
  };

  return (
    <header>
      <div className="container">
        <NavLink to="/">home</NavLink>

        <form className="mt-5">
          <div className="row">
            <div className="mb-3 col-lg-6 clol-md-6 col-12">
              <label for="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="email"
                name="name"
                onChange={setdata}
                value={inpval.name}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-lg-6 clol-md-6 col-12">
              <label for="exampleInputPassword1" className="form-label">
                Age
              </label>
              <input
                type="number"
                name="age"
                onChange={setdata}
                value={inpval.age}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="mb-3 col-lg-6 clol-md-6 col-12">
              <label for="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={setdata}
                value={inpval.email}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="mb-3 col-lg-6 clol-md-6 col-12">
              <label for="exampleInputPassword1" className="form-label">
                Mobile
              </label>
              <input
                type="number"
                name="mobile"
                onChange={setdata}
                value={inpval.mobile}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 col-lg-6 clol-md-6 col-12">
              <label for="exampleInputPassword1" className="form-label">
                Membership
              </label>
              <input
                type="text"
                name="work"
                onChange={setdata}
                value={inpval.work}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="mb-3 col-lg-6 clol-md-6 col-12">
              <label for="exampleInputPassword1" className="form-label">
                Address
              </label>
              <input
                type="text"
                name="add"
                onChange={setdata}
                value={inpval.add}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 ">
              <label for="exampleInputPassword1" className="form-label">
                Description
              </label>
              <textarea
                name="desc"
                onChange={setdata}
                value={inpval.desc}
                className="form-control"
                id=""
                cols="30"
                rows="5"
                placeholder="Write here.."
              ></textarea>
            </div>

            <button
              type="submit"
              onClick={updateuser}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Edit;




