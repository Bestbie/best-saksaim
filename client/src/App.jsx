import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./Login/Login";
import AdminDashboard from "./admin/AdminDashboard"; 
import HrDashboard from "./hr/HrDashboard"; 
import UserDashboard from "./user/UserDashboard"; 
import AdminIndex from "./admin/evaluations/AdminIndex";
import Create from "./admin/evaluations/Create";
import Edit from "./admin/evaluations/Edit";
import UserIndex from "./user/evaluations/UserIndex";
import UserShow from "./user/evaluations/UserShow";
import HrIndex from "./hr/evaluations/HrIndex";
import HrShow from "./hr/evaluations/HrShow";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute
import UserList from "./admin/user/UserList";
import UsersCreate from "./admin/user/UsersCreate";
import UserEdit from "./admin/user/UserEdit";
import Tests from "./admin/testSystem/Tests";
import Test1 from "./admin/testSystem/Test1";
import Test2 from "./admin/testSystem/Test2";
import Test3 from "./admin/testSystem/Test3";
import ImageMover from "./admin/testSystem/ImageMover";
import Test4 from "./admin/testSystem/Test4";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Get the authentication status from local storage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Update local storage whenever authentication state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/hr/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HrDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        <Route path="/admin/evaluations/index" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminIndex /></ProtectedRoute>} />
        <Route path="/admin/evaluations/create" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Create /></ProtectedRoute>} />
        <Route path="/admin/evaluations/edit/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Edit /></ProtectedRoute>} />
        <Route path="/user/evaluations/index" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UserIndex /></ProtectedRoute>} />
        <Route path="/user/evaluations/show/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UserShow /></ProtectedRoute>} />
        <Route path="/hr/evaluations/index" element={<ProtectedRoute isAuthenticated={isAuthenticated}><HrIndex /></ProtectedRoute>} />
        <Route path="/hr/evaluations/show/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><HrShow /></ProtectedRoute>} />
        <Route path="/admin/user/index" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UserList /></ProtectedRoute>} />
        <Route path="/admin/user/create" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UsersCreate /></ProtectedRoute>} />
        <Route path="/admin/user/edit/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UserEdit /></ProtectedRoute>} />


          {/* ทดลอง */}
        <Route path="/admin/test" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Tests /></ProtectedRoute>} />
        <Route path="/admin/test1" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Test1 /></ProtectedRoute>} />
        <Route path="/admin/test2" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Test2 /></ProtectedRoute>} />
        <Route path="/admin/test3" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Test3 /></ProtectedRoute>} />
        <Route path="/admin/test4" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Test4 /></ProtectedRoute>} />

        <Route path="/admin/ImageMover" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ImageMover /></ProtectedRoute>} />

      </Routes>
    </div>
  );
}

export default App;
