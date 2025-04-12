
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertCircle, 
  ShoppingCart 
} from "lucide-react";

// Mock product data
const mockProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", currentSales: 87, previousSales: 62, currentStock: 15, minStockLevel: 20 },
  { id: 2, name: "Fitness Tracker", category: "Electronics", currentSales: 54, previousSales: 43, currentStock: 8, minStockLevel: 15 },
  { id: 3, name: "Organic Coffee Beans", category: "Food", currentSales: 128, previousSales: 104, currentStock: 45, minStockLevel: 30 },
  { id: 4, name: "Yoga Mat", category: "Sports", currentSales: 42, previousSales: 38, currentStock: 22, minStockLevel: 25 },
  { id: 5, name: "Smart Water Bottle", category: "Health", currentSales: 76, previousSales: 52, currentStock: 5, minStockLevel: 20 },
  { id: 6, name: "Bluetooth Speaker", category: "Electronics", currentSales: 63, previousSales: 58, currentStock: 18, minStockLevel: 15 },
  { id: 7, name: "Plant-Based Protein", category: "Food", currentSales: 92, previousSales: 67, currentStock: 12, minStockLevel: 25 },
  { id: 8, name: "Stainless Steel Water Bottle", category: "Kitchen", currentSales: 85, previousSales: 72, currentStock: 28, minStockLevel: 30 },
  { id: 9, name: "Wireless Charger", category: "Electronics", currentSales: 108, previousSales: 84, currentStock: 7, minStockLevel: 25 },
  { id: 10, name: "Organic Tea Set", category: "Food", currentSales: 38, previousSales: 45, currentStock: 32, minStockLevel: 20 },
];

// Available months for selection
const availableMonths = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const InventoryForecasting: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(availableMonths[3]); // April
  const [previousMonth, setPreviousMonth] = useState(availableMonths[2]); // March
  const [comparing, setComparing] = useState(false);
  
  // Calculate restocking suggestions - products where current sales are high and inventory is low
  const calculateRestockingSuggestions = () => {
    return mockProducts
      .map(product => ({
        ...product,
        needsRestock: product.currentStock < product.minStockLevel,
        salesGrowth: ((product.currentSales - product.previousSales) / product.previousSales) * 100,
        restockUrgency: (product.currentSales / product.currentStock) * (product.currentStock < product.minStockLevel ? 2 : 1)
      }))
      .sort((a, b) => b.restockUrgency - a.restockUrgency)
      .filter(product => product.needsRestock)
      .slice(0, 5);
  };

  const restockingSuggestions = calculateRestockingSuggestions();

  const handleCompare = () => {
    setComparing(true);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background scrollbar-hide">
        <div className="container mx-auto py-6 px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Inventory Forecasting</h1>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="w-full sm:w-48">
                <Select value={previousMonth} onValueChange={setPreviousMonth}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Previous Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMonths.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-48">
                <Select value={currentMonth} onValueChange={setCurrentMonth}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Current Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMonths.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleCompare}
                className="w-full sm:w-auto"
              >
                Compare
              </Button>
            </div>
          </div>
          
          {comparing && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Products</p>
                        <h3 className="text-2xl font-bold text-white">{mockProducts.length}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-purple/10 text-primary-purple">
                        <Package size={20} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Low Stock Items</p>
                        <h3 className="text-2xl font-bold text-white">{restockingSuggestions.length}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-purple/10 text-primary-purple">
                        <AlertCircle size={20} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Sales Growth</p>
                        <h3 className="text-2xl font-bold text-white">
                          {Math.round(
                            (mockProducts.reduce((acc, p) => acc + p.currentSales, 0) / 
                            mockProducts.reduce((acc, p) => acc + p.previousSales, 0) - 1) * 100
                          )}%
                        </h3>
                      </div>
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-purple/10 text-primary-purple">
                        <TrendingUp size={20} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Restock Value</p>
                        <h3 className="text-2xl font-bold text-white">
                        ₹{restockingSuggestions.reduce(
                            (acc, item) => acc + ((item.minStockLevel - item.currentStock) * 20), 0
                          ).toLocaleString()}
                        </h3>
                      </div>
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary-purple/10 text-primary-purple">
                        <ShoppingCart size={20} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="bg-card border-border col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Product Sales Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">{previousMonth} Sales</TableHead>
                            <TableHead className="text-right">{currentMonth} Sales</TableHead>
                            <TableHead className="text-right">Growth</TableHead>
                            <TableHead className="text-right">Current Stock</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockProducts.map((product) => {
                            const growth = ((product.currentSales - product.previousSales) / product.previousSales) * 100;
                            const needsRestock = product.currentStock < product.minStockLevel;
                            
                            return (
                              <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="text-right">{product.previousSales}</TableCell>
                                <TableCell className="text-right">{product.currentSales}</TableCell>
                                <TableCell className="text-right">
                                  <span className={growth >= 0 ? "text-green-500" : "text-red-500"}>
                                    {growth.toFixed(1)}%
                                    {growth >= 0 ? <TrendingUp className="inline ml-1" size={14} /> : <TrendingDown className="inline ml-1" size={14} />}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">{product.currentStock}</TableCell>
                                <TableCell>
                                  {needsRestock ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                      Restock
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                      In Stock
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Restocking Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {restockingSuggestions.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                          <div>
                            <p className="font-medium text-white">{product.name}</p>
                            <div className="flex items-center mt-1">
                              <p className="text-xs text-muted-foreground">Current Stock: <span className="text-red-400">{product.currentStock}</span></p>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <p className="text-xs text-muted-foreground">Min Level: {product.minStockLevel}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">
                              Order: {product.minStockLevel - product.currentStock}
                            </p>
                            <p className="text-xs text-primary">
                              {product.salesGrowth > 0 ? `+${product.salesGrowth.toFixed(1)}%` : `${product.salesGrowth.toFixed(1)}%`} sales
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
          
          {!comparing && (
            <div className="flex items-center justify-center h-64 bg-card border-border rounded-lg">
              <div className="text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium text-white">Select months and click Compare</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a previous month and current month to compare inventory data
                </p>
              </div>
            </div>
          )}
          
          <div className="text-center text-xs text-muted-foreground mt-8 mb-4">
            © 2025 TheftVision Analytics • Powered by AI • All rights reserved
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryForecasting;
