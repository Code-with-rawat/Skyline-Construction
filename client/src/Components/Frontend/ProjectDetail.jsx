import React, { useEffect, useState } from 'react'
import NavSection from '../Common/NavSection'
import Footer from '../Common/Footer'
import Hero from '../Common/Hero'
import { Link, useParams } from 'react-router-dom'
import { apiUrl,fileUrl } from '../Common/Https'
import LatestTestimonials from '../Common/LatestTestimonials'

const ProjectDetail = () => {

    const param = useParams
    ();
  const [project, setproject] = useState([]);
  const [Project, setProject] = useState([]);
  const fetchprojectDetail = async () =>{
    const res = await fetch(`${apiUrl}get-project/${param.id}`,{
      method : 'GET'
    });
    const result = await res.json();
    setproject(result.data);

  }


    const fetchProjectsDetails = async () =>{
    const res = await fetch(`${apiUrl}get-projects`,{
      method : 'GET'
    });
    const result = await res.json();
    setProject(result.data);

  }
  useEffect(()=>{
      fetchProjectsDetails();
      fetchprojectDetail();
  },[param.id])
  return (
    <>
      <NavSection/>

        <main>
        <Hero
        subHeading="Quality. Integrity. Value."
        heading={project.title}
      />
      <section className='section-10'>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-md-4'>
                <div className='card shadow border-0 sidebar'>
                  <div className='card-body px-4 py-4'>
                    <h3 className='mt-2 mb-3'>Insights</h3>
                    <ul>
                    {
                        project.location && <li className='mb-2'>
                            <span className='text-body-secondary'>Location</span>
                            <p>{project.location}</p>
                        </li>

                    }

                    {
                        project.construction_type && <li className='mb-2'>
                            <span className='text-body-secondary'>Construction_type</span>
                            <p>{project.construction_type}</p>
                        </li>
                    }

                    {
                        project.sector && <li className='mb-2'>
                            <span className='text-body-secondary'>Sector</span>
                            <p>{project.sector}</p>
                        </li>
                    }
                    </ul>
                  </div>
                </div>
            </div>
            <div className='col-md-8'>
            <div>
              <img className='w-100' src={`${fileUrl}Uploads/Projects/Large/${project.image}`} alt="" />
            </div>
            <h3 className='py-3'>{project.title}</h3>
            <div dangerouslySetInnerHTML={{__html: project.content}}>      
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

export default ProjectDetail
