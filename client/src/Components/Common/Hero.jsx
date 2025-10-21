import React from 'react'

const Hero = ({subHeading , heading, text}) => {
  return (
    <>
     <section className="section-7">
          <div className="hero d-flex align-items-center">
            <div className="container">
              <div className="text-left ">
                <span>{subHeading}</span>
                <h1>{heading}</h1>
                <p dangerouslySetInnerHTML={{__html:text}}>
                </p>
                <div className="mt-4">
                  <a className="btn btn-primary large">Contact Now</a>
                  <a className="btn btn-secondary ms-2 large">View Projects</a>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Hero
