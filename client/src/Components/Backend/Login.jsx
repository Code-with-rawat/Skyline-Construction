import React, { use, useContext } from "react";
import NavSection from "../Common/NavSection";
import Footer from "../Common/Footer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "./Context/Auth";
import { apiUrl } from "../Common/Https";

const Login = () => {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch( apiUrl + 'authenticate',{
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(data)
    });
    const result = await res.json();
        if(result.status == false){
            toast.error(result.message)
        }
        else{
            const userinfo = {
                id : result.id,
                token : result.token
            }
            login(userinfo)
            localStorage.setItem('userinfo',JSON.stringify(userinfo))
                navigate('/admin/dashboard')
        }
    // console.log(result);
  };
  return (
    <>
      <NavSection />
      <main>
        <div className="conatainer my-5 d-flex justify-content-center">
          <div className="login-form my-5">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="mb-3">Login Form</h4>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "This field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      type="text"
                      placeholder="Email"
                      className={`form-control ${errors.email && "is-invalid"}`}
                    />
                    {errors.email && (
                      <p className="invalid-feedback">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "This field is required",
                      })}
                      type="password"
                      placeholder="Password"
                      className={`form-control ${
                        errors.password && "is-invalid"
                      }`}
                    />
                    {errors.password && (
                      <p className="invalid-feedback">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
