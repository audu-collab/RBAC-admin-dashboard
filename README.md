# RBAC Admin Dashboard

## Overview

The RBAC (Role-Based Access Control) Admin Dashboard is a powerful, modern web application built with Next.js, React, and Supabase. It provides a comprehensive solution for managing users, roles, and permissions in a secure and user-friendly interface. This dashboard is designed to help administrators efficiently handle access control in complex systems, ensuring that users have the right level of access to resources based on their roles.

## Features

- **User Management**: Create, view, edit, and delete user accounts. Assign roles and manage user statuses.
- **Role Management**: Define and manage roles with customizable permissions.
- **Permissions Matrix**: Visualize and edit role-based permissions in an intuitive matrix interface.
- **Dashboard Analytics**: Get an overview of user and role statistics with interactive charts.
- **Recent Activity Tracking**: Monitor recent user activities and system changes.
- **Responsive Design**: Fully responsive interface that works seamlessly on desktop and mobile devices.
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing in any environment.
- **Real-time Updates**: Utilizes Supabase for real-time data synchronization.
- **Secure Authentication**: Implements secure user authentication and authorization.

## Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **State Management**: React Hooks
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/rbac-admin-dashboard.git
   cd rbac-admin-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Database Setup

1. Set up your Supabase project and database tables as per the schema defined in `prisma/schema.prisma`.
2. Run the initial migration to create the necessary tables:
   ```
   npx prisma migrate dev
   ```

## Usage

### User Management

- Navigate to the "User Management" page to view all users.
- Use the "Add User" button to create new user accounts.
- Edit user details, change roles, or update status using the action buttons in the user list.

### Role Management

- Access the "Role Management" page to view and manage roles.
- Create new roles with the "Add Role" button.
- Assign permissions to roles using the checkbox interface in the role creation/edit form.

### Permissions Matrix

- Visit the "Permissions" page to see the comprehensive permissions matrix.
- Toggle permissions for each role using the switches in the matrix.
- Use the "Save Changes" button to update permissions across all roles.

### Dashboard

- The main dashboard provides an overview of key statistics and recent activities.
- View charts displaying user distribution across roles and other relevant metrics.

## Customization

### Theming

- Modify the Tailwind CSS configuration in `tailwind.config.js` to customize the overall theme.
- Adjust component styles in the respective component files under the `components` directory.

### Adding New Features

1. Create new components in the `components` directory.
2. Add new pages in the `app` directory following the Next.js 14 file-based routing system.
3. Implement new API routes in the `app/api` directory for backend functionality.

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository.
2. Connect your GitHub repository to Vercel.
3. Configure your environment variables in the Vercel dashboard.
4. Deploy your application.

For other hosting providers, ensure that you set up the necessary environment variables and build commands as specified in the `package.json` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Lucide React](https://lucide.dev/)

## Support

For support, please open an issue in the GitHub repository or contact the maintainers directly.

---

Built with ❤️ by [Audumbar Gutte]
```

This README provides a comprehensive guide to your RBAC Admin Dashboard project. Feel free to adjust any details or add more specific information as needed.
