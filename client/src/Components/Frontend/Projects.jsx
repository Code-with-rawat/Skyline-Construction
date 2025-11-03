import React, { useEffect, useState } from "react";
import NavSection from "../Common/NavSection";
import Footer from "../Common/Footer";
import Hero from "../Common/Hero";
import { apiUrl, fileUrl } from "../Common/Https";
import { Link } from "react-router-dom";
import SkeletonCard from "../Common/Skeletoncard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestProjects = async () => {
    try {
      const res = await fetch(apiUrl + "get-projects", { method: "GET" });
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
      <NavSection />
      <main>
        <Hero
          subHeading="Quality. Integrity. Value."
          heading="Our Projects"
          text="We excel at transforming visions into reality through outstanding craftsmanship and precision."
        />

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
              {loading
                ?
                  [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                : Array.isArray(projects) &&
                  projects.map((project) => (
                    <div key={project.id} className="col-md-4 col-lg-4 mb-4">
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
                            <Link
                              to={`/project/${project.id}`}
                              className="btn btn-primary small"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
