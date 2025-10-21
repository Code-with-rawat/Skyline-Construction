import React from "react";
import NavSection from "../Common/NavSection";
import Footer from "../Common/Footer";
import Hero from "../Common/Hero";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUrl } from "../Common/Https";

const Contact = () => {
  
  const{
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm()

  const onSubmit = async (data) => {
    const res = await fetch(apiUrl+'contact-now',{
      'method' : 'POST',
      'headers': {
          'Content-type' : 'application/json'
      },
      'body' : JSON.stringify(data)
    }); 
    const result = await res.json();
    if(result.status == true){
        toast.success(result.message)
        reset();
    }
    else{
      toast.error(result.message)
    }
  }

  
  return (
    <>
      <NavSection />
      <main>
        <Hero
          subHeading="Quality. Integrity. Value."
          heading="Contact-Us"
          text=" We excel at transforming visions into reality through <br />
                  outstanding craftsmanship and precise."
        />  
            <section className="section-9 py-5">
            <div className="container">
                <div className="section-header text-center">
              <span></span>
              <h2>Contact US</h2>
              <p>
                Our dedicated experts are here to help you with any of your questions, contact us by <br />
                filling out the form below and we will be in touch shortly.   
              </p>
            </div>

             <div className="row mt-5">
                <div className="col-md-3">  
                <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                    <h3>Call Us</h3>
                  <div>  <a href="#">(000-000-0000)</a></div>
                  <div>  <a href="#">(222-123-12345)</a></div>

                    <h3 className="mt-4">You can write us</h3>
                    
                    <div> <a href="#">example@example.com</a></div>
                    <div><a href="#">info @example.com</a></div>

                    <h3 className="mt-4">Address</h3>
                    <div>B-18x, Rajaji Puram <br />
                    Lucknow, Uttar Pradesh, 2266027 <br />
                    0522400XXXX</div>

                </div>
                </div>
                </div>
                <div className="col-md-9">
                    <div className="card shadow border-0">
                       <div className="card-body p-5">
                         <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="" className="form-label">Name</label>
                                    <input type="text"
                                             {...register('name', {
                                        required: "The name  feild is required",
                                      })}
                                      className={`form-control form-control-lg ${errors.name && "is-invalid"}`} placeholder="Enter Your Name"/>
                                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name?.message}
                        </p>
                      )}
                                </div>
                                <div className="col-md-6 mb-4">
                                      <label htmlFor="" className="form-label">Email</label>
                                    <input type="email"  
                                    {...register('email', {
                                          required: "This Email field is required",
                                          pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid email address",
                                          }})
                                          }
                                    className={`form-control form-control-lg ${errors.email && "is-invalid"}`} placeholder="Enter Your Email"/>

                                    {errors.email && (
                        <p className="invalid-feedback">
                          {errors.email?.message}
                        </p>
                      )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="" className="form-label">Phone</label>
                                    <input type="number" 
                                           {...register('phone')}
                         className="form-control form-control-lg" placeholder="Phone No"/>
                                </div>
                                <div className="col-md-6 mb-4">
                                      <label htmlFor="" className="form-label">Subject</label>
                                    <input type="text" 
                                           {...register('subject')}
                                    
                                     className="form-control form-control-lg" placeholder="Enter Your Subject"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="" className="form-label">Message</label>
                                <textarea name="" 
                                           {...register('message')}
                                
                                 rows={5} placeholder="Message" className="form-control form-control-lg"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary large mt-3">
                                    Submit
                            </button>
                        </form>
                       </div>
                    </div>
                </div>
            </div>
            </div>
            </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
