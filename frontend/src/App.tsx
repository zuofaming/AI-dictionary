import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LanguageSelection from './pages/LanguageSelection';
import Dictionary from './pages/Dictionary';
import Notebook from './pages/Notebook';
import LearnMode from './pages/LearnMode';
import { useStore } from './store/useStore';

const App: React.FC = () => {
  const { nativeLanguage, targetLanguage } = useStore();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route
            path="/dictionary"
            element={
              nativeLanguage && targetLanguage ? (
                <Dictionary />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/notebook"
            element={
              nativeLanguage && targetLanguage ? (
                <Notebook />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/learn"
            element={
              nativeLanguage && targetLanguage ? (
                <LearnMode />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#374151',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
