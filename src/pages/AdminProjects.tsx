import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import AdminNav from '../components/AdminNav';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  budget: number;
  startDate: string;
  endDate: string;
  team: string[];
  progress: number;
  category: string;
  client: string;
  tags: string[];
  location?: string;
  image?: string;
  impact?: string;
  completionDate?: string;
}

const AdminProjects: React.FC = () => {
  const { admin, logout } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    budget: 0,
    startDate: '',
    endDate: '',
    team: [],
    progress: 0,
    category: '',
    client: '',
    tags: []
  });

  // Mock data for projects - matching the structure from Projects page
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Rwanda Healthcare Digitalization',
      description: 'Comprehensive digital transformation of healthcare services across Rwanda. This project aims to modernize healthcare infrastructure and improve patient care through technology.',
      status: 'active',
      priority: 'high',
      budget: 500000,
      startDate: '2023-01-15',
      endDate: '2024-06-30',
      team: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'],
      progress: 75,
      category: 'Digital Health',
      client: 'Ministry of Health Rwanda',
      tags: ['Healthcare', 'Digital Transformation', 'Rwanda', 'Infrastructure'],
      location: 'Kigali, Rwanda',
      image: '/Kigali.png',
      impact: 'Serving 12M+ citizens across Rwanda'
    },
    {
      id: 2,
      title: 'IruCare Mobile Platform',
      description: 'Mobile health platform connecting patients with healthcare providers across multiple countries. Enabling remote consultations and health monitoring.',
      status: 'active',
      priority: 'high',
      budget: 750000,
      startDate: '2023-03-01',
      endDate: '2024-12-31',
      team: ['Alex Chen', 'Maria Garcia', 'Tom Wilson', 'Lisa Anderson'],
      progress: 60,
      category: 'Mobile Health',
      client: 'IruCare Global',
      tags: ['Mobile', 'Telemedicine', 'Global', 'Patient Care'],
      location: 'Multiple Countries',
      image: '/Irucare.png',
      impact: 'Connecting 50,000+ patients globally'
    },
    {
      id: 3,
      title: 'IRU Core AI Assistant',
      description: 'Intelligent AI assistant for healthcare decision support and patient care. Delivering smart, dependable solutions across health, finance, education, and agriculture with accurate answers in both English and Kinyarwanda.',
      status: 'completed',
      priority: 'high',
      budget: 300000,
      startDate: '2023-01-01',
      endDate: '2023-12-15',
      team: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
      progress: 100,
      category: 'AI/ML',
      client: 'IRU Business Group',
      tags: ['AI', 'Machine Learning', 'Healthcare', 'Multilingual'],
      location: 'Global',
      image: '/Irucore - Intelligent AI Assistant.png',
      impact: 'Served 10,000+ healthcare professionals',
      completionDate: '2023-12-15'
    },
    {
      id: 4,
      title: 'HealthLinker Integration',
      description: 'Integration platform for healthcare data exchange and interoperability across East Africa. Streamlining data flow between healthcare systems.',
      status: 'planning',
      priority: 'medium',
      budget: 400000,
      startDate: '2024-02-01',
      endDate: '2025-08-31',
      team: ['David Brown', 'Alex Chen', 'Maria Garcia'],
      progress: 15,
      category: 'Data Integration',
      client: 'East African Health Network',
      tags: ['Data Integration', 'Interoperability', 'East Africa', 'Healthcare'],
      location: 'East Africa',
      image: '/Healthlinker.png',
      impact: 'Expected to serve 5M+ patients'
    },
    {
      id: 5,
      title: 'Priority Healthcare System',
      description: 'Patient prioritization system for emergency and critical care in Kenya. Streamlining emergency response and improving patient outcomes through intelligent triage.',
      status: 'completed',
      priority: 'high',
      budget: 200000,
      startDate: '2023-03-01',
      endDate: '2023-08-20',
      team: ['Tom Wilson', 'Lisa Anderson', 'John Doe'],
      progress: 100,
      category: 'Emergency Care',
      client: 'Kenya Health Ministry',
      tags: ['Emergency Care', 'Triage', 'Kenya', 'Critical Care'],
      location: 'Kenya',
      image: '/Priority.jpg',
      impact: 'Reduced emergency response time by 40%',
      completionDate: '2023-08-20'
    },
    {
      id: 6,
      title: 'Telemedicine Expansion',
      description: 'Expanding telemedicine services across West Africa. Bringing remote healthcare access to underserved communities through innovative technology solutions.',
      status: 'planning',
      priority: 'medium',
      budget: 600000,
      startDate: '2024-06-01',
      endDate: '2025-12-31',
      team: ['Sarah Wilson', 'David Brown', 'Mike Johnson', 'Alex Chen'],
      progress: 5,
      category: 'Telemedicine',
      client: 'West African Health Organization',
      tags: ['Telemedicine', 'West Africa', 'Remote Care', 'Underserved'],
      location: 'West Africa',
      image: '/placeholder.svg',
      impact: 'Expected to reach 2M+ underserved patients'
    }
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'on-hold': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Clock className="h-4 w-4" />;
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'on-hold': return <AlertCircle className="h-4 w-4" />;
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

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        status: newProject.status as Project['status'],
        priority: newProject.priority as Project['priority'],
        budget: newProject.budget || 0,
        startDate: newProject.startDate || '',
        endDate: newProject.endDate || '',
        team: newProject.team || [],
        progress: newProject.progress || 0,
        category: newProject.category || '',
        client: newProject.client || '',
        tags: newProject.tags || []
      };
      
      setProjects([...projects, project]);
      setNewProject({
        title: '',
        description: '',
        status: 'planning',
        priority: 'medium',
        budget: 0,
        startDate: '',
        endDate: '',
        team: [],
        progress: 0,
        category: '',
        client: '',
        tags: []
      });
      setShowAddModal(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject(project);
    setShowAddModal(true);
  };

  const handleUpdateProject = () => {
    if (editingProject && newProject.title && newProject.description) {
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...newProject } as Project
          : p
      ));
      setEditingProject(null);
      setNewProject({
        title: '',
        description: '',
        status: 'planning',
        priority: 'medium',
        budget: 0,
        startDate: '',
        endDate: '',
        team: [],
        progress: 0,
        category: '',
        client: '',
        tags: []
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteProject = (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects Management</h1>
            <p className="text-sm text-gray-600">Manage and track all projects</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
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
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
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

              <Button variant="outline" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              {/* Project Image */}
              {project.image && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getStatusColor(project.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(project.status)}
                          <span className="capitalize">{project.status.replace('-', ' ')}</span>
                        </div>
                      </Badge>
                      <Badge className={getPriorityColor(project.priority)}>
                        <span className="capitalize">{project.priority}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {project.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Client:</span> {project.client}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {project.category}
                    </div>
                    {project.completionDate && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Completed: {project.completionDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Impact Section for Completed Projects */}
                  {project.impact && (
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm font-medium text-orange-800">Impact:</p>
                      <p className="text-sm text-orange-700">{project.impact}</p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={newProject.title || ''}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={newProject.client || ''}
                      onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                      placeholder="Enter client name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description || ''}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={newProject.status} 
                      onValueChange={(value) => setNewProject({...newProject, status: value as Project['status']})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={newProject.priority} 
                      onValueChange={(value) => setNewProject({...newProject, priority: value as Project['priority']})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newProject.budget || ''}
                      onChange={(e) => setNewProject({...newProject, budget: Number(e.target.value)})}
                      placeholder="Enter budget"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.startDate || ''}
                      onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.endDate || ''}
                      onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newProject.category || ''}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      placeholder="Enter category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="progress">Progress (%)</Label>
                    <Input
                      id="progress"
                      type="number"
                      min="0"
                      max="100"
                      value={newProject.progress || ''}
                      onChange={(e) => setNewProject({...newProject, progress: Number(e.target.value)})}
                      placeholder="Enter progress percentage"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProject(null);
                    setNewProject({
                      title: '',
                      description: '',
                      status: 'planning',
                      priority: 'medium',
                      budget: 0,
                      startDate: '',
                      endDate: '',
                      team: [],
                      progress: 0,
                      category: '',
                      client: '',
                      tags: []
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingProject ? handleUpdateProject : handleAddProject}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
