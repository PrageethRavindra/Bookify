# Bookify

Bookify is a Library Management System that helps users organize and manage the books in their library. This application consists of a backend built with ASP.NET Core and a frontend built with React.

## Prerequisites

Before you start, make sure you have the following installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (for the React frontend)

## Getting Started

### Cloning the Repository

1.To get started, clone the repository:

```bash
https://github.com/PrageethRavindra/Bookify.git
```
2.Navigate to the project directory:

```bash
cd Bookify
```
### Running the Application Locally

Backend (ASP.NET Core)

1.Navigate to the backend project directory:

```bash
cd Bookify
```
2.Restore the dependencies:

```bash
dotnet restore
```
3.Update the database:

```bash
dotnet ef database update
```
4.Run the backend application:

```bash
dotnet run
```
The backend API will be available at http://localhost:5062.

## Frontend (React)
1.Navigate to the client directory:
```bash
cd client
```
2.Install the dependencies:
```bash
npm install
```
3.Run the frontend application:
```bash
npm start
```

## Features

### 1. User Authentication
Users can sign up and log in to access the application.

- **Sign up**: Users can create a new account by providing their Username,Email and Password.
- **Login**: Existing users can log in using their credentials to access their personal library.

### 2. Create a New Book Record
Users can add new books to their library by providing details like the title, author, genre, and publication year. This allows users to maintain their own collection of books.

### 3. View a List of Existing Book Records
Users can view all the books they have added to their library. The list will display important details about each book, such as the title, author, and genre.

### 4. Update an Existing Book Record
Users can update the details of their existing books, including changing the title, author, genre, or publication year. This ensures that the library remains accurate and up-to-date.

### 5. Delete a Book Record
Users can delete any book from their library. This helps to manage and remove books that are no longer needed in their collection.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.






