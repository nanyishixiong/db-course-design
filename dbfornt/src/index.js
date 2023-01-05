import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import ErrorBoundary from '@/component/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);

