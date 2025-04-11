
import React from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";

type HeaderProps = {
  selectedMonth1: string;
  selectedMonth2: string;
};

export const Header: React.FC<HeaderProps> = ({ selectedMonth1, selectedMonth2 }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Shoplifting Predictive Analysis</h1>
        <p className="text-muted-foreground mt-1">
          Comparing {selectedMonth1} {selectedMonth2 ? `and ${selectedMonth2}` : ""}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
          <Calendar size={16} className="text-primary-purple" />
          <span className="text-sm">April 11, 2025</span>
        </div>
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
          <Clock size={16} className="text-primary-purple" />
          <span className="text-sm">Last updated: 2 hours ago</span>
        </div>
        <div className="flex items-center gap-2 bg-soft-yellow/10 text-soft-yellow px-4 py-2 rounded-lg">
          <AlertCircle size={16} />
          <span className="text-sm">High Alert</span>
        </div>
      </div>
    </div>
  );
};
