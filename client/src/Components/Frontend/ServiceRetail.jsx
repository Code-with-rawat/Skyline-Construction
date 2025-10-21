import React, { useEffect, useState } from 'react'
import NavSection from '../Common/NavSection'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'
import { Link, useParams } from 'react-router-dom'
import { apiUrl,fileUrl } from '../Common/Https'
import LatestTestimonials from '../Common/LatestTestimonials'

const ServiceRetail = () => {
  const param = useParams();
  const [service, setservice] = useState([]);
  const [Service, setService] = useState([]);
  const fetchServiceDetail = async () =>{
    const res = await fetch(`${apiUrl}get-service/${param.id}`,{
      method : 'GET'
    });
    const result = await res.json();
    setservice(result.data);

  }


    const fetchServicesDetails = async () =>{
    const res = await fetch(`${apiUrl}get-services`,{
      method : 'GET'
    });
    const result = await res.json();
    setService(result.data);

  }
  useEffect(()=>{
      fetchServicesDetails();
      fetchServiceDetail();
  },[param.id])
    
  return (
    <>
      <NavSection/>
    
        <main>
          <Hero
          subHeading="Quality. Integrity. Value."
          heading={`${service.title}`}
        />
        <section className='section-10'>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-md-3'>
                <div className='card shadow border-0 sidebar'>
                  <div className='card-body px-4 py-4'>
                    <h3 className='mt-2 mb-3'>Our Services</h3>
                    {
                      Service && Service.map(services=>{
                        return(
                          <ul>
                            <li key={`services-${services.id}`}>
                              <Link to={`/service/${services.id}`}>{services.title}</Link>
                            </li>
                          </ul>
                        )
                      })
                    }
                  </div>
                </div>
            </div>
            <div className='col-md-9'>
            <div>
              <img className='w-100' src={`${fileUrl}uploads/services/large/${service.image}`} alt="" />
            </div>
            <h3 className='py-3'>{service.title}</h3>
            <div dangerouslySetInnerHTML={{__html: service.content}}>      
            </div>
            </div>
          </div>
        </div>
         <section className='section-11 bg-light py-5'>
                    <LatestTestimonials/>
        </section>
          </section>
        </main>
      <Footer/>
    </>
  )
}

export default ServiceRetail
