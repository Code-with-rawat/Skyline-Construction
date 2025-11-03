import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import { apiUrl, fileUrl } from './Https';
import SkeletonCard from '../Common/Skeletoncard'; 

const LatestTestimonials = () => {
  const [Testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatestTestimonials = async () => {
    try {
      const res = await fetch(apiUrl + "get-latest-testmonials?limit=4");
      const data = await res.json();
      setTestimonials(data.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestTestimonials();
  }, []);

  return (
    <section className="section-5 py-5">
      <div className="container">
        <div className="section-header text-center">
          <span>Testimonials</span>
          <h2>What people are saying about us</h2>
          <p>
            We offer a diverse array of construction testimonials, spanning
            residential, commercial, and industrial projects.
          </p>
        </div>

        {loading ? (
          <div className="row pt-4">
            {Array(3)
              .fill()
              .map((_, i) => (
                <div key={i} className="col-md-3 col-lg-3 mb-4">
                  <SkeletonCard /> 
                </div>
              ))}
          </div>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            breakpoints={{
              200: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 40 },
              1024: { slidesPerView: 3, spaceBetween: 50 },
            }}
          >
            {Testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="card shadow border-0">
                  <div className="card-body p-5">
                    <div className="ratings mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-star-fill text-warning me-1"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l..." />
                        </svg>
                      ))}
                    </div>
                    <p>{testimonial.testmonial}</p>
                    <hr />
                    <div className="d-flex align-items-center mt-3">
                      <img
                        src={`${fileUrl}Uploads/testmonials/${testimonial.image}`}
                        width={50}
                        className="rounded-circle"
                        alt="client"
                      />
                      <div className="ps-3">
                        <div className="fw-bold">{testimonial.citation}</div>
                        <div>{testimonial.designation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default LatestTestimonials;
