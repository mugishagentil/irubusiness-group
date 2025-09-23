# IRU Business Group - Admin Dashboard

## Overview
This is a comprehensive admin dashboard system for IRU Business Group that allows administrators to manage applications, projects, and customer messages.

## Features

### 🔐 Authentication
- **Login Page**: Access at `http://localhost:8080/admin`
- **Demo Credentials**: 
  - Username: `admin`
  - Password: `admin123`
- **Protected Routes**: All admin pages require authentication

### 📊 Dashboard
- **Overview Statistics**: Total applications, pending applications, active projects, unread messages
- **Recent Activity**: Latest applications and messages
- **Quick Actions**: Direct access to management sections

### 📝 Applications Management
- **View All Applications**: Interview and partnership applications
- **Filter & Search**: By type, status, name, email, or position
- **Status Management**: Approve, reject, or mark as pending
- **Detailed View**: Complete application information including:
  - Personal details (name, email, phone, location)
  - Application-specific data (pitch, portfolio, channels, content types)
  - Partnership details (company, investment, role, timeline)

### 🎯 Projects Management
- **CRUD Operations**: Create, read, update, and delete projects
- **Project Details**: Title, description, status, priority, budget, timeline
- **Team Management**: Assign team members to projects
- **Progress Tracking**: Visual progress bars and status indicators
- **Categories & Tags**: Organize projects by type and technology

### 💬 Messages Management
- **Contact Form Messages**: All customer inquiries and support requests
- **Message Categories**: General, partnership, support, complaint, feedback
- **Priority Levels**: Low, medium, high priority messages
- **Response System**: Reply to messages directly from the dashboard
- **Status Tracking**: New, in-progress, resolved, closed

## Technical Details

### Frontend Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Lucide React** icons
- **React Router** for navigation
- **Context API** for state management

### File Structure
```
src/
├── contexts/
│   └── AdminContext.tsx          # Admin authentication context
├── components/
│   ├── AdminNav.tsx              # Admin navigation component
│   └── ProtectedRoute.tsx        # Route protection component
├── pages/
│   ├── AdminLogin.tsx            # Login page
│   ├── AdminDashboard.tsx        # Main dashboard
│   ├── AdminApplications.tsx     # Applications management
│   ├── AdminProjects.tsx         # Projects management
│   └── AdminMessages.tsx         # Messages management
└── App.tsx                       # Main app with routing
```

### Routes
- `/admin` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/applications` - Applications management
- `/admin/projects` - Projects management
- `/admin/messages` - Messages management

## Getting Started

1. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Access the admin dashboard**:
   - Navigate to `http://localhost:8080/admin`
   - Use demo credentials: `admin` / `admin123`

3. **Explore the features**:
   - View the dashboard overview
   - Check applications and manage their status
   - Create and manage projects
   - Respond to customer messages

## Security Notes

- **Demo Credentials**: The current system uses hardcoded credentials for demonstration
- **Production Setup**: In production, implement proper authentication with a backend API
- **Data Persistence**: Currently uses mock data; integrate with a database for production
- **Session Management**: Implement proper session handling and token refresh

## Future Enhancements

- **Backend Integration**: Connect to a real API for data persistence
- **User Management**: Add admin user management capabilities
- **Advanced Filtering**: More sophisticated search and filter options
- **Export Features**: Export data to CSV/PDF formats
- **Notifications**: Real-time notifications for new applications/messages
- **Analytics**: Detailed analytics and reporting features
- **File Uploads**: Handle file uploads for applications and projects

## Support

For technical support or questions about the admin dashboard, please contact the development team.

