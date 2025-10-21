import React, { useEffect, useState } from 'react'
import { apiUrl,token } from '../../Common/Https';
import { toast } from 'react-toastify';
import NavSection from '../../Common/NavSection';
import Sidebar from '../../Common/Sidebar';
import { Link } from 'react-router-dom';
import Footer from '../../Common/Footer';

const Showtestmonials = () => {
      const [Testmonials,SetTestmonials] = useState([]);
                  const fetchTestmonials = async () =>{
                      const res = await  fetch(apiUrl+'testmonials',{
                          'method' : 'GET',
                          'headers':{
                              'Content-type' : 'application/json',
                              'Accept' : 'application/json',
                              'Authorization' : `Bearer ${token()}`
              
                          }
                      });
                      const response = await res.json();
                      SetTestmonials(response.data);
                      console.log(response)
                  }
              
                  useEffect(()=>{
                          fetchTestmonials()
                  },[])
              
                  const deleteTestmonials = async (id)=>{
                    if(confirm('Are your sure for delete the Testimonials')){
                        const res = await  fetch(apiUrl+'testmonials/'+id,{
                          'method' : 'DELETE',
                          'headers':{
                              'Content-type' : 'application/json',
                              'Accept' : 'application/json',
                              'Authorization' : `Bearer ${token()}`
              
                          }
                      });
                      const response = await res.json();
                        if(response.status == true){
                            const newTestmonials  = Testmonials.filter(Testmonial => Testmonial.id != id)
                            SetTestmonials(newTestmonials);
                            toast.success(response.message);
                        }
                        else{
                          toast.error(response.message);
                        }
                  }
                    }
  return (
      <>
      <NavSection />
      <main>
        <div className="container my-5 ">
          <div className="row">
            <div className="col-md-3">
              <Sidebar/>
            </div>

            <div className="col-md-9 ">
              <div className="card shadow border-0">
                <div className="card-body p-4">

                <div className='d-flex justify-content-between'>  
                  <h4 className='h5'>Testmonials</h4>
                <Link to="/admin/testmonials/create" className='btn btn-primary'>Create</Link>
                </div>
                <hr />
                <table className='table table-stripped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Testmonial</th>
                            <th>Citation</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                            {Testmonials && Testmonials.map(Testmonial=>{
                        return(
                        <tr key={`testmonial-${Testmonial.id}`}>
                            <td>{Testmonial.id}</td>
                            <td>{Testmonial.testmonial}</td>
                            <td>{Testmonial.citation}</td>
                            <td>{(Testmonial.status == 1) ? 'Active ' : 'Block'}</td>
                            <td>
                                <Link to={`/admin/testmonials/Edit/${Testmonial .id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                <Link to="#" onClick={() =>{deleteTestmonials(Testmonial.id)}} className='btn btn-secondary btn-sm ms-2'> Delete</Link>
                            </td>
                        </tr>
                        )
                            })}
                           
                    </tbody>
                </table>
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

export default Showtestmonials
