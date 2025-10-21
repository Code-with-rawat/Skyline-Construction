import React, { useEffect, useState } from 'react'
import { apiUrl,token } from '../../Common/Https';
import { toast } from 'react-toastify';
import NavSection from '../../Common/NavSection';
import Sidebar from '../../Common/Sidebar';
import { Link } from 'react-router-dom';
import Footer from '../../Common/Footer';

const Showarticles = () => {
     const [Articles,SetArticles] = useState([]);
              const fetchArticles = async () =>{
                  const res = await  fetch(apiUrl+'articles',{
                      'method' : 'GET',
                      'headers':{
                          'Content-type' : 'application/json',
                          'Accept' : 'application/json',
                          'Authorization' : `Bearer ${token()}`
          
                      }
                  });
                  const response = await res.json();
                  SetArticles(response.data);
                  console.log(response)
              }
          
              useEffect(()=>{
                      fetchArticles()
              },[])
          
              const deleteArticles = async (id)=>{
                if(confirm('Are your sure for delete the Articles')){
                    const res = await  fetch(apiUrl+'articles/'+id,{
                      'method' : 'DELETE',
                      'headers':{
                          'Content-type' : 'application/json',
                          'Accept' : 'application/json',
                          'Authorization' : `Bearer ${token()}`
          
                      }
                  });
                  const response = await res.json();
                    if(response.status == true){
                        const newArticles  = Articles.filter(Article => Article.id != id)
                        SetArticles(newArticles);
                        toast.success(response.message);
                    }
                    else{
                      toast.error(response.message);
                    }
              }
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
      
                      <div className='d-flex justify-content-between'>  
                        <h4 className='h5'>Articles</h4>
                      <Link to="/admin/articles/create" className='btn btn-primary'>Create</Link>
                      </div>
                      <hr />
                      <table className='table table-stripped'>
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Title</th>
                                  {/* <th>slug</th> */}
                                  <th>Status</th>
                                  <th>Action</th>
                              </tr>
                          </thead>
      
                          <tbody>
                              
                                  {Articles && Articles.map(article=>{
                              return(
                              <tr key={`article-${article.id}`}>
                                  <td>{article.id}</td>
                                  <td>{article.title}</td>
                                  {/* <td>{article.slug}</td> */}
                                  <td>{(article.status == 1) ? 'Active ' : 'Block'}</td>
                                  <td>
                                      <Link to={`/admin/articles/Edit/${article.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                      <Link to="#" onClick={() =>{deleteArticles(article.id)}} className='btn btn-secondary btn-sm ms-2'> Delete</Link>
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

export default Showarticles
