import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Dashboard
      </h2>
      <p style={{ color: '#64748b' }}>
        Visão geral da sua conta e métricas de publicação.
      </p>
    </div>
  );
};

export default Dashboard;
