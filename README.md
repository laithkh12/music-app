
# Music App

A music streaming and management platform with an admin, artist, and user login system. The app allows for managing songs, albums, and user roles. It supports uploading and editing songs, album management, and different permissions for each user role.

## Features

- **Role-Based Authentication**
  - Login as **Admin**, **Artist**, or **User**.
  - Admin can manage all aspects of the app, including songs, albums, and users.
  - Artists can manage their own songs and albums.
  - Users can view and listen to available songs and albums.
  
- **Song Management**
  - Add, remove, and edit songs.
  - Upload audio files and cover images for songs.
  - Edit song details such as title, artist, genre, etc.

- **Album Management**
  - Create albums and add songs to albums.
  - Remove songs from albums.
  
## Technologies

- **Frontend**: Next.js, TypeScript, React
- **Backend**: Node.js with Express or another backend framework
- **Database**: MySQL, MongoDB, or SQL Server
- **Authentication**: JWT or session-based authentication for user roles

## Installation

### Backend Setup
1. Clone the backend repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the database connection and create the necessary tables for songs, albums, and users.
4. Set up the authentication mechanism (e.g., JWT) and configure the roles (Admin, Artist, User).
5. Start the server:
   ```
   npm start
   ```

### Frontend Setup (Next.js with TypeScript)
1. Clone the frontend repository.
2. Install dependencies:
   ```
   npm install
   ```
   
3. Configure the API endpoints to communicate with the backend.
4. Start the frontend application:
   ```
   npm run dev
   ```

## Usage

1. **Login**:
   - Users can log in as an **Admin**, **Artist**, or **User**.
   - Admin has full access to manage all songs and albums, including user management.
   - Artists can manage only their songs and albums.
   - Users can browse and listen to songs and albums.

2. **Managing Songs**:
   - Admins and artists can add, remove, and edit songs.
   - Audio files and cover images can be uploaded when adding or editing songs.

3. **Managing Albums**:
   - Admins and artists can create albums and add or remove songs from albums.

4. **User Role Management**:
   - Admins can create new users with different roles, such as artist or user.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new pull request.

## License

This project is licensed for **private use only**.
