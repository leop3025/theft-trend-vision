
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
  const data = monthlyData[selectedMonth1];

  if (!data) return null;

  // Get only the first 6 incidents for display
  const incidents = data.incidents.slice(0, 6);

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
