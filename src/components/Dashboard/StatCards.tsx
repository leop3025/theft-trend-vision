
import React from "react";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Package,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MonthData, calculateGrowthRate, monthlyData, months } from "@/utils/mockData";

type StatCardProps = {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  positive?: boolean;
};

const StatCard = ({ title, value, change, icon, positive = true }: StatCardProps) => {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
          </div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-purple/10 text-primary-purple">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          {change > 0 ? (
            <TrendingUp size={16} className={positive ? "text-red-500" : "text-green-500"} />
          ) : (
            <TrendingDown size={16} className={positive ? "text-green-500" : "text-red-500"} />
          )}
          <span 
            className={`ml-1 ${
              (change > 0 && positive) || (change < 0 && !positive) 
                ? "text-red-500" 
                : "text-green-500"
            }`}
          >
            {Math.abs(change).toFixed(1)}% from previous month
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

type StatCardsProps = {
  selectedMonth1: string;
  selectedMonth2: string | null;
};

export const StatCards: React.FC<StatCardsProps> = ({ selectedMonth1, selectedMonth2 }) => {
  const currentData = monthlyData[selectedMonth1];
  // Get previous month data
  const monthIndex = months.indexOf(selectedMonth1);
  const previousMonthIndex = monthIndex > 0 ? monthIndex - 1 : 11; // Wrap around to December if January
  const previousMonth = months[previousMonthIndex];
  const previousData = monthlyData[previousMonth];

  if (!currentData) return null;

  // Calculate growth rates
  const incidentChange = calculateGrowthRate(
    currentData.totalIncidents,
    previousData.totalIncidents
  );
  
  const valueChange = calculateGrowthRate(
    currentData.totalValue,
    previousData.totalValue
  );
  
  const recoveryChange = calculateGrowthRate(
    currentData.recoveryRate,
    previousData.recoveryRate
  );
  
  const riskChange = calculateGrowthRate(
    currentData.predictedRisk,
    previousData.predictedRisk
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Incidents"
        value={currentData.totalIncidents}
        change={incidentChange}
        icon={<AlertTriangle size={20} />}
        positive={false}
      />
      <StatCard
        title="Total Value Lost"
        value={`$${currentData.totalValue.toLocaleString()}`}
        change={valueChange}
        icon={<DollarSign size={20} />}
        positive={false}
      />
      <StatCard
        title="Recovery Rate"
        value={`${currentData.recoveryRate.toFixed(1)}%`}
        change={recoveryChange}
        icon={<Package size={20} />}
      />
      <StatCard
        title="Predicted Risk Level"
        value={`${currentData.predictedRisk}%`}
        change={riskChange}
        icon={<Calendar size={20} />}
        positive={false}
      />
    </div>
  );
};
