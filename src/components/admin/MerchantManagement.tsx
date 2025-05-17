
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, ShieldCheck, ShieldX } from 'lucide-react';

interface MerchantManagementProps {
  searchQuery: string;
}

const merchants = [
  { 
    id: 1, 
    name: 'TechNova Solutions', 
    contactEmail: 'support@technova.com',
    status: 'verified',
    transactionVolume: '$143,582.24',
    onboardedDate: '2023-01-15',
  },
  { 
    id: 2, 
    name: 'ArtistryHub', 
    contactEmail: 'contact@artistryhub.io',
    status: 'pending',
    transactionVolume: '$0.00',
    onboardedDate: '2023-05-08',
  },
  { 
    id: 3, 
    name: 'GameVerse Studios', 
    contactEmail: 'payments@gameverse.com',
    status: 'verified',
    transactionVolume: '$87,291.45',
    onboardedDate: '2023-02-20',
  },
  { 
    id: 4, 
    name: 'CryptoCollectibles', 
    contactEmail: 'hello@cryptocollectibles.com',
    status: 'restricted',
    transactionVolume: '$12,487.30',
    onboardedDate: '2023-03-05',
  },
  { 
    id: 5, 
    name: 'DeFi Marketplace', 
    contactEmail: 'admin@defimarketplace.finance',
    status: 'verified',
    transactionVolume: '$452,873.91',
    onboardedDate: '2022-11-30',
  },
];

const MerchantManagement: React.FC<MerchantManagementProps> = ({ searchQuery }) => {
  const filteredMerchants = merchants.filter(merchant => 
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    merchant.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    merchant.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Merchant Management</CardTitle>
          <CardDescription>Approve and manage merchant accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Merchant Name</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction Volume</TableHead>
                  <TableHead>Onboarded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMerchants.map((merchant) => (
                  <TableRow key={merchant.id}>
                    <TableCell className="font-medium">{merchant.name}</TableCell>
                    <TableCell>{merchant.contactEmail}</TableCell>
                    <TableCell>
                      <Badge variant={
                        merchant.status === 'verified' ? 'default' : 
                        merchant.status === 'pending' ? 'secondary' : 
                        'destructive'
                      }>
                        {merchant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{merchant.transactionVolume}</TableCell>
                    <TableCell className="text-slate-500">{merchant.onboardedDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ShieldCheck className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ShieldX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Approval Workflow</CardTitle>
            <CardDescription>Pending merchant applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">ArtistryHub</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Applied: May 8, 2023</p>
                    <div className="mt-2 text-sm">
                      <p className="text-slate-600 dark:text-slate-300">
                        NFT marketplace for digital artists
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="mt-4 flex gap-2 justify-end">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm">
                    <Check className="mr-1 h-4 w-4" /> Approve
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">MetaVerse Rentals</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Applied: May 5, 2023</p>
                    <div className="mt-2 text-sm">
                      <p className="text-slate-600 dark:text-slate-300">
                        Virtual real estate rental platform
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Pending</Badge>
                </div>
                <div className="mt-4 flex gap-2 justify-end">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm">
                    <Check className="mr-1 h-4 w-4" /> Approve
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Support Tools</CardTitle>
            <CardDescription>Merchant assistance options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Override Security Lock
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Merchant Dashboard
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShieldX className="mr-2 h-4 w-4" />
                Set Risk Level
              </Button>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium text-sm mb-2">Common Support Actions</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                  <span>Reset API Keys</span>
                  <Button size="sm" variant="ghost">Run</Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                  <span>Reset 2FA</span>
                  <Button size="sm" variant="ghost">Run</Button>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                  <span>Clear Rate Limits</span>
                  <Button size="sm" variant="ghost">Run</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MerchantManagement;
