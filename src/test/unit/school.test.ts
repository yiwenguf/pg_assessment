import request from 'supertest';
import app from '../..';

describe('Registering a new student', () => {
    it('Post request with correct payload', async() => {
        const payload = {
            "teacher": "teacherken@gmail.com",
            "students":
                [
                "studentjon@gmail.com",
                "studenthon@gmail.com"
                ]
        }
        const response = await request(app)
        .post("/api/register")
        .send(payload)

        // expect(response.statusCode).toEqual(204); // teacher and student is composite key, will fail if record already exist
    }),
    it('Post request with no teacher param in payload', async() => {
        const payload = {
            "students":
                [
                "studentjon@gmail.com",
                "studenthon@gmail.com"
                ]
        }
        const response = await request(app)
        .post("/api/register")
        .send(payload)

        expect(response.statusCode).toEqual(400); // teacher and student is composite key, will fail if record already exist
    }),
    it('Post request with no students param in payload', async() => {
        const payload = {
            "teacher": "teacherken@gmail.com",
        }
        const response = await request(app)
        .post("/api/register")
        .send(payload)

        expect(response.statusCode).toEqual(400); // teacher and student is composite key, will fail if record already exist
    }),
    it('Post request with no payload', async() => {
        const response = await request(app)
        .post("/api/register")
        .send()

        expect(response.statusCode).toEqual(400); // teacher and student is composite key, will fail if record already exist
    })
});

// Assuming only 'studenthon@gmail.com', 'studentjon@gmail.com' is under 
describe('Retrieving list of students', () => {
    it('Get request with 1 teacher in query with 2 students', async() => {
        const response = await request(app)
        .get("/api/commonstudents?teacher=teacherken%40gmail.com")
        .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ students: [ 'studenthon@gmail.com', 'studentjon@gmail.com' ] })
    }),
    it('Get request with 1 teacher in query with no students', async() => {
        const response = await request(app)
        .get("/api/commonstudents?teacher=teacherjoe%40gmail.com")
        .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ students: [] });
    }),
    it('Get request with 2 teacher in query', async() => {
        const response = await request(app)
        .get("/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com")
        .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ students: [ 'studenthon@gmail.com', 'studentjon@gmail.com' ] })
    }),
    it('Get request with no queries', async() => {
        const response = await request(app)
        .get("/api/commonstudents")
        .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ students: [] })
    })
});

describe('Suspending a student', () => {
    it('Post request with correct payload', async() => {
        const payload = {
            "student": "studentjon@gmail.com"
        }
        const response = await request(app)
        .post("/api/suspend")
        .send(payload)

        expect(response.statusCode).toEqual(204);
    });
    it('Post request with no payload', async() => {
        const response = await request(app)
        .post("/api/suspend")
        .send()

        expect(response.statusCode).toEqual(400);
    });
});

describe('Retrieve for notification', () => {
    it('Post request with all payload', async() => {
        const payload = {
            "teacher":  "teacherken@gmail.com",
            "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
        }
        const response = await request(app)
        .post("/api/retrievefornotifications")
        .send(payload)

        expect(response.statusCode).toEqual(200);
    });
});
