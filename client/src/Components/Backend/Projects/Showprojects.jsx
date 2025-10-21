import React, { useEffect, useState } from 'react'
import { apiUrl,token } from '../../Common/Https';
import NavSection from '../../Common/NavSection';
import Sidebar from '../../Common/Sidebar';
import Footer from '../../Common/Footer';
import { Link } from 'react-router-dom';

const Showprojects = () => {
       const [projects,Setprojects] = useState([]);
          const fetchProjects = async () =>{
              const res = await  fetch(apiUrl+'projects',{
                  'method' : 'GET',
                  'headers':{
                      'Content-type' : 'application/json',
                      'Accept' : 'application/json',
                      'Authorization' : `Bearer ${token()}`
      
                  }
              });
              const response = await res.json();
              Setprojects(response.data);
              console.log(response)
          }
      
          useEffect (()=>{
                  fetchProjects()
          },[])
      
          const deleteProjects = async (id)=>{
            if(confirm('Are your sure for delete the project')){
                const res = await  fetch(apiUrl+'projects/'+id,{
                  'method' : 'DELETE',
                  'headers':{
                      'Content-type' : 'application/json',
                      'Accept' : 'application/json',
                      'Authorization' : `Bearer ${token()}`
      
                  }
              });
              const response = await res.json();
                if(response.status == true){
                    const newProject  = projects.filter(project => project.id != id)
                    Setprojects(newProject);
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
                        <h4 className='h5'>Projects</h4>
                      <Link to="/admin/projects/create" className='btn btn-primary'>Create</Link>
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
                              
                                  {projects && projects.map(project=>{
                              return(
                              <tr key={`project-${project.id}`}>
                                  <td>{project.id}</td>
                                  <td>{project.title}</td>
                                  <td>{project.slug}</td>
                                  <td>{(project.status == 1) ? 'Active ' : 'Block'}</td>
                                  <td>
                                      <Link to={`/admin/projects/Edit/${project.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                      <Link to="#" onClick={() =>{deleteProjects(project.id)}} className='btn btn-secondary btn-sm ms-2'> Delete</Link>
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

export default Showprojects
