import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSlotsForDay } from '@/lib/utils';

const CalendarView = ({ onDateSelect, appointments }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const isDateAvailable = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    // No disponible en el pasado
    if (date < today) return false;

    const totalSlotsForDay = getSlotsForDay(date).length;
    if (totalSlotsForDay === 0) return false; // No es día laboral

    const dayAppointments = appointments.filter(apt => apt.date === dateStr);
    return dayAppointments.length < totalSlotsForDay;
  };
  
  const handleDateClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    if (isDateAvailable(selectedDate)) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      onDateSelect(dateStr);
    }
  };
  
  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0); // Normalize
      const isAvailable = isDateAvailable(date);
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <motion.div
          key={day}
          whileHover={isAvailable ? { scale: 1.05 } : {}}
          whileTap={isAvailable ? { scale: 0.95 } : {}}
          className={`calendar-day ${
            isAvailable 
              ? 'calendar-day-available' 
              : 'calendar-day-unavailable'
          } ${isToday ? 'ring-2 ring-blue-400' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </motion.div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="medical-card p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Selecciona una Fecha</h2>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={previousMonth}
            className="p-2 hover:bg-blue-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h3 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="p-2 hover:bg-blue-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
            <span className="text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="text-gray-600">No disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;