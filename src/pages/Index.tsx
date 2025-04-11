
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Dashboard/Header";
import { MonthSelector } from "@/components/Dashboard/MonthSelector";
import { StatCards } from "@/components/Dashboard/StatCards";
import { DayAnalysisChart } from "@/components/Dashboard/DayAnalysisChart";
import { TimeAnalysisChart } from "@/components/Dashboard/TimeAnalysisChart";
import { SectionHeatmap } from "@/components/Dashboard/SectionHeatmap";
import { PredictionCard } from "@/components/Dashboard/PredictionCard";
import { IncidentTable } from "@/components/Dashboard/IncidentTable";

const Dashboard = () => {
  const [selectedMonth1, setSelectedMonth1] = useState("April");
  const [selectedMonth2, setSelectedMonth2] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background scrollbar-hide">
        <div className="container mx-auto py-6 px-4 max-w-7xl">
          <Header selectedMonth1={selectedMonth1} selectedMonth2={selectedMonth2} />
          
          <MonthSelector
            selectedMonth1={selectedMonth1}
            selectedMonth2={selectedMonth2}
            onMonth1Change={setSelectedMonth1}
            onMonth2Change={setSelectedMonth2}
          />
          
          <StatCards 
            selectedMonth1={selectedMonth1}
            selectedMonth2={selectedMonth2}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <DayAnalysisChart 
              selectedMonth1={selectedMonth1}
              selectedMonth2={selectedMonth2}
            />
            <TimeAnalysisChart 
              selectedMonth1={selectedMonth1}
              selectedMonth2={selectedMonth2}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SectionHeatmap selectedMonth1={selectedMonth1} />
            <PredictionCard selectedMonth1={selectedMonth1} />
          </div>
          
          <IncidentTable selectedMonth1={selectedMonth1} />
          
          <div className="text-center text-xs text-muted-foreground mt-8 mb-4">
            © 2025 TheftVision Analytics • Powered by AI • All rights reserved
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
