import React, { useEffect, useState } from 'react'
import NavSection from '../Common/NavSection'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'
import { Link, useParams } from 'react-router-dom'
import { apiUrl, fileUrl } from '../Common/Https'
import LatestTestimonials from '../Common/LatestTestimonials'
import SkeletonCard from '../Common/Skeletoncard'

const ProjectDetail = () => {
  const param = useParams();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.id]);

  // Fetch single project
  const fetchProjectDetail = async () => {
    try {
      const res = await fetch(`${apiUrl}get-project/${param.id}`);
      const result = await res.json();
      setProject(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project detail:', error);
      setLoading(false);
    }
  };

  // Fetch all projects (if needed later)
  const fetchProjectsDetails = async () => {
    try {
      const res = await fetch(`${apiUrl}get-projects`);
      const result = await res.json();
      setAllProjects(result.data);
    } catch (error) {
      console.error('Error fetching all projects:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProjectsDetails();
    fetchProjectDetail();
  }, [param.id]);

  return (
    <>
      {/* Navbar always visible instantly */}
      <NavSection />

      <main>
        {/* Hero always visible even before API data */}
        <Hero
          subHeading="Quality. Integrity. Value."
          heading={project ? project.title : "Loading Project..."}
          text="Delivering excellence through every project we undertake."
        />

        {/* Add min-height so Hero doesn't collapse before data */}
        <section className="section-10" style={{ minHeight: '400px' }}>
          <div className="container py-5">
            <div className="row">
              {/* Sidebar */}
              <div className="col-md-4">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Insights</h3>

                    {loading ? (
                      <SkeletonCard height="200px" />
                    ) : (
                      <ul>
                        {project.location && (
                          <li className="mb-2">
                            <span className="text-body-secondary">Location</span>
                            <p>{project.location}</p>
                          </li>
                        )}

                        {project.construction_type && (
                          <li className="mb-2">
                            <span className="text-body-secondary">Construction Type</span>
                            <p>{project.construction_type}</p>
                          </li>
                        )}

                        {project.sector && (
                          <li className="mb-2">
                            <span className="text-body-secondary">Sector</span>
                            <p>{project.sector}</p>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-md-8">
                {loading ? (
                  <div>
                    <SkeletonCard height="400px" className="mb-3" />
                    <SkeletonCard height="30px" width="70%" className="mb-2" />
                    <SkeletonCard height="150px" />
                  </div>
                ) : (
                  <>
                    <div>
                      <img
                        className="w-100"
                        src={`${fileUrl}Uploads/Projects/Large/${project.image}`}
                        alt={project.title}
                      />
                    </div>
                    <h3 className="py-3">{project.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: project.content }}></div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <section className="section-11 bg-light py-5">
            <LatestTestimonials />
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetail;
