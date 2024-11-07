import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import Navbar from './layouts/Navbar';

const HrDashboard = () => {
  return (
     <>
      <Navbar />
        <MDBContainer className="my-5">
        <MDBCard>
            <MDBCardBody>
            <h2>HR Dashboard</h2>
            {/* Add your HR-specific content here */}
            </MDBCardBody>
        </MDBCard>
        </MDBContainer>
    </>
  );
};

export default HrDashboard;
