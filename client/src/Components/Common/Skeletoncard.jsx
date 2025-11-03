import React from 'react'
import Skeleton from "react-loading-skeleton";
function Skeletoncard() {
  return (
      <div className="col-md-4 col-lg-4 mb-4">
      <div className="card border-0 shadow-sm">
        <div className="skeleton" style={{ height: "200px", borderRadius: "10px" }}></div>
        <div className="card-body">
          <div className="skeleton mb-2" style={{ height: "20px", width: "80%" }}></div>
          <div className="skeleton mb-2" style={{ height: "15px", width: "60%" }}></div>
          <div className="skeleton" style={{ height: "30px", width: "100px", borderRadius: "6px" }}></div>
        </div>
      </div>
    </div>
  )
}

export default Skeletoncard
