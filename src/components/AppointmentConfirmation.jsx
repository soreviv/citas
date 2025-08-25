import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, MapPin, Download, Plus, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate, getReasonText } from '@/lib/utils';
 
const AppointmentConfirmation = ({ appointment, onNewAppointment }) => {
  
  const downloadAppointment = () => {
    const appointmentText = `
CONFIRMACIÓN DE CITA - CONSULTORIO OTORRINONET

Paciente: ${appointment.patient_first_name} ${appointment.patient_last_name}
Fecha: ${formatDate(appointment.date)}
Hora: ${appointment.time}
Motivo: ${getReasonText(appointment.reason)}

Contacto:
Email: ${appointment.patient_email}
Teléfono: ${appointment.patient_phone}

Dirección del Consultorio:
Buenavista 20, Col. Lindavista, Gustavo A. Madero
WhatsApp: 5625479868

IMPORTANTE:
- Llegar 15 minutos antes de la cita
- Traer documento de identidad
- Traer estudios previos si los tiene
- En caso de no poder asistir, cancelar con 24h de anticipación

¡Gracias por confiar en nosotros!
    `;
    
    const blob = new Blob([appointmentText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cita-otorrinonet-${appointment.date}-${appointment.time.replace(':', '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="medical-card p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Cita Confirmada!</h2>
        <p className="text-gray-600">Tu cita ha sido reservada exitosamente</p>
      </motion.div>
      
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Detalles de tu Cita</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información de la cita */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium capitalize">{formatDate(appointment.date)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Hora</p>
                <p className="font-medium">{appointment.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Paciente</p>
                <p className="font-medium">
                  {appointment.patient_first_name} {appointment.patient_last_name}
                </p>
              </div>
            </div>
          </div>
          
          {/* Información de contacto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{appointment.patient_email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{appointment.patient_phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Motivo</p>
                <p className="font-medium">{getReasonText(appointment.reason)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Notas adicionales:</p>
            <p className="text-gray-700">{appointment.notes}</p>
          </div>
        )}
      </div>
      
      {/* Información importante */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">Información Importante</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>• Llegar 15 minutos antes de la cita</p>
          <p>• Traer documento de identidad</p>
          <p>• Traer estudios previos si los tiene</p>
          <p>• En caso de no poder asistir, cancelar con 24h de anticipación</p>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Dirección del Consultorio</span>
          </div>
          <p className="text-sm text-gray-600">Buenavista 20, Col. Lindavista, Gustavo A. Madero</p>
          <p className="text-sm text-gray-600">WhatsApp: 5625479868</p>
        </div>
      </div>
      
      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={downloadAppointment}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3"
          >
            <Download className="w-4 h-4" />
            Descargar Confirmación
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onNewAppointment}
            className="medical-button flex items-center gap-2 px-6 py-3"
          >
            <Plus className="w-4 h-4" />
            Reservar Nueva Cita
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;