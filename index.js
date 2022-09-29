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
    if (!course) return res.status(404).send("Course not found!!!");
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course not found!!!");

    //validate course with validateCourse()
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        return res
            .status(404)
            .send("The course with the given ID was not found!!!");

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    console.log(index);
    // console.log(courses.splice(index));

    res.send(course);
});

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`${process.env.USER}: Listening on port ${port}.....`)
);

function validateCourse(course) {
    //Validation
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(course, schema);
}
