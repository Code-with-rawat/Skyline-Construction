import React, { useEffect, useState } from 'react'
import NavSection from '../Common/NavSection'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'
import { Link, useParams } from 'react-router-dom'
import { apiUrl, fileUrl } from '../Common/Https'
import LatestTestimonials from '../Common/LatestTestimonials'
import SkeletonCard from '../Common/Skeletoncard'

const ServiceRetail = () => {
  const param = useParams();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.id]);

  // Fetch service detail
  const fetchServiceDetail = async () => {
    try {
      const res = await fetch(`${apiUrl}get-service/${param.id}`);
      const result = await res.json();
      setService(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching service detail:', error);
      setLoading(false);
    }
  };

  // Fetch all services (for sidebar)
  const fetchAllServices = async () => {
    try {
      const res = await fetch(`${apiUrl}get-services`);
      const result = await res.json();
      setAllServices(result.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllServices();
    fetchServiceDetail();
  }, [param.id]);

  return (
    <>
      {/* Navbar always visible instantly */}
      <NavSection />

      <main>
        {/* Hero Section (visible even before data) */}
        <Hero
          subHeading="Quality. Integrity. Value."
          heading={service ? service.title : "Loading Service..."}
          text="We excel at transforming visions into reality through outstanding craftsmanship and precision."
        />

        {/* Add min-height so Hero doesn't collapse before content loads */}
        <section className="section-10" style={{ minHeight: '400px' }}>
          <div className="container py-5">
            <div className="row">
              {/* Sidebar */}
              <div className="col-md-3">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-4 py-4">
                    <h3 className="mt-2 mb-3">Our Services</h3>
                    {allServices && allServices.map((s) => (
                      <ul key={s.id}>
                        <li>
                          <Link to={`/service/${s.id}`}>{s.title}</Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-md-9">
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
                        src={`${fileUrl}Uploads/Services/Large/${service.image}`}
                        alt={service.title}
                      />
                    </div>
                    <h3 className="py-3">{service.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: service.content }}></div>
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

export default ServiceRetail;
