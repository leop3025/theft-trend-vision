
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShopliftingIncident, monthlyData } from "@/utils/mockData";

type IncidentTableProps = {
  selectedMonth1: string;
};

export const IncidentTable: React.FC<IncidentTableProps> = ({ selectedMonth1 }) => {
  // Use a default month if the selected month data is not available
  const data = monthlyData[selectedMonth1] || monthlyData["April"];

  // Add console log to debug data issues
  console.log("IncidentTable data for month:", selectedMonth1, data);

  // Ensure we have data to display
  if (!data) {
    console.error(`No data available for month: ${selectedMonth1}`);
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Recent Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-muted-foreground">
            No incident data available for the selected month.
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get only the first 6 incidents for display, ensuring incidents array exists
  const incidents = data.incidents ? data.incidents.slice(0, 6) : [];

  if (incidents.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Recent Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-muted-foreground">
            No incidents found for the selected month.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell className="font-medium">{incident.date}</TableCell>
                <TableCell>{incident.time}</TableCell>
                <TableCell>{incident.section}</TableCell>
                <TableCell>${incident.itemValue}</TableCell>
                <TableCell>
                  {incident.recovered ? (
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">
                      Recovered
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/30">
                      Lost
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-center">
          <a 
            href="#" 
            className="text-sm text-primary-purple hover:text-primary-purple/80 inline-block"
          >
            View All {data.totalIncidents} Incidents
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
