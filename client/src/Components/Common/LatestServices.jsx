import React, { useEffect, useState } from 'react'

// import ServiceImage from "../../assets/images/construction1.jpg";
// import ServiceImage2 from "../../assets/images/construction2.jpg";
// import ServiceImage3 from "../../assets/images/construction9.jpg";
// import ServiceImage4 from "../../assets/images/construction8.jpg";
import { apiUrl, fileUrl} from './Https';
import { Link } from 'react-router-dom';

const LatestServices = () => {

    const [services, setServices] = useState([]);
      const fetchLatestServices = async () =>{
           const res = await fetch(apiUrl + "get-latest-services?limit=4", {
            'method': "GET",
          });
          const response = await res.json();
          setServices(response.data);
      }

      useEffect(()=>{
            fetchLatestServices()
      },[])
  return (
    <>
              <section className="section-3 bg-light py-5">
                <div className="container-fluid py-5">
                  <div className="section-header text-center">
                    <span>our services</span>
                    <h2>Our construction services</h2>
                    <p>
                      We offer a diverse array of construction services, spanning
                      residential, commercial, and industrial projects.
                    </p>
                  </div>
                  <div className="row pt-4">
                  {Array.isArray(services) && services.map(service => (
  <div key={service.id} className="col-md-3 col-lg-3">
    <div className="item">
      <div className="service-image">
        <img src={`${fileUrl}Uploads/Services/Small/${service.image}`} className="w-100"/>
      </div>
      <div className="service-body">
        <div className="service-title">
          <h3>{service.title}</h3>
          <div className="service-content">
            <p>{service.short_desc}</p>
          </div>
          <Link to={`/service/${service.id}`} className="btn btn-primary small">Read More</Link>
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

export default LatestServices
