import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Mail, Share2 } from "lucide-react";
import { PaymentStatus } from '@/types/payment';
import { format } from 'date-fns';

interface DigitalReceiptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: {
    id: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    transactionSignature?: string;
    merchantName: string;
    date: Date;
  };
}

const DigitalReceipt: React.FC<DigitalReceiptProps> = ({
  open,
  onOpenChange,
  paymentData
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // In a production app, we would use a library like html2canvas to generate a PDF
    // For this demo, we'll just create a simple text file
    const receiptText = `
Payment Receipt
--------------
Merchant: ${paymentData.merchantName}
Amount: ${paymentData.amount} ${paymentData.currency}
Date: ${format(paymentData.date, 'PPP')}
Time: ${format(paymentData.date, 'pp')}
Status: ${paymentData.status}
Transaction ID: ${paymentData.transactionSignature || 'N/A'}
Payment ID: ${paymentData.id}
`;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${paymentData.id.substring(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEmailReceipt = () => {
    // In a production app, this would call a backend API to send an email
    // For this demo, we'll just show what it would do
    console.log('Sending receipt to email', paymentData);
    alert('Email functionality would be implemented with backend support');
  };

  const handleShare = async () => {
    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Receipt',
          text: `Receipt for payment of ${paymentData.amount} ${paymentData.currency} to ${paymentData.merchantName}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Sharing is not supported in this browser');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Receipt</DialogTitle>
        </DialogHeader>

        <div 
          ref={receiptRef} 
          className="bg-white dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700 rounded-lg"
        >
          <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">Receipt</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {format(paymentData.date, 'PPP')} at {format(paymentData.date, 'pp')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {paymentData.status === PaymentStatus.COMPLETED ? 'PAID' : paymentData.status}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Merchant</p>
              <p className="font-medium">{paymentData.merchantName}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Amount</p>
              <p className="font-medium text-lg">{paymentData.amount} {paymentData.currency}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Transaction ID</p>
              <p className="font-mono text-xs break-all">{paymentData.transactionSignature || 'N/A'}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Payment ID</p>
              <p className="font-mono text-xs">{paymentData.id}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleEmailReceipt}
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          <Button 
            variant="default" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DigitalReceipt; 