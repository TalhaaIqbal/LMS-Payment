const mongoose = require("mongoose");
const Course = require("./models/Course");

const MONGODB_URI = "mongodb+srv://talhaiqbal7272:Commandoz1@notes.ohqyao7.mongodb.net/intern-management?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MongoDB connected");

        const sampleCourses = [
            {
                title: "Mastering JavaScript",
                description: "A complete JavaScript guide from beginner to advanced.",
                price: 49.99,
                image: "https://example.com/js-course.jpg",
                isPremium: true,
                instructor: "John Doe",
                duration: "8 weeks",
                level: "Intermediate",
                category: "Programming",
            },
            {
                title: "React for Beginners",
                description: "Learn React from scratch with hands-on projects.",
                price: 39.99,
                image: "https://example.com/react-course.jpg",
                isPremium: true,
                instructor: "Jane Smith",
                duration: "6 weeks",
                level: "Beginner",
                category: "Frontend Development",
            },
            {
                title: "Advanced Node.js",
                description: "Dive deep into Node.js and backend development.",
                price: 59.99,
                image: "https://example.com/node-course.jpg",
                isPremium: true,
                instructor: "Michael Brown",
                duration: "10 weeks",
                level: "Advanced",
                category: "Backend Development",
            },
            {
                title: "UI/UX Design Fundamentals",
                description: "Master the basics of UI and UX design.",
                price: 29.99,
                image: "https://example.com/uiux-course.jpg",
                isPremium: true,
                instructor: "Emily Johnson",
                duration: "4 weeks",
                level: "Beginner",
                category: "Design",
            },
        ];

        await Course.insertMany(sampleCourses);
        console.log("Sample courses inserted successfully!");

        mongoose.disconnect();
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });
