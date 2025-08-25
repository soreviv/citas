import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MapPin, Stethoscope, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import CalendarView from '@/components/CalendarView';
import TimeSlots from '@/components/TimeSlots';
import PatientForm from '@/components/PatientForm';
import AppointmentConfirmation from '@/components/AppointmentConfirmation';
import { getAppointments, saveAppointment } from '../services/appointmentService';

const steps = [
  { number: 1, title: 'Seleccionar Fecha', icon: Calendar },
  { number: 2, title: 'Elegir Horario', icon: Clock },
  { number: 3, title: 'Datos del Paciente', icon: User },
  { number: 4, title: 'Confirmación', icon: CheckCircle }
];

const AppointmentBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientData, setPatientData] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      // El error ya se registra en el servicio
      toast({
        title: "Error al cargar citas",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setCurrentStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };

  const handlePatientSubmit = async (data) => {
    setPatientData(data);

    const newAppointmentData = {
      date: selectedDate,
      time: selectedTime,
      patient_first_name: data.firstName,
      patient_last_name: data.lastName,
      patient_email: data.email,
      patient_phone: data.phone,
      patient_birth_date: data.birthDate,
      reason: data.reason,
      notes: data.notes,
      status: 'confirmed',
    };

    try {
      const insertedData = await saveAppointment(newAppointmentData);
      setConfirmedAppointment(insertedData);
      setCurrentStep(4);

      toast({
        title: "¡Cita Confirmada!",
        description: `Tu cita ha sido reservada para el ${selectedDate} a las ${selectedTime}`,
      });
    } catch (error) {
      toast({
        title: "Error al guardar la cita",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setPatientData({});
    setConfirmedAppointment(null);
    fetchAppointments(); // Recargar citas para que el calendario se actualice
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">Cargando calendario y citas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-2xl shadow-lg">
              <Stethoscope className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Consultorio Otorrinonet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reserva tu cita de otorrinolaringología de forma rápida y sencilla
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Buenavista 20, Col. Lindavista, Gustavo A. Madero</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>WhatsApp: 5625479868</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contacto@otorrinonet.com</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="medical-card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center gap-3 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="hidden md:block">
                      <div className={`font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarView 
                onDateSelect={handleDateSelect}
                appointments={appointments}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="timeslots"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TimeSlots
                selectedDate={selectedDate}
                onTimeSelect={handleTimeSelect}
                appointments={appointments}
                onBack={() => setCurrentStep(1)}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PatientForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSubmit={handlePatientSubmit}
                onBack={() => setCurrentStep(2)}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AppointmentConfirmation
                appointment={confirmedAppointment}
                onNewAppointment={resetBooking}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppointmentBooking;