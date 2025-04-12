import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyData } from "@/utils/mockData";

type TimeAnalysisChartProps = {
  selectedMonth1: string;
  selectedMonth2?: string | null;
};

export const TimeAnalysisChart: React.FC<TimeAnalysisChartProps> = ({
  selectedMonth1,
  selectedMonth2,
}) => {
  const month1Data = monthlyData[selectedMonth1];
  const month2Data = selectedMonth2 ? monthlyData[selectedMonth2] : null;

  // Fail gracefully if no data
  if (!month1Data || !month1Data.timeStats) {
    return (
      <div className="text-sm text-muted-foreground">
        No data available for {selectedMonth1}
      </div>
    );
  }

  const chartData = Object.entries(month1Data.timeStats).map(([time, count]) => ({
    time,
    [selectedMonth1]: count,
    ...(month2Data?.timeStats?.[time] !== undefined
      ? { [selectedMonth2!]: month2Data.timeStats[time] }
      : {}),
  }));

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Incidents by Time of Day</CardTitle>
      </CardHeader>
      <CardContent style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis
              dataKey="time"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1A1F2C",
                borderColor: "#2D3748",
                color: "#FFFFFF",
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
            {selectedMonth2 && month2Data && (
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
      </CardContent>
    </Card>
  );
};
