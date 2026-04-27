export const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

export const getTotalDays = (startMonth, endMonth, year) => {
  let total = 0;
  for (let i = startMonth; i <= endMonth; i++) {
    total += daysInMonth(i, year);
  }
  return total;
};

export const getPosition = (dateStr, startMonth, endMonth, year, totalDays) => {
  const date = new Date(dateStr);
  const dateMonth = date.getMonth();
  const dateDay = date.getDate();
  
  if (dateMonth < startMonth || dateMonth > endMonth) return -1;
  
  let daysBefore = 0;
  for (let i = startMonth; i < dateMonth; i++) {
    daysBefore += daysInMonth(i, year);
  }
  daysBefore += dateDay - 1;
  
  return (daysBefore / totalDays) * 100;
};

export const getWidth = (startDate, endDate, totalDays) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return (diffDays / totalDays) * 100;
};
