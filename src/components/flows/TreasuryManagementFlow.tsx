
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  PiggyBank, TrendingUp, Wallet, CreditCard, ChevronRight, Coins, ArrowUpRight
} from 'lucide-react';

const yieldData = [
  { day: 'May 1', apy: 3.2 },
  { day: 'May 2', apy: 3.5 },
  { day: 'May 3', apy: 3.4 },
  { day: 'May 4', apy: 3.5 },
  { day: 'May 5', apy: 3.8 },
  { day: 'May 6', apy: 4.1 },
  { day: 'May 7', apy: 4.2 },
];

const TreasuryManagementFlow = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('balanced');
  
  const strategies = [
    { 
      id: 'conservative', 
      name: 'Conservative', 
      description: 'Lower risk, stable returns',
      targetApy: '3.2%',
      risk: 'Low',
      yieldSource: 'Liquid staking, overcollateralized lending',
    },
    { 
      id: 'balanced', 
      name: 'Balanced', 
      description: 'Medium risk, enhanced returns',
      targetApy: '4.8%',
      risk: 'Medium',
      yieldSource: 'Staking, lending, and liquid vaults',
    },
    { 
      id: 'aggressive', 
      name: 'Growth', 
      description: 'Higher risk, maximized returns',
      targetApy: '7.5%',
      risk: 'High',
      yieldSource: 'Staking, liquidity providing, and delta-neutral strategies',
    },
  ];

  const balances = [
    { coin: 'USDC', amount: 24896.43, allocation: 65, icon: '💲' },
    { coin: 'USDT', amount: 8574.21, allocation: 22, icon: '💵' },
    { coin: 'PYUSD', amount: 3842.75, allocation: 10, icon: '🔵' },
    { coin: 'USD*', amount: 1154.82, allocation: 3, icon: '⭐' },
  ];

  const totalBalance = balances.reduce((sum, b) => sum + b.amount, 0);
  const totalYield = 1284.73;
  const currentStrategy = strategies.find(s => s.id === selectedStrategy);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Balance</p>
                <p className="text-2xl font-bold font-mono">${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <Wallet className="h-8 w-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Earned Yield (YTD)</p>
                <p className="text-2xl font-bold font-mono text-success-600 dark:text-success-400">${totalYield.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success-600 dark:text-success-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Current Strategy</p>
                <p className="text-2xl font-bold">{currentStrategy?.name}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-primary-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Yield Performance</CardTitle>
            <CardDescription>7-day APY trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yieldData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis 
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                    domain={[2, 5]}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'APY']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="apy" 
                    stroke="#0D9488" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stablecoin Allocation</CardTitle>
            <CardDescription>Current treasury breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {balances.map((coin) => (
                <div key={coin.coin}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className="mr-2">{coin.icon}</span>
                      <span className="text-sm font-medium">{coin.coin}</span>
                    </div>
                    <span className="text-sm font-medium">{coin.allocation}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={coin.allocation} className="h-2" />
                    <span className="text-xs font-mono">${coin.amount.toLocaleString('en-US', {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yield Strategy</CardTitle>
          <CardDescription>Configure how your treasury generates yield</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedStrategy === strategy.id 
                    ? 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-700'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
                onClick={() => setSelectedStrategy(strategy.id)}
              >
                <h3 className="font-semibold flex items-center">
                  {strategy.id === 'conservative' && <Coins className="h-4 w-4 mr-2 text-primary-600" />}
                  {strategy.id === 'balanced' && <PiggyBank className="h-4 w-4 mr-2 text-primary-600" />}
                  {strategy.id === 'aggressive' && <TrendingUp className="h-4 w-4 mr-2 text-primary-600" />}
                  {strategy.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {strategy.description}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-slate-500">Target APY</p>
                    <p className="font-medium">{strategy.targetApy}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Risk Level</p>
                    <p className="font-medium">{strategy.risk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Strategy Details: {currentStrategy?.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              {
                selectedStrategy === 'conservative' 
                  ? 'This strategy prioritizes capital preservation while still generating yield. Your funds are allocated to lower-risk opportunities.' 
                : selectedStrategy === 'balanced'
                  ? 'A balanced approach that manages risk while seeking enhanced returns. Ideal for most merchants who want steady growth.'
                : 'An aggressive strategy that prioritizes maximum yield. Suitable for merchants with higher risk tolerance.'
              }
            </p>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Yield Sources</span>
                <span>{currentStrategy?.yieldSource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rebalance Schedule</span>
                <span>Weekly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Withdrawal Notice</span>
                <span>24 hours</span>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                View Detailed Analysis
              </Button>
              <Button size="sm">
                Apply Strategy
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreasuryManagementFlow;
