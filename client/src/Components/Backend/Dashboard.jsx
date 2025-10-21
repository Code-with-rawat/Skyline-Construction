import React from "react";
import NavSection from "../Common/NavSection";
import Footer from "../Common/Footer";
import Sidebar from "../Common/Sidebar";

const Dashboard = () => {
  return (
    <>
      <NavSection />
      <main>
        <div className="container my-5 ">
          <div className="row">
            <div className="col-md-3">
              <Sidebar/>
            </div>

            <div className="col-md-9 dashboard">
              <div className="card shadow border-0">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <h4>Welcome to Admin Panel Here </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
