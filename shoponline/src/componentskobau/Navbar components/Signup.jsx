import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let history = useNavigate();
      // setting the inital value as blank
  const [value, setvalue] = useState({ name: "", email: "", password: "", cpassword: "" });
  // when the submit button is clicked this function excutes and sends data to
  // the body of backend and returns the same response
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = value;
    const response = await fetch("http://localhost:5000/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.token);
      history("/");
    } else {
      return <h1>error</h1>
    }
  };
      // sets the value when user types in the input form
  const onChange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <div  className="container h-screen flex justify-center">
      <form onSubmit={handleSubmit} className="w-1/4 container mt-40">
        <div className="form-group">
          <label htmlFor="name"> Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary bg-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;