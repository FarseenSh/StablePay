
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, UserCheck, UserX } from 'lucide-react';

interface UserManagementProps {
  searchQuery: string;
}

const users = [
  { 
    id: 1, 
    name: 'Alexander Johnson', 
    email: 'alex@example.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2023-05-10 09:23 AM',
  },
  { 
    id: 2, 
    name: 'Samantha Williams', 
    email: 'sam@example.com',
    role: 'Support',
    status: 'active',
    lastLogin: '2023-05-09 03:45 PM',
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael@example.com',
    role: 'Analyst',
    status: 'inactive',
    lastLogin: '2023-04-28 11:17 AM',
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily@example.com',
    role: 'Support',
    status: 'active',
    lastLogin: '2023-05-10 10:05 AM',
  },
  { 
    id: 5, 
    name: 'David Miller', 
    email: 'david@example.com',
    role: 'Administrator',
    status: 'suspended',
    lastLogin: '2023-03-15 02:30 PM',
  },
];

const UserManagement: React.FC<UserManagementProps> = ({ searchQuery }) => {
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={
                        user.status === 'active' ? 'default' : 
                        user.status === 'inactive' ? 'secondary' : 
                        'destructive'
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <UserX className="h-4 w-4" />
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
            <CardTitle>Permission Groups</CardTitle>
            <CardDescription>Manage access control groups</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <div>
                  <p className="font-medium">Administrators</p>
                  <p className="text-xs text-slate-500">Full system access</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </li>
              <li className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <div>
                  <p className="font-medium">Support Staff</p>
                  <p className="text-xs text-slate-500">Customer service tools access</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </li>
              <li className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <div>
                  <p className="font-medium">Analysts</p>
                  <p className="text-xs text-slate-500">Report viewing and export</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>Recent user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <p className="text-sm font-medium">Alexander Johnson updated user permissions</p>
                <p className="text-xs text-slate-500">Today at 10:23 AM</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <p className="text-sm font-medium">Samantha Williams reset password for Emily Davis</p>
                <p className="text-xs text-slate-500">Yesterday at 3:45 PM</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <p className="text-sm font-medium">System locked out David Miller after 5 failed attempts</p>
                <p className="text-xs text-slate-500">Mar 15 at 2:30 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserManagement;
