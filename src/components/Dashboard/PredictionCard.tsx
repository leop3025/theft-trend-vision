
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Clock, MapPin } from "lucide-react";
import { generatePrediction, getDayTrend, getTimeTrend, getSectionTrend, monthlyData } from "@/utils/mockData";

type PredictionCardProps = {
  selectedMonth1: string;
};

export const PredictionCard: React.FC<PredictionCardProps> = ({ selectedMonth1 }) => {
  // Use a default month if the selected month data is not available
  const currentData = monthlyData[selectedMonth1] || monthlyData["April"];
  
  // Generate prediction based on the current month or default to April
  const prediction = generatePrediction(selectedMonth1);
  
  if (!currentData || !prediction) {
    console.error(`No data available for month: ${selectedMonth1}`);
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">AI Prediction Analysis</CardTitle>
            <Badge variant="outline" className="bg-primary-purple/10 text-primary-purple border-primary-purple">
              ML Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-muted-foreground">
            No prediction data available for the selected month.
          </div>
        </CardContent>
      </Card>
    );
  }

  const highRiskDay = getDayTrend(prediction);
  const highRiskTime = getTimeTrend(prediction);
  const highRiskSection = getSectionTrend(prediction);
  
  // Calculate change percentages
  const incidentChangePercent = ((prediction.totalIncidents - currentData.totalIncidents) / currentData.totalIncidents) * 100;
  
  // Define risk level based on prediction
  let riskLevel = "Moderate";
  let riskColor = "bg-yellow-500";
  
  if (prediction.predictedRisk > 70) {
    riskLevel = "High";
    riskColor = "bg-red-500";
  } else if (prediction.predictedRisk < 30) {
    riskLevel = "Low";
    riskColor = "bg-green-500";
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">AI Prediction Analysis</CardTitle>
          <Badge variant="outline" className="bg-primary-purple/10 text-primary-purple border-primary-purple">
            ML Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-full ${riskColor} flex items-center justify-center`}>
                <AlertTriangle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Predicted Risk Level</p>
                <h3 className="text-xl font-bold">{riskLevel}</h3>
              </div>
            </div>
            <div className="text-3xl font-bold">{prediction.predictedRisk}%</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary p-4 rounded-lg flex items-start gap-3">
              <Calendar className="text-primary-purple mt-1" size={18} />
              <div>
                <p className="text-sm text-muted-foreground">High-Risk Day</p>
                <h4 className="font-medium">{highRiskDay}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Schedule extra security personnel
                </p>
              </div>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg flex items-start gap-3">
              <Clock className="text-primary-purple mt-1" size={18} />
              <div>
                <p className="text-sm text-muted-foreground">Peak Time</p>
                <h4 className="font-medium">{highRiskTime}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Increase surveillance during these hours
                </p>
              </div>
            </div>
            
            <div className="bg-secondary p-4 rounded-lg flex items-start gap-3">
              <MapPin className="text-primary-purple mt-1" size={18} />
              <div>
                <p className="text-sm text-muted-foreground">Vulnerable Section</p>
                <h4 className="font-medium">{highRiskSection}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Add security measures in this area
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-dark p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Forecasted Incidents</h4>
            <div className="flex items-end gap-3">
              <div className="text-3xl font-bold">{prediction.totalIncidents}</div>
              <div className={`text-sm ${incidentChangePercent > 0 ? 'text-red-400' : 'text-green-400'} pb-1`}>
                {incidentChangePercent > 0 ? '+' : ''}{incidentChangePercent.toFixed(1)}% from current month
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on historical patterns and seasonal factors
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>
              This prediction uses machine learning models trained on historical shoplifting data.
              Take preventive measures for the identified high-risk areas and times.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
