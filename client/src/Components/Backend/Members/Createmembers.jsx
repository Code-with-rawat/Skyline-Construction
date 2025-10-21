import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiUrl, token} from '../../Common/Https';
import Footer from '../../Common/Footer';
import Sidebar from '../../Common/Sidebar';
import NavSection from '../../Common/NavSection';

const Createmembers = ({placeholder}) => {
        const [content, setContent] = useState("");
        const [Isdisabled, setIsdisabled] = useState(false);
        const [Imageid, setImageid] = useState(null);
      
      
      
        const config = useMemo(
          () => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || "Content",
          }),
          [placeholder]
        );
      
        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm();
        const Navigate = useNavigate();
        const onSubmit = async (data) => {
          const newData = {...data,'imageId': Imageid}
          const res = await fetch(apiUrl + "members", {
            'method': "POST",
            'headers': {
              'Content-type': 'application/json',
              'Accept': "application/json",
              'Authorization': `Bearer ${token()}`,
            },
            body: JSON.stringify(newData),
          });
          const response = await res.json();
          if (response.status == true) {
            toast.success(response.message);
            Navigate("/admin/members");
          } else {
            toast.error(response.message);
          }
        };
      
        const handlChange = async(e) =>{
                  const newData = new FormData();
                  const file = e.target.files[0];
                  newData.append('image' , file);
                  setIsdisabled(true);
                  
             await fetch(apiUrl + "temp-image", {
            'method': "POST",
            'headers': {
              'Accept': "application/json",
              'Authorization': `Bearer ${token()}`,
            },
            body: newData
              }).then(response=>response.json())
              .then(result => {
                      setIsdisabled(false);
      
                  if(result.status==false){
                      toast.error(result.error.image[0])
                  }else{
                    setImageid(result.data.id)
                  }
              })     
      
        }
  return (
     <>
      <NavSection/>
      <main>
        <div className="container my-5 ">
          <div className="row">
            <div className="col-md-3">
              <Sidebar/>
            </div>

            <div className="col-md-9 ">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Members / Create</h4>
                    <Link to="/admin/members" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr />

                  <form onSubmit={handleSubmit(onSubmit)}>

                  <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <textarea
                        {...register("name",{
                          required: "The name  feild is required",
                        })}
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                        rows={4}
                        placeholder="Name"
                      ></textarea>
                         {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>


                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Job Title
                      </label>
                      <input
                        {...register("job_title", {
                          required: "The Job Title  feild is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.job_title && "is-invalid"
                        }`}
                        placeholder="Job Title"
                      />

                      {errors.citation && (
                        <p className="invalid-feedback">
                          {errors.job_title?.message}
                        </p>
                      )}
                    </div>
                    
                      <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Linkdin Url
                      </label>
                      <input
                        {...register("linkdin_url")}
                        type="text"
                        className={`form-control`}
                        placeholder="Linkdin Url"
                      />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Image</label>
                        <br />
                        <input onChange={handlChange} type="file" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Status
                      </label>
                      <select {...register("status")} className="form-control">
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                    </div>
                    <button className="btn btn-primary" disabled={Isdisabled}>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Createmembers
