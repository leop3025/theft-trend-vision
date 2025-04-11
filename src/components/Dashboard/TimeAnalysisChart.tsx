
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { monthlyData } from "@/utils/mockData";

type TimeAnalysisChartProps = {
  selectedMonth1: string;
  selectedMonth2: string | null;
};

export const TimeAnalysisChart: React.FC<TimeAnalysisChartProps> = ({ 
  selectedMonth1, 
  selectedMonth2 
}) => {
  const month1Data = monthlyData[selectedMonth1];
  const month2Data = selectedMonth2 ? monthlyData[selectedMonth2] : null;

  if (!month1Data) return null;

  // Format data for the chart
  const chartData = Object.entries(month1Data.timeStats).map(([time, count]) => ({
    time,
    [selectedMonth1]: count,
    ...(month2Data ? { [selectedMonth2]: month2Data.timeStats[time] } : {})
  }));

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Incidents by Time of Day</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "#1A1F2C", 
                  borderColor: "#2D3748",
                  color: "#FFFFFF" 
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Line 
                type="monotone" 
                dataKey={selectedMonth1} 
                stroke="#9b87f5" 
                strokeWidth={3} 
                dot={{ r: 4, fill: "#9b87f5" }} 
                activeDot={{ r: 6 }} 
              />
              {month2Data && (
                <Line 
                  type="monotone" 
                  dataKey={selectedMonth2} 
                  stroke="#7E69AB" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#7E69AB" }} 
                  activeDot={{ r: 6 }} 
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
