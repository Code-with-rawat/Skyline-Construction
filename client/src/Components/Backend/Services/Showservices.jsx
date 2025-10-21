import React, { useEffect, useState } from 'react'
import Footer from '../../Common/Footer'
import Sidebar from '../../Common/Sidebar'
import NavSection from '../../Common/NavSection'
import { apiUrl,token } from '../../Common/Https'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Showservices = () => {

    const [services,setServices] = useState([]);
    const fetchServices = async () =>{
        const res = await  fetch(apiUrl+'services',{
            'method' : 'GET',
            'headers':{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${token()}`

            }
        });
        const response = await res.json();
        setServices(response.data);
        console.log(response)
    }

    useEffect(()=>{
            fetchServices()
    },[])

    const deleteServices = async (id)=>{
      if(confirm('Are your sure for delete the service')){
          const res = await  fetch(apiUrl+'services/'+id,{
            'method' : 'DELETE',
            'headers':{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${token()}`

            }
        });
        const response = await res.json();
          if(response.status == true){
              const newService  = services.filter(service => service.id != id)
              setServices(newService);
              toast.success(response.message);
          }
          else{
            toast.error(response.message);
          }

        // setServices(response.data);
        // console.log(response)
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
                  <h4 className='h5'>Services</h4>
                <Link to="/admin/services/create" className='btn btn-primary'>Create</Link>
                </div>
                <hr />
                <table className='table table-stripped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>slug</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                            {services && services.map(service=>{
                        return(
                        <tr key={`service-${service.id}`}>
                            <td>{service.id}</td>
                            <td>{service.title}</td>
                            <td>{service.slug}</td>
                            <td>{(service.status == 1) ? 'Active ' : 'Block'}</td>
                            <td>
                                <Link to={`/admin/services/Edit/${service .id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                <Link to="#" onClick={() =>{deleteServices(service.id)}} className='btn btn-secondary btn-sm ms-2'> Delete</Link>
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
      <Footer />
    </>
  )
}

export default Showservices
