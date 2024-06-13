### Taskly API Endpoints (Draft)

#### User Management

- **Register/Login/Logout**
  - POST /api/v1/auth/register - Register a new user
  - POST /api/v1/auth/login - Login an existing user
  - POST /api/v1/auth/logout - Logout the currently logged-in user
- **User Profile**
  - GET /api/v1/users/profile - Get user profile information
  - PUT /api/v1/users/profile - Update user profile information
  - POST /api/v1/users/profile-picture - Upload a new profile picture
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
  - POST /api/v1/projects/{projectId}/tickets/{ticketId}/assign - Unassign a ticket from a user

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
- firstName
- lastName
- email
- password
- profile picture
- role (admin, user)


#### Project

- id (unique identifier)
- name
- description
- owner_id (user ID of the project owner)
- members

#### Ticket

- id (unique identifier)
- projectId (ID of the project the ticket belongs to)
- title
- description
- status (open, in progress, resolved, closed)
- priority (low, medium, high)
- assignees (user ID of the user assigned to the ticket)

#### Comment

- id (unique identifier)
- ticketId (ID of the ticket the comment belongs to)
- userId (ID of the user who posted the comment)
- content

#### Notification

- id (unique identifier)
- userId (ID of the user the notification is for)
- content
- read (boolean indicating if the notification has been read)

#### Analytics

- id (unique identifier)
- userId (optional, ID of the user the analytics are for)
- projectId (optional, ID of the project the analytics are for)
- ticketId (optional, ID of the ticket the analytics are for)
- resolvedTicketsCount
- mostAssignedPeople (array of user IDs)
- otherRelevantStatistics (any other relevant statistics)
