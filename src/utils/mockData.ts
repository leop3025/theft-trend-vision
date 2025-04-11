
// Mock data for shoplifting incidents
export type ShopliftingIncident = {
  id: number;
  date: string;
  time: string;
  section: string;
  value: number;
  itemValue: number;
  recovered: boolean;
};

export type MonthData = {
  month: string;
  totalIncidents: number;
  totalValue: number;
  recoveryRate: number;
  dayStats: Record<string, number>;
  timeStats: Record<string, number>;
  sectionStats: Record<string, number>;
  incidents: ShopliftingIncident[];
  predictedRisk: number;
};

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const storeSections = ["Electronics", "Clothing", "Cosmetics", "Jewelry", "Grocery", "Accessories", "Home Goods"];
const timeSlots = ["9-11 AM", "11-1 PM", "1-3 PM", "3-5 PM", "5-7 PM", "7-9 PM"];

// Generate mock data for each month
const generateMonthData = (month: string, baseIncidents: number, trend: number): MonthData => {
  const incidents: ShopliftingIncident[] = [];
  const dayStats: Record<string, number> = {};
  const timeStats: Record<string, number> = {};
  const sectionStats: Record<string, number> = {};
  
  // Initialize stats
  daysOfWeek.forEach(day => dayStats[day] = 0);
  timeSlots.forEach(time => timeStats[time] = 0);
  storeSections.forEach(section => sectionStats[section] = 0);
  
  // Generate incidents for the month
  const totalIncidents = baseIncidents + Math.floor(Math.random() * trend);
  let totalValue = 0;
  let recoveredCount = 0;
  
  for (let i = 0; i < totalIncidents; i++) {
    const day = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)];
    const time = timeSlots[Math.floor(Math.random() * timeSlots.length)];
    const section = storeSections[Math.floor(Math.random() * storeSections.length)];
    const itemValue = Math.floor(Math.random() * 200) + 20;
    const recovered = Math.random() > 0.7;
    
    incidents.push({
      id: i,
      date: `${month} ${Math.floor(Math.random() * 28) + 1}, 2023`,
      time,
      section,
      value: 1,
      itemValue,
      recovered
    });
    
    // Update stats
    dayStats[day]++;
    timeStats[time]++;
    sectionStats[section]++;
    totalValue += itemValue;
    if (recovered) recoveredCount++;
  }
  
  return {
    month,
    totalIncidents,
    totalValue,
    recoveryRate: (recoveredCount / totalIncidents) * 100,
    dayStats,
    timeStats,
    sectionStats,
    incidents,
    predictedRisk: Math.floor(Math.random() * 100)
  };
};

// Create data for 12 months with some trends
export const monthlyData: Record<string, MonthData> = {
  "January": generateMonthData("January", 45, 10),
  "February": generateMonthData("February", 48, 12),
  "March": generateMonthData("March", 52, 15),
  "April": generateMonthData("April", 58, 12),
  "May": generateMonthData("May", 65, 10),
  "June": generateMonthData("June", 70, 8),
  "July": generateMonthData("July", 75, 10),
  "August": generateMonthData("August", 80, 12),
  "September": generateMonthData("September", 75, 8),
  "October": generateMonthData("October", 72, 5),
  "November": generateMonthData("November", 68, 10),
  "December": generateMonthData("December", 78, 15),
};

export const months = Object.keys(monthlyData);

// Generate prediction data based on historical data
export const generatePrediction = (month: string): MonthData => {
  const baseMonth = monthlyData[month];
  if (!baseMonth) return generateMonthData("Future Month", 60, 20);
  
  // Create a prediction with slight variations
  const prediction: MonthData = {
    ...baseMonth,
    month: `${month} (Predicted)`,
    totalIncidents: Math.floor(baseMonth.totalIncidents * (1 + (Math.random() * 0.2 - 0.1))),
    totalValue: Math.floor(baseMonth.totalValue * (1 + (Math.random() * 0.2 - 0.1))),
    predictedRisk: Math.floor(Math.random() * 100),
    dayStats: { ...baseMonth.dayStats },
    timeStats: { ...baseMonth.timeStats },
    sectionStats: { ...baseMonth.sectionStats }
  };
  
  // Adjust stats slightly
  Object.keys(prediction.dayStats).forEach(day => {
    prediction.dayStats[day] = Math.floor(baseMonth.dayStats[day] * (1 + (Math.random() * 0.3 - 0.15)));
  });
  
  Object.keys(prediction.timeStats).forEach(time => {
    prediction.timeStats[time] = Math.floor(baseMonth.timeStats[time] * (1 + (Math.random() * 0.3 - 0.15)));
  });
  
  Object.keys(prediction.sectionStats).forEach(section => {
    prediction.sectionStats[section] = Math.floor(baseMonth.sectionStats[section] * (1 + (Math.random() * 0.3 - 0.15)));
  });
  
  return prediction;
};

// Common data utils
export const getMaxValue = (data: Record<string, number>): number => {
  return Math.max(...Object.values(data));
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};

export const getDayTrend = (monthData: MonthData): string => {
  const maxDay = Object.entries(monthData.dayStats).reduce((max, [day, count]) => 
    count > max.count ? { day, count } : max, { day: '', count: 0 });
  
  return maxDay.day;
};

export const getTimeTrend = (monthData: MonthData): string => {
  const maxTime = Object.entries(monthData.timeStats).reduce((max, [time, count]) => 
    count > max.count ? { time, count } : max, { time: '', count: 0 });
  
  return maxTime.time;
};

export const getSectionTrend = (monthData: MonthData): string => {
  const maxSection = Object.entries(monthData.sectionStats).reduce((max, [section, count]) => 
    count > max.count ? { section, count } : max, { section: '', count: 0 });
  
  return maxSection.section;
};
