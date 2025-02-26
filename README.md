Online Library Admin Application

Overview

The Online Library Admin Application is a web-based admin panel that allows administrators to manage users, books/products, and persons efficiently. The application includes authentication, a dashboard with key statistics, and CRUD operations for users, books/products, and persons.

Features

Authentication: Simple login system using reqres.in API.

Dashboard: Displays total count statistics for users, products/books, and persons.

Users Management: List, create, update, and delete users with modal-based forms.

Products/Books Management: Displays books/products in a card view with sorting and pagination.

Persons Management: Lists persons in a table with local pagination, sorting, and search.

Responsive Design: Adaptive layout for different screen sizes with a fixed navigation sidebar and header.

Technologies Used

Frontend: Angular (latest version)

CSS Framework: Tailwind CSS / Bootstrap

State Management: NgRx (if needed for complex state handling)

API Calls: Fetch API / Axios

UI Components: Angular Material / Custom UI Components

API Endpoints Used

Authentication

Login: https://reqres.in/api/login

Users Management

Fetch Users: https://reqres.in/api/users?page=1

CRUD Operations: Implemented using the same API structure

Books/Products Management

Fetch Products: https://fakerapi.it/api/v2/products

Persons Management

Fetch Persons: https://fakerapi.it/api/v2/persons?quantity=100

Installation & Setup

Clone the repository:

git clone https://github.com/SusannaMargaryan20/online-library-admin.git

Navigate into the project directory:

cd online-library-admin

Install dependencies:

npm install

Run the development server:

ng serve

Open the application in your browser at:

http://localhost:4200

Features Breakdown

Authentication

Simple login page with email and password input fields.

Sends login request to https://reqres.in/api/login.

Redirects to dashboard on successful login.

Dashboard

Displays key statistics: Total Users, Products, Persons.

Fixed sidebar navigation for easy access to different sections.

Logout functionality.

Users Page

Displays a list of users in a table.

CRUD (Create, Read, Update, Delete) operations using a modal form.

Fetches users from https://reqres.in/api/users?page=1.

Products/Books Page

Displays books/products in a card view (Name, Price, Image).

Implements pagination (10 items per page, max 50 items).

Sorting by title (asc, desc, none).

Fetches data from https://fakerapi.it/api/v2/books or https://fakerapi.it/api/v2/products.

Persons Page

Displays persons in a table (First Name, Last Name, Email, Phone, Website).

Local pagination with 10 items per page.

Local sorting by Phone and First Name.

Local search on Email, First Name, Last Name.

Fetches persons from https://fakerapi.it/api/v2/persons?quantity=100.

Responsive Design

Sidebar is collapsible for smaller screens.

Table and card views adjust dynamically for mobile and desktop users.

Future Enhancements

Implement authentication token handling.

Improve UI with animations and better styling.

Add filters and advanced search options.

Implement backend API for real data management.

License

This project is open-source and available for modification and distribution.

Happy coding! 🚀

