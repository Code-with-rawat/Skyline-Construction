import React, { useEffect, useState } from 'react'
import NavSection from '../Common/NavSection'
import Footer from '../Common/Footer'
import { Link, useParams } from 'react-router-dom'
import { apiUrl, fileUrl } from '../Common/Https'
import Hero from '../Common/Hero'
import SkeletonCard from '../Common/Skeletoncard'

const ArticleDetail = () => {
  const param = useParams();
  const [article, setArticle] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when navigating between articles
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.id]);

  // Fetch article details
  const fetchArticleDetail = async () => {
    try {
      const res = await fetch(`${apiUrl}get-article/${param.id}`);
      const result = await res.json();
      setArticle(result.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching article details:', err);
      setLoading(false);
    }
  };

  // Fetch latest articles
  const fetchArticlesDetails = async () => {
    try {
      const res = await fetch(`${apiUrl}get-latest-articles`);
      const result = await res.json();
      setLatestArticles(result.data);
    } catch (err) {
      console.error('Error fetching latest articles:', err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchArticlesDetails();
    fetchArticleDetail();
  }, [param.id]);

  return (
    <>
      {/* ✅ Navbar and Hero always appear first */}
      <NavSection />

      <main>
        <Hero
          subHeading="Quality. Integrity. Value."
          heading="Blogs and News"
          text="Read our latest insights and updates from the world of construction."
        />

        <section className="section-12" style={{ minHeight: '500px' }}>
          <div className="container py-5">
            <div className="row">
              {/* Left Article Content */}
              <div className="col-md-8">
                {loading ? (
                  <>
                    <SkeletonCard height="50px" width="60%" className="mb-3" />
                    <SkeletonCard height="20px" width="40%" className="mb-4" />
                    <SkeletonCard height="400px" className="mb-4" />
                    <SkeletonCard height="200px" />
                  </>
                ) : (
                  <>
                    <h2>{article.title}</h2>
                    <div className="pb-3">
                      by {article.author} on {article.created_at}
                    </div>
                    <div className="pe-md-5 pb-3">
                      <img
                        className="w-100"
                        src={`${fileUrl}Uploads/Articles/Large/${article.image}`}
                        alt={article.title}
                      />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                  </>
                )}
              </div>

              {/* Right Sidebar (Latest Blogs) */}
              <div className="col-md-4">
                <div className="card shadow border-0 sidebar">
                  <div className="card-body px-5 py-4">
                    <div className="mt-2 mb-3">Latest Blogs</div>

                    {latestArticles && latestArticles.length > 0 ? (
                      latestArticles.map((articles) => (
                        <div
                          key={articles.id}
                          className="d-flex border-bottom pb-2 mb-3 align-items-start"
                        >
                          <div className="pe-3 pb-2">
                            <Link to={`/article/${articles.id}`}>
                              <img
                                width={100}
                                src={`${fileUrl}Uploads/Articles/Small/${articles.image}`}
                                alt={articles.title}
                              />
                            </Link>
                          </div>
                          <Link to={`/article/${articles.id}`} className="title">
                            {articles.title}
                          </Link>
                        </div>
                      ))
                    ) : (
                      <SkeletonCard height="300px" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ArticleDetail;
