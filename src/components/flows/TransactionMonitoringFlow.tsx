
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, Eye, ChevronDown, ChevronUp, Filter, Search, FileText, CheckCircle, Clock, XCircle
} from 'lucide-react';

interface Transaction {
  id: string;
  customer: string;
  amount: string;
  stablecoin: string;
  status: 'completed' | 'processing' | 'failed';
  date: string;
  details?: {
    txHash: string;
    wallet: string;
    fee: string;
    memo?: string;
  };
}

const transactions: Transaction[] = [
  { 
    id: 'tx-123456', 
    customer: 'Alex Johnson', 
    amount: '$432.00', 
    stablecoin: 'USDC',
    status: 'completed', 
    date: '2023-05-07 12:34',
    details: {
      txHash: '5Gn...8fA3',
      wallet: '7XYs...2Wqm',
      fee: '0.000005 SOL',
      memo: 'Order #12345',
    }
  },
  { 
    id: 'tx-123457', 
    customer: 'Sarah Williams', 
    amount: '$89.99', 
    stablecoin: 'USDT',
    status: 'completed', 
    date: '2023-05-07 10:15' 
  },
  { 
    id: 'tx-123458', 
    customer: 'Michael Brown', 
    amount: '$129.50', 
    stablecoin: 'PYUSD',
    status: 'processing', 
    date: '2023-05-07 09:22' 
  },
  { 
    id: 'tx-123459', 
    customer: 'Emily Davis', 
    amount: '$57.00', 
    stablecoin: 'USDC',
    status: 'completed', 
    date: '2023-05-06 18:45' 
  },
  { 
    id: 'tx-123460', 
    customer: 'David Miller', 
    amount: '$299.99', 
    stablecoin: 'USD*',
    status: 'failed', 
    date: '2023-05-06 16:12',
    details: {
      txHash: '3Ft...9xR2',
      wallet: '8ZYp...4Rmq',
      fee: '0.000005 SOL',
      memo: 'Order #67890',
    }
  },
];

const TransactionMonitoringFlow = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const toggleTransaction = (txId: string) => {
    if (expandedTransaction === txId) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(txId);
    }
  };

  const viewTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.amount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-error-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Monitor and manage your payments</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search transactions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-3">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className="p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    onClick={() => toggleTransaction(tx.id)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {statusIcon(tx.status)}
                      </div>
                      <div>
                        <p className="font-medium">{tx.customer}</p>
                        <div className="flex items-center text-xs text-slate-500">
                          <span className="mr-2">{tx.id}</span>
                          <span>{tx.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-3">
                        <p className="font-mono font-medium">{tx.amount}</p>
                        <p className="text-xs text-slate-500">{tx.stablecoin}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                        {expandedTransaction === tx.id ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  </div>
                  
                  {expandedTransaction === tx.id && (
                    <div className="p-3 border-t bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500">Status</span>
                        <Badge variant={
                          tx.status === 'completed' ? 'default' : 
                          tx.status === 'processing' ? 'secondary' : 
                          'destructive'
                        }>
                          {tx.status}
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => viewTransactionDetails(tx)}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <FileText className="mr-1 h-4 w-4" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>
              {selectedTransaction ? `${selectedTransaction.id}` : 'Select a transaction to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTransaction ? (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <h4 className="font-medium text-sm mb-3">Payment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Customer</span>
                      <span>{selectedTransaction.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount</span>
                      <span className="font-mono">{selectedTransaction.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Stablecoin</span>
                      <span>{selectedTransaction.stablecoin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date/Time</span>
                      <span>{selectedTransaction.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status</span>
                      <Badge variant={
                        selectedTransaction.status === 'completed' ? 'default' : 
                        selectedTransaction.status === 'processing' ? 'secondary' : 
                        'destructive'
                      }>
                        {selectedTransaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {selectedTransaction.details && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <h4 className="font-medium text-sm mb-3">Transaction Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Hash</span>
                        <span className="font-mono">{selectedTransaction.details.txHash}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Wallet</span>
                        <span className="font-mono">{selectedTransaction.details.wallet}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Network Fee</span>
                        <span>{selectedTransaction.details.fee}</span>
                      </div>
                      {selectedTransaction.details.memo && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Memo</span>
                          <span>{selectedTransaction.details.memo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between pt-3">
                  <Button variant="outline" size="sm">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    View on Explorer
                  </Button>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Receipt
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-[230px]">
                <Eye className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-2" />
                <p className="text-slate-500">Select a transaction from the list to see details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionMonitoringFlow;
