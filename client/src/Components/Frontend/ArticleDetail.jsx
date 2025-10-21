import React, { useEffect, useState } from 'react'
import NavSection from '../Common/NavSection'
import Footer from '../Common/Footer'
import { Link, useParams } from 'react-router-dom';
import { apiUrl,fileUrl } from '../Common/Https'
import Hero from '../Common/Hero';

const ArticleDetail = () => {

       const param = useParams
    ();
  const [article, setarticle] = useState([]);
  const [Article, setArticle] = useState([]);
  const fetcharticleDetail = async () =>{
    const res = await fetch(`${apiUrl}get-article/${param.id}`,{
      method : 'GET'
    });
    const result = await res.json();
    setarticle(result.data);

  }


    const fetchArticlesDetails = async () =>{
    const res = await fetch(`${apiUrl}get-latest-articles`,{
      method : 'GET'
    });
    const result = await res.json();
    setArticle(result.data);

  }
  useEffect(()=>{
      fetchArticlesDetails();
      fetcharticleDetail();
  },[param.id])
  return (
    <>
       <NavSection/>
             <main>
        <Hero
        subHeading="Quality. Integrity. Value."
        heading="Blogs and News"
      />
      <section className='section-12'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-8'>
                            <h2>{article.title}</h2>
                            <div className='pb-3'>by {article.author}  on {article.created_at}</div>
                            <div className='pe-md-5 pb-3'>
                             <img className='w-100' src={`${fileUrl}uploads/articles/large/${article.image}`} alt="" />
                                
                            </div>
                            <div dangerouslySetInnerHTML={{__html:article.content}}>
                            </div>
                    </div>

                    <div className='col-md-4'>
                        <div className='card shadow border-0 sidebar'>
                            <div className='card-body px-5 py-4'>
                                <div className='mt-2 mb-3'>Latest Blogs</div>
                               {
                                Article && Article.map(articles=>{
                                    return(
                                         <div className='d-flex border-bottom pb-2 mb-3'>
                                    <div className='pe-3 pb-2'>
                            <Link to={`/article/${articles.id}`}> <img width={100} src={`${fileUrl}uploads/articles/small/${articles.image}`} alt="" /></Link>
                                    </div>
                                    <Link to={`/article/${articles.id}`} className='title'>{articles.title}</Link>
                                    <hr/>
                                </div>
                                    )
                                })
                               }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </section>
      </main>
       <Footer/>
    </>
  )
}

export default ArticleDetail
