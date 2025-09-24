import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import AdminNav from '../components/AdminNav';
import { Search, Trash2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { ContactAPI } from '@/services/contactmsg';

interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
  createdAt: string;
}

const AdminMessages: React.FC = () => {
  const { admin } = useAdmin();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await ContactAPI.getAll();
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(message => {
    const matchesSearch =
      message.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleMarkAsRead = async (id: string) => {
    try {
      await ContactAPI.updateStatus(id, 'read');
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await ContactAPI.delete(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      setSelectedMessage(null);
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-sm text-gray-600">Manage customer inquiries and support requests</p>
          </div>
          {unreadCount > 0 && <Badge className="bg-red-100 text-red-800">{unreadCount} unread</Badge>}
        </div>

        {/* Search & Status Filter */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as 'all' | 'read' | 'unread')}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  {filteredMessages.map(message => (
    <Card
      key={message.id}
      className={`hover:shadow-lg transition-shadow cursor-pointer p-2 ${message.status === 'unread' ? 'border-l-4 border-orange-500' : ''}`}
      onClick={() => {
        setSelectedMessage(message);
        if (message.status === 'unread') handleMarkAsRead(message.id);
      }}
    >
      <CardContent className="flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            {!message.status || message.status === 'unread' ? <div className="w-2 h-2 bg-orange-500 rounded-full"></div> : null}
            <h3 className="text-lg font-semibold">{message.fullName}</h3>
          </div>
          <h4 className="font-medium text-gray-800 mb-1">{message.subject}</h4>
          <p className="text-gray-600 line-clamp-3">{message.message}</p>
          <div className="mt-2">
            <Badge className={message.status === 'unread' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" /> <span>{message.status}</span>
              </div>
            </Badge>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" onClick={e => e.stopPropagation()}>
            <Eye className="h-4 w-4" /> View
          </Button>
          <Button
            size="sm"
            onClick={e => e.stopPropagation()}
            className="bg-orange-600 hover:bg-orange-700"
            disabled
          >
            Reply
          </Button>
          <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); handleDeleteMessage(message.id); }} className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex justify-between">
              <div>
                <CardTitle>
                  {selectedMessage.subject} {!selectedMessage.status || selectedMessage.status === 'unread' ? <div className="w-2 h-2 bg-orange-500 rounded-full inline-block ml-2"></div> : null}
                </CardTitle>
                <CardDescription>From: {selectedMessage.fullName} ({selectedMessage.email})</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedMessage.phone && <div><span className="font-medium">Phone:</span> {selectedMessage.phone}</div>}
              <div>
                <h4 className="font-medium">Message:</h4>
                <div className="bg-white border rounded-lg p-4">{selectedMessage.message}</div>
              </div>

              <div>
                <h4 className="font-medium">Reply:</h4>
                <Textarea value={replyText} rows={4} disabled className="mb-4" placeholder="Reply disabled" />
                <div className="flex space-x-2">
                  <Button className="bg-orange-600 hover:bg-orange-700" disabled>Reply</Button>
                  <Button variant="secondary" onClick={() => setSelectedMessage(null)}>Close</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
