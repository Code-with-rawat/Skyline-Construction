
import React, { useEffect, useState } from 'react'
import { apiUrl,fileUrl} from './Https';
import Footer from './Footer';
import NavSection from './NavSection';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const LatestProjects = () => {
    const [Projects, setProjects] = useState([]);
      const fetchLatestProjects = async () =>{
           const res = await fetch(apiUrl + "get-latest-projects?limit=4", {
            'method': "GET",
          });
          const response = await res.json();
          setProjects(response.data);
      }

      useEffect(()=>{
            fetchLatestProjects()
      },[])
  return (
    <>
      <section className="section-3 bg-light py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>our projects</span>
            <h2>Discover our diverse range of projects</h2>
              <p>
                We offer a diverse array of construction services, spanning
              residential, commercial, and industrial projects.
              </p>
            </div>
          <div className="row pt-4">
             {Array.isArray(Projects) && Projects.map(project => (
              <div key={project.id} className="col-md-3 col-lg-3">
                <div className="item">
                  <div className="service-image">
                    <img src={`${fileUrl}uploads/projects/small/${project.image}`} className="w-100"/>
                  </div>
                  <div className="service-body">
                    <div className="service-title">
                      <h3>{project.title}</h3>
                      <div className="service-content">
                        <p>{project.short_desc}</p>
                      </div>
                      <Link to={`/project/${project.id}`} className="btn btn-primary small">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default LatestProjects
