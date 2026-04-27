import React from 'react';
import { GanttBar } from './GanttBar';

export const GanttTimeline = ({ 
  events, 
  todayPosition, 
  onEventClick, 
  calculatePosition, 
  calculateWidth 
}) => {
  return (
    <div className="relative flex-1 p-6">
      {todayPosition >= 0 && (
        <div 
          className="absolute top-0 bottom-0 w-px bg-stone-300/50 z-10"
          style={{ left: `${todayPosition}%` }}
        />
      )}

      <div className="space-y-4 pt-2">
        {events.map((event) => (
          <GanttBar
            key={event.id}
            title={event.title}
            color={event.color}
            left={calculatePosition(event.startDate)}
            width={calculateWidth(event.startDate, event.endDate)}
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>
    </div>
  );
};
