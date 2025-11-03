import React, { useEffect, useState } from 'react';
import { apiUrl, fileUrl } from './Https';
import { Link } from 'react-router-dom';
import SkeletonCard from '../Common/Skeletoncard'; 

const LatestServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchLatestServices = async () => {
    try {
      const res = await fetch(apiUrl + "get-latest-services?limit=4", {
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
    fetchLatestServices();
  }, []);

  return (
    <>
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
              Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            ) : (
              Array.isArray(services) &&
              services.map((service) => (
                <div key={service.id} className="col-md-3 col-lg-3 mb-3">
                  <div className="item">
                    <div className="service-image">
                      <img
                        src={`${fileUrl}Uploads/Services/Small/${service.image}`}
                        className="w-100"
                        alt={service.title}
                      />
                    </div>
                    <div className="service-body">
                      <div className="service-title">
                        <h3>{service.title}</h3>
                        <div className="service-content">
                          <p>{service.short_desc}</p>
                        </div>
                        <Link to={`/service/${service.id}`} className="btn btn-primary small">
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

export default LatestServices;
