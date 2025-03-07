# movie-ticket-booking-backend

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

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jerry11671/movie-ticket-booking-backend.git
   cd e-learning-platform-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_LIFETIME=1d
    PORT=3000
    NODE_EMAIL_PASS=your_email_password
    NODE_EMAIL_USER=your_email
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. Access the API: The server runs on ``` bash http://localhost:3000 (or your specified PORT).```


## Endpoints
### Authentication
#### Register a new user
```http
POST /api/auth/register
```

#### Log in and receive a JWT
```http
POST /api/auth/login
```

### Movies
#### Get all movies (filter by status)
```http
GET /api/movies
```

#### Get a specific movie
```http
GET /api/movies/:id
```

#### Create a movie (admin only)
```http
POST /api/movies
```

#### Update a movie (admin only)
```http
PUT /api/movies/:id
```


#### Delete a movie (admin only)
```http
DELETE /api/movies/:id
```

### Showtimes
#### Get showtimes (optional movieId query)
```http
GET /api/showtimes
```

#### Get a specific showtime
```http
GET /api/showtimes/:id
```

##### Create a showtime (admin only)
```http
POST /api/showtimes
```

#### Update a showtime (admin only)
```http
PUT /api/showtimes/:id
```

#### Delete a showtime (admin only)
```http
DELETE /api/showtimes/:id
```

### Bookings
#### Get seats for a showtime
```http
GET /api/bookings/seats/:id
```

#### Create a booking
```http
POST /api/bookings
```

#### Get user’s bookings
```http
GET /api/bookings
```

#### Cancel a booking
```http
PUT /api/bookings/:id/cancel
```


## Usage
**The user has two roles - Admin and Viewer**
- **Register/Login:** Use /api/auth endpoints to authenticate.

- **Browse Movies:** Fetch movies and showtimes via /api/movies and /api/showtimes.

- **Book Tickets:** Check seat availability with GET /api/bookings/seats/:id, then book via POST /api/bookings.

- **Manage Bookings:** View or cancel bookings with /api/bookings endpoints.

- **Admin Tasks:** Use admin-only endpoints to manage movies and showtimes

## Test Link
npm test authRoute.test.js

npm test courseRoute.test.js

npm test studentRoute.test.js

## Postman Published Link
https://documenter.getpostman.com/view/33130441/2sAYdoDmsp

## Contributing
- Fork the repository.

- Create a feature branch (git checkout -b feature/your-feature).

- Commit changes (git commit -m "Add your feature").

- Push to the branch (git push origin feature/your-feature).

- Open a pull request.

## License
This project is licensed under the MIT License.

Contact
For questions or feedback, reach out at [your-email@example.com (mailto:jerrygodson3@gmail.com)].

