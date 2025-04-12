
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  getDayTrend, 
  getMaxValue, 
  getSectionTrend, 
  getTimeTrend, 
  monthlyData 
} from "@/utils/mockData";

type SectionHeatmapProps = {
  selectedMonth1: string;
};

const HeatmapCell = ({ 
  value, 
  maxValue, 
  section 
}: { 
  value: number; 
  maxValue: number; 
  section: string; 
}) => {
  const intensity = Math.max(0.1, value / maxValue);
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-full h-16 rounded-md flex items-center justify-center"
        style={{ 
          backgroundColor: `rgba(155, 135, 245, ${intensity})`,
          boxShadow: intensity > 0.7 ? '0 0 15px rgba(155, 135, 245, 0.5)' : 'none'
        }}
      >
        <span className="font-bold text-white">{value}</span>
      </div>
      <span className="text-xs mt-1 text-center">{section}</span>
    </div>
  );
};

export const SectionHeatmap: React.FC<SectionHeatmapProps> = ({ selectedMonth1 }) => {
  // Use a default month if the selected month data is not available
  const data = monthlyData[selectedMonth1] || monthlyData["April"];

  // Ensure we have data to display
  if (!data) {
    console.error(`No data available for month: ${selectedMonth1}`);
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Store Section Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-muted-foreground">
            No data available for the selected month.
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxValue = getMaxValue(data.sectionStats);
  const sections = Object.entries(data.sectionStats);

  // Extract insights
  const highRiskDay = getDayTrend(data);
  const highRiskTime = getTimeTrend(data);
  const highRiskSection = getSectionTrend(data);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Store Section Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {sections.map(([section, value]) => (
            <HeatmapCell 
              key={section} 
              value={value} 
              maxValue={maxValue} 
              section={section} 
            />
          ))}
        </div>
        
        <div className="mt-4 bg-secondary p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Key Insights</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary-purple"></span>
              <span>Highest risk day: <strong>{highRiskDay}</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary-purple"></span>
              <span>Peak shoplifting time: <strong>{highRiskTime}</strong></span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary-purple"></span>
              <span>Most vulnerable section: <strong>{highRiskSection}</strong></span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
