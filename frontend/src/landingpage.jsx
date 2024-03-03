import React from 'react';

export default function LandingPage() {
  
  // Redirect to login page
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  // Redirect to signup page
  const handleSignupClick = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Welcome to Our App</h1>
          <button className="btn btn-primary btn-block mb-3" onClick={handleLoginClick}>
            Have an account? Click here to login
          </button>
          <button className="btn btn-secondary btn-block" onClick={handleSignupClick}>
            Don't have an account? Click here to sign up
          </button>
        </div>
      </div>
    </div>
  );
}