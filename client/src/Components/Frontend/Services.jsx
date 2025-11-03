import React, { useEffect, useState } from "react";
import NavSection from "../Common/NavSection";
import Footer from "../Common/Footer";
import Hero from "../Common/Hero";
import { apiUrl, fileUrl } from "../Common/Https";
import { Link } from "react-router-dom";
import SkeletonCard from "../Common/Skeletoncard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllServices = async () => {
    try {
      const res = await fetch(apiUrl + "get-services", {
        method: "GET",
      });
      const response = await res.json();
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <>
      <NavSection />

      <Hero
        subHeading="Quality. Integrity. Value."
        heading="Services"
        text="We excel at transforming visions into reality through <br /> outstanding craftsmanship and precision."
      />

      <section className="section-3 bg-light py-5">
        <div className="container py-5">
          <div className="section-header text-center">
            <span>Our Services</span>
            <h2>Our Construction Services</h2>
            <p>
              We offer a diverse array of construction services, spanning
              residential, commercial, and industrial projects.
            </p>
          </div>

          <div className="row pt-4">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              Array.isArray(services) &&
              services.map((service) => (
                <div key={service.id} className="col-md-4 col-lg-4 mb-4">
                  <div className="item card shadow border-0">
                    <div className="service-image">
                      <img
                        src={`${fileUrl}Uploads/Services/Small/${service.image}`}
                        className="w-100"
                        alt={service.title}
                      />
                    </div>
                    <div className="service-body p-3">
                      <div className="service-title">
                        <h3 className="h5">{service.title}</h3>
                        <div className="service-content">
                          <p>{service.short_desc}</p>
                        </div>
                        <Link
                          to={`/service/${service.id}`}
                          className="btn btn-primary small"
                        >
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

      <Footer />
    </>
  );
};

export default Services;
