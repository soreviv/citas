import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import AppointmentBooking from '@/components/AppointmentBooking';

function App() {
  return (
    <>
      <Helmet>
        <title>Consultorio ORL - Reserva tu Cita Online</title>
        <meta name="description" content="Reserva tu cita en nuestro consultorio de otorrinolaringología de forma rápida y sencilla. Horarios disponibles en tiempo real." />
        <meta property="og:title" content="Consultorio ORL - Reserva tu Cita Online" />
        <meta property="og:description" content="Reserva tu cita en nuestro consultorio de otorrinolaringología de forma rápida y sencilla. Horarios disponibles en tiempo real." />
      </Helmet>
      
      <div className="min-h-screen">
        <AppointmentBooking />
        <Toaster />
      </div>
    </>
  );
}

export default App;