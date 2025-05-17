
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import { ArrowUpRight, CreditCard, DollarSign, LineChart, Users } from 'lucide-react';

const data = [
  { name: 'May 1', value: 2400 },
  { name: 'May 2', value: 1398 },
  { name: 'May 3', value: 9800 },
  { name: 'May 4', value: 3908 },
  { name: 'May 5', value: 4800 },
  { name: 'May 6', value: 3800 },
  { name: 'May 7', value: 4300 },
];

const recentTransactions = [
  { id: 1, customer: 'Alex Johnson', amount: '$432.00', status: 'completed', date: '2023-05-07 12:34' },
  { id: 2, customer: 'Sarah Williams', amount: '$89.99', status: 'completed', date: '2023-05-07 10:15' },
  { id: 3, customer: 'Michael Brown', amount: '$129.50', status: 'processing', date: '2023-05-07 09:22' },
  { id: 4, customer: 'Emily Davis', amount: '$57.00', status: 'completed', date: '2023-05-06 18:45' },
  { id: 5, customer: 'David Miller', amount: '$299.99', status: 'failed', date: '2023-05-06 16:12' },
];

const DashboardDemo = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Sales"
          value="$24,789.00"
          trend={12.5}
          description="vs. previous month"
          icon={<DollarSign className="h-4 w-4" />}
          valueClassName="text-primary-600"
        />
        <StatCard
          title="Transactions"
          value="1,487"
          trend={3.2}
          description="vs. previous month"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          title="Active Users"
          value="326"
          trend={8.1}
          description="vs. previous month"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Conversion Rate"
          value="3.8%"
          trend={-1.3}
          description="vs. previous month"
          icon={<LineChart className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Daily revenue for the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stablecoin Distribution</CardTitle>
                <CardDescription>Payment method breakdown</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {[
                    { name: 'USDC', percentage: 68, color: 'bg-primary-500' },
                    { name: 'USDT', percentage: 21, color: 'bg-secondary-500' },
                    { name: 'DAI', percentage: 8, color: 'bg-accent-500' },
                    { name: 'Other', percentage: 3, color: 'bg-slate-400' },
                  ].map((item) => (
                    <div key={item.name} className="px-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest payment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b">
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-3 text-sm">{tx.customer}</td>
                        <td className="px-4 py-3 text-sm font-mono">{tx.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            tx.status === 'completed' 
                              ? 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-500'
                              : tx.status === 'processing'
                              ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/20 dark:text-accent-500'
                              : 'bg-error-100 text-error-700 dark:bg-error-900/20 dark:text-error-500'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">{tx.date}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center text-xs font-medium">
                            Details
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Detailed analytics will appear here</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-slate-500">
              Analytics content would be displayed here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Your custom reports will appear here</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-slate-500">
              Reports content would be displayed here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Your recent notifications will appear here</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-slate-500">
              Notifications content would be displayed here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardDemo;
