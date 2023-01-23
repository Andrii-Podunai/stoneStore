import React from 'react';
import './style.scss';

const ErrorBoundary = () => {
  return (
    <div className="text-wrapper d-flex align-items-center">
      <h1 className="m-auto content-text">Щось пішло не так…</h1>
    </div>
  );
};

export default ErrorBoundary;
