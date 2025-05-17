
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const performanceData = [
  { time: '00:00', cpu: 32, memory: 45, requests: 87 },
  { time: '04:00', cpu: 28, memory: 42, requests: 65 },
  { time: '08:00', cpu: 43, memory: 55, requests: 125 },
  { time: '12:00', cpu: 78, memory: 70, requests: 256 },
  { time: '16:00', cpu: 65, memory: 68, requests: 198 },
  { time: '20:00', cpu: 55, memory: 63, requests: 164 },
  { time: '23:59', cpu: 40, memory: 58, requests: 110 },
];

const errorLogs = [
  { 
    id: 1, 
    message: 'Database connection timeout', 
    timestamp: '2023-05-10 14:32:45',
    level: 'critical',
    service: 'payment-processor',
  },
  { 
    id: 2, 
    message: 'Rate limit exceeded for API requests', 
    timestamp: '2023-05-10 12:17:23',
    level: 'warning',
    service: 'api-gateway',
  },
  { 
    id: 3, 
    message: 'Authentication service slow response', 
    timestamp: '2023-05-10 10:05:18',
    level: 'warning',
    service: 'auth-service',
  },
  { 
    id: 4, 
    message: 'Failed blockchain transaction', 
    timestamp: '2023-05-10 09:47:52',
    level: 'critical',
    service: 'blockchain-connector',
  },
];

const SystemMonitoring = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/20">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">System Status</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">Operational</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">API Requests</p>
                <p className="text-2xl font-bold">1,247 / min</p>
              </div>
              <Activity className="h-8 w-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/20">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Active Alerts</p>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">3 warnings</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>24-hour resource utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cpu" stroke="#1E40AF" name="CPU %" />
                  <Line type="monotone" dataKey="memory" stroke="#0D9488" name="Memory %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Request Volume</CardTitle>
            <CardDescription>API requests per 4-hour period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Error Logs</CardTitle>
            <CardDescription>Recent system errors and warnings</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All Logs
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {errorLogs.map((log) => (
              <div key={log.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={log.level === 'critical' ? 'destructive' : 'secondary'}>
                        {log.level}
                      </Badge>
                      <span className="text-sm text-slate-500">{log.service}</span>
                    </div>
                    <p className="mt-2 font-medium">{log.message}</p>
                  </div>
                  <span className="text-sm text-slate-500">{log.timestamp}</span>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Resolve</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SystemMonitoring;
