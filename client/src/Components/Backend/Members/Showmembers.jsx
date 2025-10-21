import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { apiUrl, token } from '../../Common/Https';
import Footer from '../../Common/Footer';
import Sidebar from '../../Common/Sidebar';
import NavSection from '../../Common/NavSection';
import { Link } from 'react-router-dom';

const Showmembers = () => {
    const [Members,SetMembers] = useState([]);
                  const fetchMembers = async () =>{
                      const res = await  fetch(apiUrl+'members',{
                          'method' : 'GET',
                          'headers':{
                              'Content-type' : 'application/json',
                              'Accept' : 'application/json',
                              'Authorization' : `Bearer ${token()}`
              
                          }
                      });
                      const response = await res.json();
                      SetMembers(response.data);
                      console.log(response)
                  }
              
                  useEffect(()=>{
                          fetchMembers()
                  },[])
              
                  const deleteMembers = async (id)=>{
                    if(confirm('Are your sure for delete the Members')){
                        const res = await  fetch(apiUrl+'members/'+id,{
                          'method' : 'DELETE',
                          'headers':{
                              'Content-type' : 'application/json',
                              'Accept' : 'application/json',
                              'Authorization' : `Bearer ${token()}`
              
                          }
                      });
                      const response = await res.json();
                        if(response.status == true){
                            const newMembers  = Members.filter(Member => Member.id != id)
                            SetMembers(newMembers);
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
                  <h4 className='h5'>Members</h4>
                <Link to="/admin/members/create" className='btn btn-primary'>Create</Link>
                </div>
                <hr />
                <table className='table table-stripped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                            {Members && Members.map(member=>{
                        return(
                        <tr key={`member-${member.id}`}>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.job_title}</td>
                            <td>{(member.status == 1) ? 'Active ' : 'Block'}</td>
                            <td>
                                <Link to={`/admin/members/Edit/${member .id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                <Link to="#" onClick={() =>{deleteMembers(member.id)}} className='btn btn-secondary btn-sm ms-2'> Delete</Link>
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

export default Showmembers
