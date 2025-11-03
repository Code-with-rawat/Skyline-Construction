import React, { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from './Https';
import { Link } from 'react-router-dom';
import SkeletonCard from '../Common/Skeletoncard'; 

const LatestProjects = () => {
  const [Projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchLatestProjects = async () => {
    try {
      const res = await fetch(apiUrl + "get-latest-projects?limit=4", {
        method: "GET",
      });
      const response = await res.json();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchLatestProjects();
  }, []);

  return (
    <>
      <section className="section-3 bg-light py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>Our Projects</span>
            <h2>Discover our diverse range of projects</h2>
            <p>
              We offer a diverse array of construction services, spanning
              residential, commercial, and industrial projects.
            </p>
          </div>

          <div className="row pt-4">
            {loading ? (
    
              Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            ) : (
              Array.isArray(Projects) &&
              Projects.map((project) => (
                <div key={project.id} className="col-md-3 col-lg-3 mb-3">
                  <div className="item">
                    <div className="service-image">
                      <img
                        src={`${fileUrl}Uploads/Projects/Small/${project.image}`}
                        className="w-100"
                        alt={project.title}
                      />
                    </div>
                    <div className="service-body">
                      <div className="service-title">
                        <h3>{project.title}</h3>
                        <div className="service-content">
                          <p>{project.short_desc}</p>
                        </div>
                        <Link to={`/project/${project.id}`} className="btn btn-primary small">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestProjects;
