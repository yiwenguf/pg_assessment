import { registerStudent, retrieveStudents, retrieveStudentsForNotification, suspendStudent } from "../../api/controller/controller";
const db = require("../../api/services/db");

describe('Registering a new student', () => {
    it('Test with correct payload', async() => {
        const mReq = { 
            body: { 
                teacher: "teacherken@gmail.com",
                students:
                    [
                        "studentjon@gmail.com",
                        "studenthon@gmail.com"
                    ]
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(204);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
            })
        };

        const mock = jest.spyOn(db, 'postStudents');
        mock.mockImplementation(() => {
            return;
        });
        await registerStudent(mReq, mRes);

        mock.mockRestore();
    });
    it('Test with "teacher" param missing in payload', async() => {
        const mReq = { 
            body: { 
                students:
                    [
                        "studentjon@gmail.com",
                        "studenthon@gmail.com"
                    ]
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'postStudents');
        mock.mockImplementation(() => {
            return;
        });
        await registerStudent(mReq, mRes);

        mock.mockRestore();
    });
    it('Test with "students" param missing in payload', async() => {
        const mReq = { 
            body: { 
                teacher: "teacherken@gmail.com",
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'postStudents');
        mock.mockImplementation(() => {
            return;
        });
        await registerStudent(mReq, mRes);

        mock.mockRestore();
    });

    it('Test with empty payload', async() => {
        const mReq = {};
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'postStudents');
        mock.mockImplementation(() => {
            return;
        });
        await registerStudent(mReq, mRes);

        mock.mockRestore();
    });
});

describe('Retrieving list of students', () => {
    it('Test with an array of string "teacher" in query', async() => {
        const mReq = {
            query: { 
                teacher: ["teacherken@gmail.com","teacherjoe@gmail.com"]
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(200);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual({
                    students: [
                        "studenthon@gmail.com",
                        "studentjon@gmail.com"
                    ]
                })
            })
        };

        const mock = jest.spyOn(db, 'getStudents');
        mock.mockImplementationOnce(() => { // Assuming only the first teacher (teacherken@gmail.com) has students
            return [
                {
                    get: (param: string) => {
                        return 'studenthon@gmail.com'
                    }
                },
                {
                    get: (param: string) => {
                        return 'studentjon@gmail.com'
                    }
                },
            ];
        });
        mock.mockImplementationOnce(() => { // Second teacher calling (no students)
            return [
            ];
        });
        await retrieveStudents(mReq, mRes);

        mock.mockRestore();
    });
    it('Test with string "teacher" in query', async() => {
        const mReq = {
            query: { 
                teacher: "teacherken@gmail.com"
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(200);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual({
                    students: [
                        "studenthon@gmail.com",
                        "studentjon@gmail.com"
                    ]
                })
            })
        };

        const mock = jest.spyOn(db, 'getStudents');
        mock.mockImplementationOnce(() => {
            return [
                {
                    get: (param: string) => {
                        return 'studenthon@gmail.com'
                    }
                },
                {
                    get: (param: string) => {
                        return 'studentjon@gmail.com'
                    }
                },
            ];
        });
        await retrieveStudents(mReq, mRes);

        mock.mockRestore();
    });
    it('Test with no query', async() => {
        const mReq = {};
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Missing queries");
            })
        };

        const mock = jest.spyOn(db, 'getStudents');
        mock.mockImplementationOnce(() => {
            return [
                {
                    get: (param: string) => {
                        return 'studenthon@gmail.com'
                    }
                },
                {
                    get: (param: string) => {
                        return 'studentjon@gmail.com'
                    }
                },
            ];
        });

        await retrieveStudents(mReq, mRes);

        mock.mockRestore();
    });
});

describe('Suspending a student', () => {
    it('Test with correct payload', async() => {
        const mReq = {
            body: {
                student: "studentjon@gmail.com"
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(204);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
            })
        };

        const mock = jest.spyOn(db, 'updateSuspendStudent');
        mock.mockImplementation(() => {
            return;
        });

        await suspendStudent(mReq, mRes);

        mock.mockRestore();
    });
    it('Test with wrong param in payload', async() => {
        const mReq = {
            body: {
                studentsss: "studentjon@gmail.com"
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'updateSuspendStudent');
        mock.mockImplementation(() => {
            return;
        });

        await suspendStudent(mReq, mRes);

        mock.mockRestore();
    });
    it('Test with no payload', async() => {
        const mReq = {};
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'updateSuspendStudent');
        mock.mockImplementation(() => {
            return;
        });

        await suspendStudent(mReq, mRes);

        mock.mockRestore();
    });
});

describe('Retrieve students for notification', () => {
    it('Test with correct payload', async() => {
        const mReq = {
            body: {
                teacher: "teacherken@gmail.com",
                notification: "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(200);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual({
                    recipients: [
                        "studenthon@gmail.com",
                        "studentagnes@gmail.com",
                        "studentmiche@gmail.com"
                    ]
                })
            })
        };

        const mock = jest.spyOn(db, 'getNonSuspendedStudents');
        const mock2 = jest.spyOn(db, 'getStudentByName');
        mock.mockImplementation(async () => {
            return Promise.resolve(
                [
                    {
                        get: (param: string) => {
                            return 'studenthon@gmail.com'
                        }
                    },
                ]);
        });
        mock2.mockImplementation((studentName) => {
            return {
                get: (param: string) => {
                    return studentName;
                }
            }
        });

        await retrieveStudentsForNotification(mReq, mRes);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with correct payload but message is in front', async() => {
        const mReq = {
            body: {
                teacher: "teacherken@gmail.com",
                notification: "@studentagnes@gmail.com @studentmiche@gmail.com Hello students!"
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(200);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual({
                    recipients: [
                        "studenthon@gmail.com",
                        "studentagnes@gmail.com",
                        "studentmiche@gmail.com"
                    ]
                })
            })
        };

        const mock = jest.spyOn(db, 'getNonSuspendedStudents');
        const mock2 = jest.spyOn(db, 'getStudentByName');
        mock.mockImplementation(async () => {
            return Promise.resolve(
                [
                    {
                        get: (param: string) => {
                            return 'studenthon@gmail.com'
                        }
                    },
                ]);
        });
        mock2.mockImplementation((studentName) => {
            return {
                get: (param: string) => {
                    return studentName;
                }
            }
        });

        await retrieveStudentsForNotification(mReq, mRes);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with correct payload but message is in the middle', async() => {
        const mReq = {
            body: {
                teacher: "teacherken@gmail.com",
                notification: "@studentagnes@gmail.com Hello students! @studentmiche@gmail.com "
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(200);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual({
                    recipients: [
                        "studenthon@gmail.com",
                        "studentagnes@gmail.com",
                        "studentmiche@gmail.com"
                    ]
                })
            })
        };

        const mock = jest.spyOn(db, 'getNonSuspendedStudents');
        const mock2 = jest.spyOn(db, 'getStudentByName');
        mock.mockImplementation(async () => {
            return Promise.resolve(
                [
                    {
                        get: (param: string) => {
                            return 'studenthon@gmail.com'
                        }
                    },
                ]);
        });
        mock2.mockImplementation((studentName) => {
            return {
                get: (param: string) => {
                    return studentName;
                }
            }
        });

        await retrieveStudentsForNotification(mReq, mRes);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with missing "teacher" param in payload', async() => {
        const mReq = {
            body: {
                notification: "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'getNonSuspendedStudents');
        const mock2 = jest.spyOn(db, 'getStudentByName');
        mock.mockImplementation(async () => {
            return Promise.resolve(
                [
                    {
                        get: (param: string) => {
                            return 'studenthon@gmail.com'
                        }
                    },
                ]);
        });
        mock2.mockImplementation((studentName) => {
            return {
                get: (param: string) => {
                    return studentName;
                }
            }
        });

        await retrieveStudentsForNotification(mReq, mRes);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with missing "notification" param in payload', async() => {
        const mReq = {
            body: {
                teacher: "teacherken@gmail.com",
            }
        };
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'getNonSuspendedStudents');
        const mock2 = jest.spyOn(db, 'getStudentByName');
        mock.mockImplementation(async () => {
            return Promise.resolve(
                [
                    {
                        get: (param: string) => {
                            return 'studenthon@gmail.com'
                        }
                    },
                ]);
        });
        mock2.mockImplementation((studentName) => {
            return {
                get: (param: string) => {
                    return studentName;
                }
            }
        });

        await retrieveStudentsForNotification(mReq, mRes);

        mock.mockRestore();
        mock2.mockRestore();
    });
    it('Test with no payload', async() => {
        const mReq = {};
        const mRes: any = {
            statusCode: Number,
            status: jest.fn().mockImplementation((statusCode: Number) => {
                expect(statusCode).toEqual(400);
                return mRes;
            }),
            send: jest.fn().mockImplementation((response: any) => {
                expect(response).toEqual("Invalid content in the request body");
            })
        };

        const mock = jest.spyOn(db, 'getNonSuspendedStudents');
        const mock2 = jest.spyOn(db, 'getStudentByName');
        mock.mockImplementation(async () => {
            return Promise.resolve(
                [
                    {
                        get: (param: string) => {
                            return 'studenthon@gmail.com'
                        }
                    },
                ]);
        });
        mock2.mockImplementationOnce(() => {
            return {
                get: (param: string) => {
                    return 'studentagnes@gmail.com'
                }
            }
        });
        mock2.mockImplementationOnce(() => {
            return {
                get: (param: string) => {
                    return 'studentmiche@gmail.com'
                }
            }
        });

        await retrieveStudentsForNotification(mReq, mRes);

        mock.mockRestore();
        mock2.mockRestore();
    });
});


