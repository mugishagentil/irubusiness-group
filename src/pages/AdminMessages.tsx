import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import AdminNav from '../components/AdminNav';
import { 
  Search, 
  Mail, 
  Reply, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  User,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  date: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'partnership' | 'support' | 'complaint' | 'feedback';
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  location?: string;
  response?: string;
  responseDate?: string;
}

const AdminMessages: React.FC = () => {
  const { admin, logout } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  // Mock data for contact messages
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc.',
      subject: 'Partnership Inquiry',
      message: 'Hello, I am interested in becoming a strategic partner with IRU Business Group. We are a growing tech company with expertise in AI and machine learning. Could you please provide more information about partnership opportunities and investment requirements?',
      date: '2024-01-15',
      time: '10:30 AM',
      read: false,
      priority: 'high',
      category: 'partnership',
      status: 'new',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'David Brown',
      email: 'david@company.com',
      phone: '+1 (555) 987-6543',
      subject: 'Service Question',
      message: 'I would like to know more about your content creation services. Do you offer video production for social media platforms? What are your rates and turnaround times?',
      date: '2024-01-14',
      time: '2:15 PM',
      read: true,
      priority: 'medium',
      category: 'general',
      status: 'in-progress',
      location: 'New York, NY',
      response: 'Thank you for your inquiry. Yes, we do offer video production services for social media. I will send you our service catalog and pricing information shortly.',
      responseDate: '2024-01-14'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      subject: 'Technical Support',
      message: 'I am having issues accessing the interview application form. The form keeps showing an error when I try to submit my application. Can you please help me resolve this issue?',
      date: '2024-01-13',
      time: '9:45 AM',
      read: true,
      priority: 'high',
      category: 'support',
      status: 'resolved',
      location: 'Chicago, IL',
      response: 'I have identified and fixed the issue with the interview application form. The problem was related to form validation. Please try submitting your application again. If you continue to experience issues, please let me know.',
      responseDate: '2024-01-13'
    },
    {
      id: 4,
      name: 'Lisa Anderson',
      email: 'lisa@enterprise.com',
      company: 'Anderson Enterprises',
      subject: 'Feedback on Services',
      message: 'I wanted to provide feedback on the excellent service we received from your team. The content creation project exceeded our expectations, and we would definitely work with IRU Business Group again in the future.',
      date: '2024-01-12',
      time: '4:20 PM',
      read: true,
      priority: 'low',
      category: 'feedback',
      status: 'closed',
      location: 'Miami, FL',
      response: 'Thank you so much for your positive feedback! We are thrilled to hear that our services exceeded your expectations. We look forward to working with Anderson Enterprises again in the future.',
      responseDate: '2024-01-12'
    },
    {
      id: 5,
      name: 'Robert Chen',
      email: 'robert@startup.com',
      phone: '+1 (555) 321-0987',
      subject: 'Complaint - Delayed Response',
      message: 'I submitted a partnership application two weeks ago and have not received any response. This is unacceptable for a professional organization. I expect a prompt response to my application.',
      date: '2024-01-11',
      time: '11:30 AM',
      read: false,
      priority: 'high',
      category: 'complaint',
      status: 'new',
      location: 'Seattle, WA'
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || message.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'partnership': return 'bg-purple-100 text-purple-800';
      case 'support': return 'bg-blue-100 text-blue-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'feedback': return 'bg-orange-100 text-orange-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const handleStatusChange = (messageId: number, newStatus: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: newStatus as ContactMessage['status'] } : msg
    ));
  };

  const handleReply = (messageId: number) => {
    if (replyText.trim()) {
      const now = new Date();
      const responseDate = now.toISOString().split('T')[0];
      
      setMessages(messages.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              response: replyText,
              responseDate: responseDate,
              status: 'resolved' as ContactMessage['status']
            } 
          : msg
      ));
      setReplyText('');
      setSelectedMessage(null);
    }
  };

  const handleDeleteMessage = (messageId: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== messageId));
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;
  const newCount = messages.filter(msg => msg.status === 'new').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-sm text-gray-600">Manage customer inquiries and support requests</p>
          </div>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-800">
                {unreadCount} unread
              </Badge>
            )}
            {newCount > 0 && (
              <Badge className="bg-blue-100 text-blue-800">
                {newCount} new
              </Badge>
            )}
          </div>
        </div>
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-orange-500" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                !message.read ? 'border-l-4 border-l-orange-500' : ''
              }`}
              onClick={() => {
                setSelectedMessage(message);
                if (!message.read) {
                  handleMarkAsRead(message.id);
                }
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        {!message.read && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                        <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                        {message.priority === 'high' && <Star className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(message.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(message.status)}
                            <span className="capitalize">{message.status.replace('-', ' ')}</span>
                          </div>
                        </Badge>
                        <Badge className={getPriorityColor(message.priority)}>
                          <span className="capitalize">{message.priority}</span>
                        </Badge>
                        <Badge className={getCategoryColor(message.category)}>
                          <span className="capitalize">{message.category}</span>
                        </Badge>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-800 mb-2">{message.subject}</h4>
                    <p className="text-gray-600 line-clamp-2 mb-4">{message.message}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{message.email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{message.phone}</span>
                        </div>
                      )}
                      {message.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{message.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{message.date} at {message.time}</span>
                      </div>
                    </div>

                    {message.response && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">Response</span>
                          <span className="text-xs text-orange-600">({message.responseDate})</span>
                        </div>
                        <p className="text-sm text-orange-700">{message.response}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(message);
                        if (!message.read) {
                          handleMarkAsRead(message.id);
                        }
                      }}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                    
                    {message.status !== 'closed' && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMessage(message);
                        }}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMessage(message.id);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{selectedMessage.subject}</span>
                    {!selectedMessage.read && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                  </CardTitle>
                  <CardDescription>
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {/* Message Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="font-medium text-gray-700">Date:</span> {selectedMessage.date} at {selectedMessage.time}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Priority:</span> 
                      <Badge className={`ml-2 ${getPriorityColor(selectedMessage.priority)}`}>
                        {selectedMessage.priority}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Category:</span> 
                      <Badge className={`ml-2 ${getCategoryColor(selectedMessage.category)}`}>
                        {selectedMessage.category}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span> 
                      <Badge className={`ml-2 ${getStatusColor(selectedMessage.status)}`}>
                        {selectedMessage.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  
                  {selectedMessage.company && (
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Company:</span> {selectedMessage.company}
                    </div>
                  )}
                  
                  {selectedMessage.phone && (
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Phone:</span> {selectedMessage.phone}
                    </div>
                  )}
                  
                  {selectedMessage.location && (
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Location:</span> {selectedMessage.location}
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Message:</h4>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Existing Response */}
                {selectedMessage.response && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Response:</h4>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">
                          Responded on {selectedMessage.responseDate}
                        </span>
                      </div>
                      <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.response}</p>
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                {selectedMessage.status !== 'closed' && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Reply:</h4>
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response here..."
                      rows={4}
                      className="mb-4"
                    />
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleReply(selectedMessage.id)}
                        disabled={!replyText.trim()}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Send Reply
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(selectedMessage.id, 'in-progress')}
                      >
                        Mark as In Progress
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(selectedMessage.id, 'closed')}
                      >
                        Close Message
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
