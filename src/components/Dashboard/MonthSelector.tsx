
import React from "react";
import { Button } from "@/components/ui/button";
import { months } from "@/utils/mockData";

type MonthSelectorProps = {
  selectedMonth1: string;
  selectedMonth2: string | null;
  onMonth1Change: (month: string) => void;
  onMonth2Change: (month: string | null) => void;
};

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth1,
  selectedMonth2,
  onMonth1Change,
  onMonth2Change,
}) => {
  return (
    <div className="bg-card rounded-lg p-5 mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-3">Select Months to Compare</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {months.map((month) => (
            <Button
              key={month}
              variant={selectedMonth1 === month ? "default" : "outline"}
              className={`${
                selectedMonth1 === month
                  ? "bg-primary-purple hover:bg-primary-purple/90"
                  : "hover:bg-secondary hover:text-white"
              }`}
              onClick={() => onMonth1Change(month)}
            >
              {month}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-3">Compare With (Optional)</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          <Button
            variant={selectedMonth2 === null ? "default" : "outline"}
            className={`${
              selectedMonth2 === null
                ? "bg-secondary-purple hover:bg-secondary-purple/90"
                : "hover:bg-secondary hover:text-white"
            }`}
            onClick={() => onMonth2Change(null)}
          >
            None
          </Button>
          {months
            .filter((month) => month !== selectedMonth1)
            .map((month) => (
              <Button
                key={month}
                variant={selectedMonth2 === month ? "default" : "outline"}
                className={`${
                  selectedMonth2 === month
                    ? "bg-secondary-purple hover:bg-secondary-purple/90"
                    : "hover:bg-secondary hover:text-white"
                }`}
                onClick={() => onMonth2Change(month)}
              >
                {month}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
