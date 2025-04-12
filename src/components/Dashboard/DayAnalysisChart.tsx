import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyData } from "@/utils/mockData";

type DayAnalysisChartProps = {
  selectedMonth1: string;
  selectedMonth2?: string | null;
};

export const DayAnalysisChart: React.FC<DayAnalysisChartProps> = ({
  selectedMonth1,
  selectedMonth2,
}) => {
  const month1Data = monthlyData[selectedMonth1];
  const month2Data = selectedMonth2 ? monthlyData[selectedMonth2] : null;

  if (!month1Data || !month1Data.dayStats) {
    return (
      <div className="text-sm text-muted-foreground">
        No day-wise data found for {selectedMonth1}
      </div>
    );
  }

  // Combine stats
  const chartData = Object.entries(month1Data.dayStats).map(([day, count]) => ({
    day,
    [selectedMonth1]: count,
    ...(month2Data?.dayStats?.[day] !== undefined
      ? { [selectedMonth2!]: month2Data.dayStats[day] }
      : {}),
  }));

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Incidents by Day of Week</CardTitle>
      </CardHeader>
      <CardContent style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis
              dataKey="day"
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
            <Bar
              dataKey={selectedMonth1}
              fill="#9b87f5"
              radius={[4, 4, 0, 0]}
              barSize={month2Data ? 20 : 40}
            />
            {selectedMonth2 && month2Data && (
              <Bar
                dataKey={selectedMonth2}
                fill="#7E69AB"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
