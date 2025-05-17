
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Shield, Activity, AlertTriangle, Search, CheckCircle, XCircle, 
  UserCheck, UserX, LayoutDashboard, Eye
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import UserManagement from './admin/UserManagement';
import MerchantManagement from './admin/MerchantManagement';
import SystemMonitoring from './admin/SystemMonitoring';

const AdminPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search users, merchants, or transactions..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Security Audit
        </Button>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="merchants">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Merchant Management
          </TabsTrigger>
          <TabsTrigger value="monitoring">
            <Activity className="mr-2 h-4 w-4" />
            System Monitoring
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <UserManagement searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="merchants" className="space-y-4">
          <MerchantManagement searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="monitoring" className="space-y-4">
          <SystemMonitoring />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
