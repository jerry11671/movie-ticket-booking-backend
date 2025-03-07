# movie-ticket-booking-backend


markdown

# Movie Ticket Booking

A backend application designed to help users book movie tickets. Admins can manage movies and showtimes, while viewers can browse available showtimes, select seats, and book tickets securely. Built with Node.js, Express, MongoDB, and JWT authentication, this project provides a robust and scalable solution for movie ticket reservations.

## Features

- **User Authentication**: Register and log in with JWT-based authentication.
- **Movie Management**: Admins can create, update, and delete movies with poster and trailer uploads via Cloudinary.
- **Showtime Management**: Admins can schedule showtimes for movies with seat availability tracking.
- **Booking System**: Users can:
  - View available seats for a showtime.
  - Book tickets by selecting seats.
  - View their booking history.
  - Cancel bookings, freeing up seats.
- **Role-Based Access**: Separate privileges for "admin" and "viewer" roles.
- **Error Handling**: Custom error responses for a smooth user experience.
- **CORS Support**: Enables frontend integration from different origins.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **File Uploads**: Cloudinary for movie posters and trailers
- **Middleware**: Custom authentication, admin authorization, error handling
- **Validation**: Joi for input validation
- **Environment**: dotenv for configuration
- **Others**: `express-async-errors`, `http-status-codes`, `cors`

## Project Structure

movie-ticket-booking/
├── controllers/         # Route handlers
│   ├── authController.js
│   ├── bookingController.js
│   ├── movieController.js
│   └── showtimeController.js
├── db/                  # Database connection
│   └── connect.js
├── errors/              # Custom error classes
│   └── (assumed files)
├── middlewares/         # Custom middleware
│   ├── auth.js
│   ├── adminAuth.js
│   ├── error-handler.js
│   ├── not-found.js
│   └── validate.js
├── models/              # Mongoose schemas
│   ├── Booking.js
│   ├── Movie.js
│   ├── Showtime.js
│   └── User.js
├── routes/              # API routes
│   ├── authRouter.js
│   ├── bookingRouter.js
│   ├── movieRouter.js
│   └── showtimeRouter.js
├── validator/           # Joi validation schemas
│   ├── showtimeValidator.js
│   └── userValidator.js
├── helpers/             # Utility functions
│   └── cloudinary.js
├── app.js               # Main application file
├── .env                 # Environment variables (not tracked)
└── package.json         # Dependencies and scripts

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jerry11671/movie-ticket-booking-backend.git
   cd movie-ticket-booking

Install Dependencies:
bash

npm install

Set Up Environment Variables:
Create a .env file in the root directory with:
plaintext

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=1d
PORT=3000
NODE_EMAIL_PASS=your_email_password
NODE_EMAIL_USER=your_email
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Run the Application:
Development (with nodemon):
bash

npm run dev

Production:
bash

npm start

Access the API:
The server runs on http://localhost:3000 (or your specified PORT).

API Endpoints
Authentication
POST /api/auth/register - Register a new user

POST /api/auth/login - Log in and receive a JWT

Movies
GET /api/movies - Get all movies (filter by status)

GET /api/movies/:id - Get a specific movie

POST /api/movies - Create a movie (admin only)

PUT /api/movies/:id - Update a movie (admin only)

DELETE /api/movies/:id - Delete a movie (admin only)

Showtimes
GET /api/showtimes - Get showtimes (optional movieId query)

GET /api/showtimes/:id - Get a specific showtime

POST /api/showtimes - Create a showtime (admin only)

PUT /api/showtimes/:id - Update a showtime (admin only)

DELETE /api/showtimes/:id - Delete a showtime (admin only)

Bookings
GET /api/bookings/seats/:id - Get seats for a showtime

POST /api/bookings - Create a booking

GET /api/bookings - Get user’s bookings

PUT /api/bookings/:id/cancel - Cancel a booking

Usage
Register/Login: Use /api/auth endpoints to authenticate.

Browse Movies: Fetch movies and showtimes via /api/movies and /api/showtimes.

Book Tickets: Check seat availability with GET /api/bookings/seats/:id, then book via POST /api/bookings.

Manage Bookings: View or cancel bookings with /api/bookings endpoints.

Admin Tasks: Use admin-only endpoints to manage movies and showtimes.

Contributing
Fork the repository.

Create a feature branch (git checkout -b feature/your-feature).

Commit changes (git commit -m "Add your feature").

Push to the branch (git push origin feature/your-feature).

Open a pull request.

License
This project is licensed under the MIT License.
Contact
For questions or feedback, reach out at [your-email@example.com (mailto:jerrygodson3@gmail.com)].

