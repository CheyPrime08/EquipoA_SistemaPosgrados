import React from 'react';

export const PrerregistroHeader = ({ title = "Pre-Registro" }) => {
  return (
    <h1 className="text-[28px] font-medium mb-6 text-stone-800">
      {title}
    </h1>
  );
};
