const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');;
const Booking = require('../models/Booking');
const Showtime = require('../models/Showtime');
const User = require('../models/User');
const { createBooking, getSeatsForShowtime } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/auth');
const { connectDB, disconnectDB } = require("../utils/test-utils/dbHandler.utils")

// Mock app setup
const app = express();
app.use(express.json());

// Mock auth middleware
jest.mock('../middlewares/auth', () => (req, res, next) => {
    req.user = { id: 'mockUserId', role: 'viewer' };
    next();
});

// Routes for testing
app.get('/api/bookings/seats/:id', authMiddleware, getSeatsForShowtime);
app.post('/api/bookings', authMiddleware, createBooking);

describe('Booking Controller', () => {

    beforeAll(async () => {
        connectDB();
        const movie = await Movie.create({
            title: "Test movie title",
            description: "This is just for testing purpose",
            genre: ["Thriller"],
            duration: 120,
            releaseDate: "2024-06-20T00:00:00.000Z",
            status: "Now playing"
        })
        const movieId = movie._id
    }, 100000);

    afterAll(async () => {
        await User.deleteMany({});
        await Showtime.deleteMany({});
        await Booking.deleteMany({});
        disconnectDB();
    }, 100000);

    describe('GET /api/bookings/seats/:id', () => {
        it('should return seats for a showtime', async () => {
            const showtime = await Showtime.create({
                movie: new mongoose.Types.ObjectId(),
                date: new Date(),
                time: '18:00',
                seats: [
                    { seatNumber: 'A1', status: 'available' },
                    { seatNumber: 'A2', status: 'reserved' },
                ],
            });

            const res = await request(app).get(`/api/bookings/seats/${showtime._id}`);
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.seats).toHaveLength(2);
            expect(res.body.data.seats[0].seatNumber).toBe('A1');
        });

        it('should throw NotFoundError if showtime doesn’t exist', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/api/bookings/seats/${fakeId}`);
            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Showtime does not exist.');
        });
    });

    describe('POST /api/bookings', () => {
        it('should create a booking successfully', async () => {
            const showtime = await Showtime.create({
                movie: new mongoose.Types.ObjectId(),
                date: new Date(),
                time: '18:00',
                seats: [
                    { seatNumber: 'A1', status: 'available' },
                    { seatNumber: 'A2', status: 'available' },
                ],
            });

            const res = await request(app)
                .post('/api/bookings')
                .send({ showtimeId: showtime._id, seatNumbers: ['A1'] });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Booking successful');
            expect(res.body.data.booking.seatNumbers).toContain('A1');
            expect(res.body.data.booking.totalPrice).toBe(1500);

            const updatedShowtime = await Showtime.findById(showtime._id);
            expect(updatedShowtime.seats.find(s => s.seatNumber === 'A1').status).toBe('reserved');
        });

        it('should fail if seats are already reserved', async () => {
            const showtime = await Showtime.create({
                movie: new mongoose.Types.ObjectId(),
                date: new Date(),
                time: '18:00',
                seats: [
                    { seatNumber: 'A1', status: 'reserved' },
                    { seatNumber: 'A2', status: 'available' },
                ],
            });

            const res = await request(app)
                .post('/api/bookings')
                .send({ showtimeId: showtime._id, seatNumbers: ['A1'] });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Seats A1 are already reserved');
        });

        it('should fail if showtime doesn’t exist', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .post('/api/bookings')
                .send({ showtimeId: fakeId, seatNumbers: ['A1'] });

            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Showtime not found.');
        });

        it('should fail if seat doesn’t exist', async () => {
            const showtime = await Showtime.create({
                movie: new mongoose.Types.ObjectId(),
                date: new Date(),
                time: '18:00',
                seats: [{ seatNumber: 'A1', status: 'available' }],
            });

            const res = await request(app)
                .post('/api/bookings')
                .send({ showtimeId: showtime._id, seatNumbers: ['A2'] });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Some requested seats don’t exist');
        });
    });
});