### Taskly API Endpoints (Draft)

#### User Management

- **Register/Login/Logout**
  - POST /api/v1/auth/register - Register a new user
  - POST /api/v1/auth/login - Login an existing user
  - POST /api/v1/auth/logout - Logout the currently logged-in user
- **User Profile**
  - GET /api/v1/users/{userId}/profile - Get user profile information
  - PUT /api/v1/users/{userId}/profile - Update user profile information
  - POST /api/v1/users/{userId}/profile-picture - Upload a new profile picture
- **Admin Action**
  - DELETE /api/users/{userId} - Delete a user by ID (Admin access only)

### Project Management

- **Project CRUD**

  - POST /api/v1/projects - Create a new project
  - GET /api/v1/projects - Get all projects for the current user
  - GET /api/v1/projects/{projectId} - Get a specific project by ID
  - PUT /api/v1/projects/{projectId} - Update a project by ID
  - DELETE /api/v1/projects/{projectId} - Delete a project by ID

- **Project Membership**

  - POST /api/v1/projects/{projectId}/invite - Invite a user to a project (Project Owner only)
  - GET /api/v1/projects/{projectId}/members - Get all members of a project
  - DELETE /api/v1/projects/{projectId}/members/{userId} - Remove a user from a project (Project Owner only)

- **Endpoint to Accept Invitation**
  - POST /api/v1/projects/{projectId}/invite/accept - Accept an invitation to join a project

#### Ticket Management

- **Ticket CRUD**
  - POST /api/v1/projects/{projectId}/tickets - Create a new ticket within a project
  - GET /api/v1/projects/{projectId}/tickets - Get all tickets for a project
  - GET /api/v1/projects/{projectId}/tickets/{ticketId} - Get a specific ticket by ID
  - PUT /api/v1/projects/{projectId}/tickets/{ticketId} - Update a ticket by ID
  - DELETE /api/v1/projects/{projectId}/tickets/{ticketId} - Delete a ticket by ID
- **Assign Ticket**
  - POST /api/v1/projects/{projectId}/tickets/{ticketId}/assign - Assign a ticket to a user

#### Comment Management

- **Comment CRUD**
  - POST /api/v1/projects/{projectId}/tickets/{ticketId}/comments - Create a new comment on a ticket
  - GET /api/v1/projects/{projectId}/tickets/{ticketId}/comments - Get all comments for a ticket
  - GET /api/v1/projects/{projectId}/tickets/{ticketId}/comments/{commentId} - Get a specific comment by ID
  - PUT /api/v1/projects/{projectId}/tickets/{ticketId}/comments/{commentId} - Update a comment by ID
  - DELETE /api/v1/projects/{projectId}/tickets/{ticketId}/comments/{commentId} - Delete a comment by ID

#### Ticket Search and Filtering 

- **Filter Tickets**
  - GET /api/v1/projects/{projectId}/tickets/search?q={query} - Search tickets within a project
  - GET /api/v1/projects/{projectId}/tickets/filter?status={status}&priority={priority} - Filter tickets within a project by status and priority

#### Notification Management

- **Notifications**
  - GET /api/v1/notifications - Get all notifications for the current user
  - PUT /api/v1/notifications/{notificationId} - Mark a notification as read
- **Trigger Notification**
  - POST /api/v1/projects/{projectId}/tickets/{ticketId}/notify - Trigger a notification for an action on a ticket
  - POST /api/v1/projects/{projectId}/notify - Trigger a notification for an action on a project

#### Analytics (leave for the end)

- **User Analytics**
  - GET /api/v1/analytics/users/{userId}/tickets/count - Get the total count of tickets created by a user
  - GET /api/v1/analytics/users/{userId}/tickets/resolved - Get the number of resolved tickets assigned to a user
- **Project Analytics**
  - GET /api/v1/analytics/projects/{projectId}/tickets/count - Get the total count of tickets for a project
  - GET /api/v1/analytics/projects/{projectId}/tickets/resolved - Get the number of resolved tickets for a project
- **Ticket Analytics**
  - GET /api/v1/analytics/tickets/count - Get the total count of tickets
  - GET /api/v1/analytics/tickets/resolved - Get the number of resolved tickets
  - GET /api/v1/analytics/tickets/avg-resolution-time - Get the average resolution time of tickets

---

### Taskly Database Models

#### User

- id (unique identifier)
- username
- first_name
- last_name
- email
- password
- profile picture
- role (admin, user)
- created_at
- updated_at

#### Project

- id (unique identifier)
- name
- description
- owner_id (user ID of the project owner)
- created_at
- updated_at

#### Ticket

- id (unique identifier)
- project_id (ID of the project the ticket belongs to)
- title
- description
- status (open, in progress, resolved, closed)
- priority (low, medium, high)
- assignee_id (user ID of the user assigned to the ticket)
- created_at
- updated_at

#### Comment

- id (unique identifier)
- ticket_id (ID of the ticket the comment belongs to)
- user_id (ID of the user who posted the comment)
- content
- created_at
- updated_at

#### Notification

- id (unique identifier)
- user_id (ID of the user the notification is for)
- content
- read (boolean indicating if the notification has been read)
- created_at
- updated_at

#### Analytics

- id (unique identifier)
- user_id (optional, ID of the user the analytics are for)
- project_id (optional, ID of the project the analytics are for)
- ticket_id (optional, ID of the ticket the analytics are for)
- resolved_tickets_count
- most_assigned_people (array of user IDs)
- other_relevant_statistics (any other relevant statistics)
