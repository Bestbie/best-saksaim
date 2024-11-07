import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import Navbar from './layouts/Navbar';

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBCardBody>
            <h2>Admin Dashboard</h2>
            {/* Add your admin-specific content here */}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default AdminDashboard;
