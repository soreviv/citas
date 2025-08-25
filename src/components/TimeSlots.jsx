import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSlotsForDay, formatDate } from '@/lib/utils';

const TimeSlots = ({ selectedDate, onTimeSelect, appointments, onBack }) => {
  const timeSlots = getSlotsForDay(new Date(selectedDate + 'T00:00:00'));

  const bookedTimes = useMemo(() => {
    return new Set(
      appointments
        .filter(apt => apt.date === selectedDate)
        .map(apt => apt.time)
    );
  }, [appointments, selectedDate]);

  const isTimeAvailable = (time) => {
    return !bookedTimes.has(time);
  };
  
  return (
    <div className="medical-card p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Selecciona un Horario</h2>
            <p className="text-gray-600 capitalize">{formatDate(selectedDate)}</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Cambiar Fecha
        </Button>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {timeSlots.length > 0 ? timeSlots.map((time, index) => {
            const available = isTimeAvailable(time);
            
            return (
              <motion.button
                key={time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={available ? { scale: 1.02 } : {}}
                whileTap={available ? { scale: 0.98 } : {}}
                className={`time-slot ${
                  available ? '' : 'time-slot-unavailable'
                }`}
                onClick={() => available && onTimeSelect(time)}
                disabled={!available}
              >
                {time}
                {!available && (
                  <span className="block text-xs mt-1">Ocupado</span>
                )}
              </motion.button>
            );
          }) : (
            <p className="text-gray-500 col-span-full text-center">No hay horarios disponibles para este día.</p>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-blue-800 mb-2">Horarios de Atención</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Lunes a Miércoles:</strong> 4:00 PM - 7:00 PM</p>
            <p><strong>Jueves y Viernes:</strong> 10:00 AM - 1:00 PM</p>
            <p><strong>Duración de consulta:</strong> 30 minutos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;