import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';
import './Login.css'; // นำเข้าข้อมูล CSS

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    console.log(`Fetching URL: ${apiUrl}/login/auth`);

    try {
      const response = await fetch(`${apiUrl}/login/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Login failed!');
      }

      const data = await response.json();

      if (data.status === 'success') {
        setSuccess('Login successful!');
        setError(null);
        setIsAuthenticated(true); // Mark user as authenticated

        switch (data.role_id) {
          case 1:
            navigate('/admin/dashboard');
            break;
          case 2:
            navigate('/hr/dashboard');
            break;
          case 3:
            navigate('/user/dashboard');
            break;
          default:
            navigate('/login');
        }
      } else {
        throw new Error(data.message || 'Login failed!');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

              <form onSubmit={handleLogin}>
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Email address'
                  id='formControlLg' 
                  type='email' 
                  size="lg" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Password' 
                  id='formControlLg' 
                  type='password' 
                  size="lg" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <MDBBtn 
                  className="mb-3 px-3 fixed-width-btn" 
                  color='dark' 
                  size='sm' 
                  disabled={loading}
                >
                  {loading ? <MDBIcon icon="spinner" spin /> : 'Login'}
                </MDBBtn>
              </form>

              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
              
              {/* <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>
                Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a>
              </p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div> */}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
