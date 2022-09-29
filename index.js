const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "course01" },
    { id: 2, name: "course02" },
    { id: 3, name: "course03" },
];

app.get("/", (req, res) => {
    res.send("Hello World!!! 😀😍");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course not found!!!");
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    const result = Joi.validate(req.body, schema);
    console.log("Result", result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`${process.env.USER}: Listening on port ${port}.....`)
);
