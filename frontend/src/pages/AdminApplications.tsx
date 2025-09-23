import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import AdminNav from '../components/AdminNav';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const AdminApplications: React.FC = () => {
  const { admin, logout } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for applications
  const applications = [
    {
      id: 1,
      type: 'Interview',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      position: 'Content Creator',
      status: 'pending',
      date: '2024-01-15',
      experience: '5 years',
      portfolio: 'https://johndoe.portfolio.com',
      pitch: 'Passionate about creating engaging content that drives results...',
      availability: '2024-02-01',
      channels: ['YouTube', 'Instagram', 'TikTok'],
      contentTypes: ['Educational', 'Entertainment', 'Lifestyle']
    },
    {
      id: 2,
      type: 'Partnership',
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, CA',
      position: 'Strategic Partner',
      status: 'approved',
      date: '2024-01-14',
      experience: '10 years',
      company: 'Tech Solutions Inc.',
      investment: '$50,000',
      role: 'Technology Integration',
      timeline: '6 months',
      returns: '15% annually'
    },
    {
      id: 3,
      type: 'Interview',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, IL',
      position: 'Marketing Specialist',
      status: 'rejected',
      date: '2024-01-13',
      experience: '3 years',
      pitch: 'Experienced in digital marketing with proven track record...',
      availability: '2024-01-20',
      channels: ['Facebook', 'LinkedIn'],
      contentTypes: ['Educational', 'B2B']
    },
    {
      id: 4,
      type: 'Partnership',
      name: 'Sarah Wilson',
      email: 'sarah@enterprise.com',
      phone: '+1 (555) 321-0987',
      location: 'Miami, FL',
      position: 'Investment Partner',
      status: 'pending',
      date: '2024-01-12',
      experience: '15 years',
      company: 'Wilson Enterprises',
      investment: '$100,000',
      role: 'Strategic Advisory',
      timeline: '12 months',
      returns: '20% annually'
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || app.type.toLowerCase() === filterType;
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Changing application ${applicationId} status to ${newStatus}`);
  };

  const handleViewDetails = (applicationId: number) => {
    // In a real app, this would open a detailed view modal
    console.log(`Viewing details for application ${applicationId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
          <p className="text-sm text-gray-600">Manage interview and partnership applications</p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-orange-500" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Application Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Button className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        {app.type === 'Interview' ? (
                          <FileText className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Users className="h-5 w-5 text-orange-500" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{app.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{app.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{app.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{app.date}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Position:</span> {app.position}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Experience:</span> {app.experience}
                      </div>
                    </div>

                    {/* Application-specific details */}
                    {app.type === 'Interview' && (
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-blue-900 mb-2">Interview Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                          <div><span className="font-medium">Availability:</span> {app.availability}</div>
                          <div><span className="font-medium">Channels:</span> {app.channels?.join(', ')}</div>
                          <div><span className="font-medium">Content Types:</span> {app.contentTypes?.join(', ')}</div>
                          <div><span className="font-medium">Portfolio:</span> 
                            <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                              View Portfolio
                            </a>
                          </div>
                        </div>
                        <p className="text-sm text-blue-800 mt-2">
                          <span className="font-medium">Pitch:</span> {app.pitch}
                        </p>
                      </div>
                    )}

                    {app.type === 'Partnership' && (
                      <div className="bg-orange-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-orange-900 mb-2">Partnership Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-orange-800">
                          <div><span className="font-medium">Company:</span> {app.company}</div>
                          <div><span className="font-medium">Investment:</span> {app.investment}</div>
                          <div><span className="font-medium">Role:</span> {app.role}</div>
                          <div><span className="font-medium">Timeline:</span> {app.timeline}</div>
                          <div><span className="font-medium">Expected Returns:</span> {app.returns}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(app.id)}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Button>
                    
                    {app.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(app.id, 'approved')}
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStatusChange(app.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
