
import React from "react";
import { Home, BarChart2, Map, Clock, Calendar, AlertTriangle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors",
        active
          ? "bg-primary-purple text-white"
          : "text-gray-400 hover:bg-secondary/50 hover:text-white"
      )}
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-dark border-r border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center">
          <AlertTriangle size={20} className="mr-2 text-primary-purple" />
          TheftVision
        </h1>
      </div>
      <div className="flex-1 px-3 py-4 space-y-1">
        <SidebarItem icon={Home} label="Dashboard" active />
        <SidebarItem icon={BarChart2} label="Analytics" />
        <SidebarItem icon={Map} label="Store Map" />
        <SidebarItem icon={Clock} label="Time Analysis" />
        <SidebarItem icon={Calendar} label="Scheduling" />
        <SidebarItem icon={Settings} label="Settings" />
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-purple flex items-center justify-center text-white font-semibold">
            SM
          </div>
          <div>
            <p className="text-sm font-medium text-white">Store Manager</p>
            <p className="text-xs text-gray-400">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};
