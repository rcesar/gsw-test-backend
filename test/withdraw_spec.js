import WithdrawModel from '../src/models/withdraws';

describe('API endpoint /api/withdraw', function () {
    this.timeout(5000); // How long to wait for a response (ms)
    const _mockId = "5a9ffc8c9d9d2be1363d21f0";

    // GET - List all colors
    it('should return all withdrawas of user logger without token on Authorization header', done => {
        const result = request(app)
            .get('/api/withdraw')
            .end((err, res) => {
                expect(res).to.have.status(403);
                return done();
            })


    });

    it('should return null array withdrawas of user logged with token on Authorization header', done => {

        request(app)
            .get('/api/withdraw')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(0);
                return done();
            })
    });

    it('should return create withdraw with for a logged user', done => {
        const accountData = {
            "_id":_mockId,
            "value":10
        }

        request(app)
            .post('/api/withdraw/')
            .set('Authorization', token)
            .send(accountData)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                // expect(res.body.code).to.equal('user_already_exists');
                // expect(res.body.user).to.equal(account.user);
                return done();
            })
    });

    it('should return withdraw by id', done => {
        request(app)
            .get('/api/withdraw/' + _mockId)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body._id).to.equal(_mockId);
                return done();
            })
    });

    it('should return all array withdrawas of user logged with token on Authorization header', done => {

        request(app)
            .get('/api/withdraw')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                return done();
            })
    });

    it('should return number of notes for request value 30,00', done => {
        const expectedNotes = {
            10:1,
            20:1,
            50:0,
            100:0
        };

        request(app)
            .post('/api/withdraw')
            .set('Authorization', token)
            .send({value:30})
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.notes).to.eql(expectedNotes);
                done();
            })
    })

    it('should return number of notes for request value 80,00', done => {
        const expectedNotes = {
            10: 1,
            20: 1,
            50: 1,
            100: 0
        };

        request(app)
            .post('/api/withdraw')
            .set('Authorization', token)
            .send({ value: 80 })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.notes).to.eql(expectedNotes);
                done();
            })
    })

    it('should return number of notes for request value 290,00', done => {
        const expectedNotes = {
            10: 0,
            20: 2,
            50: 1,
            100: 2
        };

        request(app)
            .post('/api/withdraw')
            .set('Authorization', token)
            .send({ value: 290 })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body.notes).to.eql(expectedNotes);
                done();
            })
    })

    it('should return error to request with balance insuficient', done => {
        request(app)
            .post('/api/withdraw')
            .set('Authorization', token)
            .send({ value: 290000 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.code).to.equal('balance_insuficient')
                done();
            })
    })

    it('should return error to request value is impossible atend with avaliable notes', done => {
        request(app)
            .post('/api/withdraw')
            .set('Authorization', token)
            .send({ value: 291 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.code).to.equal('not_available_money_bills')
                done();
            })
    })
});