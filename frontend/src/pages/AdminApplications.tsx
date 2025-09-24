import React, { useEffect, useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import AdminNav from "../components/AdminNav";
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Users,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Building,
  Globe,
  DollarSign,
  BarChart3,
} from "lucide-react";
import {
  InterviewApplicationsAPI,
  PartnershipApplicationsAPI,
} from "@/services/application";  

const AdminApplications: React.FC = () => {
  const { admin, logout } = useAdmin();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  // Fetch applications
  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        const [interviews, partners] = await Promise.all([
          InterviewApplicationsAPI.getAll(),
          PartnershipApplicationsAPI.getAll(),
        ]);

        // Normalize both types with actual backend fields
        const normalized = [
          ...(interviews || []).map((i: any) => ({ 
            ...i, 
            type: "Interview",
            // Only use fields that exist in InterviewApplication model
            name: i.fullName,
            email: i.email,
            phone: i.phone,
            location: i.city,
            createdAt: i.createdAt,
            status: i.status,
            // Interview-specific fields
            headline: i.headline,
            language: i.language,
            format: i.format,
            duration: i.duration,
            travel: i.travel,
            sensitivity: i.sensitivity
          })),
          ...(partners || []).map((p: any) => ({ 
            ...p, 
            type: "Partnership",
            // Only use fields that exist in PartnershipApplication model
            name: p.appName,
            email: p.email,
            phone: p.phone,
            location: p.country,
            createdAt: p.createdAt,
            status: p.status,
            // Partnership-specific fields
            partnershipType: p.type,
            project: p.project,
            amount: p.amount,
            equity: p.equity,
            board: p.board,
            roleType: p.roleType,
            presence: p.presence
          })),
        ];

        setApplications(normalized);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.project?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || app.type.toLowerCase() === filterType;
    const matchesStatus =
      filterStatus === "all" || app.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Interview":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "Partnership":
        return <Users className="h-5 w-5 text-orange-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleStatusChange = async (
    applicationId: string,
    type: string,
    newStatus: string
  ) => {
    try {
      if (type === "Interview") {
        await InterviewApplicationsAPI.updateStatus(applicationId, newStatus);
      } else {
        await PartnershipApplicationsAPI.updateStatus(applicationId, newStatus);
      }

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const toggleExpand = (appId: string) => {
    setExpandedAppId(expandedAppId === appId ? null : appId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Applications Management
          </h1>
          <p className="text-sm text-gray-600">
            Manage interview and partnership applications
          </p>
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
        {loading ? (
          <p className="text-center text-gray-500">Loading applications...</p>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Collapsible
                key={app.id}
                open={expandedAppId === app.id}
                onOpenChange={() => toggleExpand(app.id)}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(app.type)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {app.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{app.email}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{app.phone}</span>
                            </div>
                            {app.location && (
                              <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{app.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(app.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </div>
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(app.id)}
                        className="flex items-center space-x-1"
                      >
                        {expandedAppId === app.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span>Details</span>
                      </Button>

                      {app.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusChange(app.id, app.type, "approved")
                            }
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleStatusChange(app.id, app.type, "rejected")
                            }
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <CollapsibleContent className="px-6 pb-6 border-t border-gray-200">
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Application Type Specific Details */}
                    {app.type === "Interview" ? (
                      <>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Interview Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Headline:</span>
                              <span className="font-medium">{app.headline || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Language:</span>
                              <span className="font-medium">{app.language || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Format:</span>
                              <span className="font-medium">{app.format || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration:</span>
                              <span className="font-medium">{app.duration || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Travel:</span>
                              <span className="font-medium">{app.travel || "Not specified"}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Additional Info</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Sensitivity:</span>
                              <span className="font-medium">{app.sensitivity || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Applied:</span>
                              <span className="font-medium">
                                {new Date(app.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Partnership Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium">{app.type || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Project:</span>
                              <span className="font-medium">{app.project || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Investment:</span>
                              <span className="font-medium">
                                {app.amount ? formatCurrency(app.amount) : "Not specified"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Equity:</span>
                              <span className="font-medium">
                                {app.equity ? `${app.equity}%` : "Not specified"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Terms & Conditions</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Board Representation:</span>
                              <span className="font-medium">{app.board || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Role Type:</span>
                              <span className="font-medium">{app.roleType || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Presence:</span>
                              <span className="font-medium">{app.presence || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Applied:</span>
                              <span className="font-medium">
                                {new Date(app.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}

        {!loading && filteredApplications.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;