import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import AdminNav from '../components/AdminNav';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { ContactAPI } from '@/services/contacirug';
import { InterviewApplicationsAPI, PartnershipApplicationsAPI } from '@/services/application';

interface Application {
  id: string;
  type: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  position: string;
}

interface Message {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const { admin } = useAdmin();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalMessages: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partnershipApps: Application[] = await PartnershipApplicationsAPI.getAll();
        const interviewApps: Application[] = await InterviewApplicationsAPI.getAll();
        const apps: Application[] = [...partnershipApps, ...interviewApps];
        const msgs: Message[] = await ContactAPI.getAll();

        setApplications(apps);
        setMessages(msgs);

        setStats({
          totalApplications: apps.length,
          pendingApplications: apps.filter(a => a.status === 'pending').length,
          approvedApplications: apps.filter(a => a.status === 'approved').length,
          rejectedApplications: apps.filter(a => a.status === 'rejected').length,
          totalProjects: 0,
          activeProjects: 0,
          totalMessages: msgs.length,
          unreadMessages: msgs.filter(m => m.status === 'unread').length
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
              <p className="text-xs text-gray-500">Applications submitted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</div>
              <p className="text-xs text-gray-500">Requires review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.activeProjects}</div>
              <p className="text-xs text-gray-500">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.unreadMessages}</div>
              <p className="text-xs text-gray-500">New messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-orange-500" />
                <span>Recent Applications</span>
              </CardTitle>
              <CardDescription>Latest application submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{app.name}</h4>
                        <Badge className={getStatusColor(app.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{app.email}</p>
                      <p className="text-xs text-gray-500">{app.type} - {app.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{app.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/applications')}>
                  View All Applications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <span>Recent Messages</span>
              </CardTitle>
              <CardDescription>Latest contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className={`p-4 rounded-lg ${msg.status === 'read' ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{msg.fullName}</h4>
                      {msg.status === 'unread' && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{msg.subject}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{msg.createdAt}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/admin/messages')}>
                  View All Messages
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
