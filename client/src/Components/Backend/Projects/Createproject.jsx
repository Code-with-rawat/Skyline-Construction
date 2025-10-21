import React, { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl, token } from "../../Common/Https";
import NavSection from "../../Common/NavSection";
import Sidebar from "../../Common/Sidebar";
import JoditEditor from "jodit-react";
import Footer from "../../Common/Footer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Createproject = ({ placeholder }) => {
  const editor = useRef(null);
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
    const newData = { ...data, content: content, imageId: Imageid };
    const res = await fetch(apiUrl + "projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });
    const response = await res.json();
    if (response.status == true) {
      toast.success(response.message);
      Navigate("/admin/projects");
    } else {
      toast.error(response.message);
    }
  };

  const handlChange = async (e) => {
    const newData = new FormData();
    const file = e.target.files[0];
    newData.append("image", file);
    setIsdisabled(true);

    await fetch(apiUrl + "temp-image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: newData,
    })
      .then((response) => response.json())
      .then((result) => {
        setIsdisabled(false)
        if (result.status == false) {
          toast.error(result.error.image[0]);
        } else {
          setImageid(result.data.id);
        }
      });
  };

  return (
    <>
      <NavSection />
      <main>
        <div className="container my-5 ">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>

            <div className="col-md-9 ">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <h4 className="h5">Projects / Create</h4>
                    <Link to="/admin/projects" className="btn btn-primary">
                      Back
                    </Link>
                  </div>
                  <hr />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Name
                      </label>
                      <input
                        {...register("title", {
                          required: "The title  feild is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.title && "is-invalid"
                        }`}
                        placeholder="Name"
                      />

                      {errors.title && (
                        <p className="invalid-feedback">
                          {errors.title?.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Slug
                      </label>
                      <input
                        {...register("slug", {
                          required: "The slug  field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.title && "is-invalid"
                        }`}
                        placeholder="Slug"
                      />

                      {errors.slug && (
                        <p className="invalid-feedback">
                          {errors.slug?.message}
                        </p>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Location
                          </label>
                          <input
                            type="text"
                            {...register("location")}
                            className={`form-control`}
                            placeholder=" Enter Location"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Construction Type
                          </label>
                          {/* <input type='text'
                        {...register("location")}
                        className={`form-control`}
                        placeholder="Location"
                      /> */}
                          <select
                            className="form-control"
                            {...register("construction_type")}
                          >
                          <option value="">Construction Type</option>
                            <option value="Residential Construction">
                              Residental Construction
                            </option>
                            <option value="Education Construction">Commercial Construction</option>
                            <option value="Corporate Construction">Corporate Construction</option>
                            <option value="Infrastructure Construction">
                              Infrastructure Construction
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Sector
                          </label>
                          <select
                            className="form-control"
                            {...register("sector")}
                          >
                            <option value="">Sector</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Corporate">Corporate</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="" className="form-label">
                            Status
                          </label>
                          <select
                            {...register("status")}
                            className="form-control"
                          >
                            <option value="1">Active</option>
                            <option value="0">Block</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Short Description
                      </label>
                      <textarea
                        {...register("short_desc")}
                        className="form-control"
                        rows={4}
                        placeholder="Short Description"
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Content
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Image
                      </label>
                      <br />
                      <input onChange={handlChange} type="file" />
                    </div>
                    <button className="btn btn-primary" disabled={Isdisabled}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Createproject;
