import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
import NavSection from "../Common/NavSection";
import About2 from "../Common/About2";
import Footer from "../Common/Footer";
// import ServiceImage from "../../assets/images/construction1.jpg";
// import ServiceImage2 from "../../assets/images/construction2.jpg";
// import ServiceImage3 from "../../assets/images/construction9.jpg";
// import ServiceImage4 from "../../assets/images/construction8.jpg";

// import project1 from "../../assets/images/construction3.jpg";
// import projects2 from "../../assets/images/construction43.jpg";
// import project3 from "../../assets/images/construction6.jpg";
// import project4 from "../../assets/images/construction12121.jpg";
import IconImages1 from "../../assets/images/icon-1.svg";
import IconImages2 from "../../assets/images/icon-2.svg";

import IconImages3 from "../../assets/images/icon-3.svg";
// import AvtarImage1 from "../../assets/images/author-2.jpg";

// import BlogsImage from "../../assets/images/construction121.jpg";
// import BlogsImage1 from "../../assets/images/construction7.jpg";
// import BlogsImage2 from "../../assets/images/construction123.jpg";
import { apiUrl, token } from "../Common/Https";
import LatestServices from "../Common/LatestServices";
import LatestProjects from "../Common/LatestProjects";
import LatestArticles from "../Common/LatestArticles";
import LatestTestimonials from "../Common/LatestTestimonials";



const Home =  () => {

  return (
    <>
      <NavSection />
      <main>
        {/* Hero Section */}

        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome Amazing Constructions</span>
                <h1>
                  Crafting dreams with <br /> precision and excellence.
                </h1>
                <p>
                  We excel at transforming visions into reality through
                  outstanding craftsmanship and precise <br />
                  attention to detail. With years of experience and a dedication
                  to quality.
                </p>
                <div className="mt-4">
                  <a className="btn btn-primary large">Contact Now</a>
                  <a className="btn btn-secondary ms-2 large">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About section */}

        <About2/>

        {/* Our Services */}

        <LatestServices/>

        {/* Why Choose us */}

        <section className="section-4 py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Why Choose Us</span>
              <h2>Discover our wide variety of projects.</h2>
              <p>
                Created in close partnership with our clients and collaborators,
                this approach merges industry expertise, decades of experience,
                innovation, and flexibility to consistently deliver excellence.
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={IconImages1} />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>
                    Small actions create big impacts. It all begins and ends
                    with each employee committing to safer work practices daily,
                    ensuring they return home safely.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={IconImages2} />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>
                    Small actions create big impacts. It all begins and ends
                    with each employee committing to safer work practices daily,
                    ensuring they return home safely.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img src={IconImages3} />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Cutting-Edge Solutions</h3>
                  </div>
                  <p>
                    Small actions create big impacts. It all begins and ends
                    with each employee committing to safer work practices daily,
                    ensuring they return home safely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Projects */}

        <LatestProjects/>

        {/* testmonials */}
        <LatestTestimonials/>

        {/* Blogs abd News */}
       <LatestArticles/>
      </main>
      <Footer />
    </>
  );
};

export default Home;
