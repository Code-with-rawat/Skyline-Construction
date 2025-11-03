import React, { useEffect, useState } from 'react'
import NavSection from '../Common/NavSection'
import Footer from '../Common/Footer'


import Hero from '../Common/Hero';
import { apiUrl, fileUrl } from '../Common/Https';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [Articles, setArticles] = useState([]);
  const fetchLatestArticles = async ()=>{
    const res = await fetch(apiUrl + 'get-articles',{
      method : 'GET'
    });
     const response = await res.json();
     setArticles(response.data);

  }
     useEffect(()=>{
      fetchLatestArticles()
     },[])
  return (
    <>
    <NavSection/>
      <main>
        <Hero
        subHeading="Quality. Integrity. Value."
        heading="Blogs"
        text=" We excel at transforming visions into reality through <br />
                  outstanding craftsmanship and precise."
      />
         <section className="section-6 bg-light py-5">
                  <div className="container">
                    <div className="section-header text-center">
                      <span>Blog & News</span>
                      <h2>Articles & blog posts</h2>
                      <p>
                      We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.
                      </p>
                    </div>
                    <div className="row pt-3 ">
                     {Array.isArray(Articles) && Articles.map(article => {
                      return (
                      <div key={`articles-${article.id}`} className="col-md-4 mb-3">
                        <div className="card shadow border-0">
                          <div className="card-img-top">
                            <img src={`${fileUrl}Uploads/Articles/Small/${article.image}`} className="w-100"/>
                          </div>
                          <div className="card-body p-4">
                            <div className="mb-3">
                              <Link to={`/article/${article.id}`} className="title">{article.title}</Link>
                            </div>
                            <Link to={`/article/${article.id}`} className="btn btn-primary small">Read More</Link>
                          </div>
                        </div>
                      </div>
                     )})};
                    </div>
                  </div>
                </section>
      </main>
    <Footer/>
    </>
  )
}

export default Blogs
