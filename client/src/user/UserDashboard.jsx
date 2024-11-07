import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import Navbar from './layouts/Navbar';

const UserDashboard = () => {
  return (
    <>
    <Navbar />
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBCardBody>
          <h2>User Dashboard</h2>
          {/* Add your user-specific content here */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </>
  );
};

export default UserDashboard;
