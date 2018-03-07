import AccountModel from '../src/models/accounts';

describe('API endpoint /api/accounts', function () {
    this.timeout(5000); // How long to wait for a response (ms)

    // GET - List all colors
    it('should return all accounts without token on Authorization header', done => {
        const result = request(app)
            .get('/api/accounts')
            .end((err, res) => {
                expect(res).to.have.status(403);
                return done();
            })


    });

    it('should return all accounts with token on Authorization header', done => {
        
        request(app)
            .get('/api/accounts')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                return done();
            })
    });

    it('should return account by id', done => {
        const accountData = {
            "name": "Test Get By Id",
            "user": "test-get-by-id",
            "password": "1234",
            "balance": 5000
        }

        new AccountModel(accountData).save(function(err, account){
            request(app)
                .get('/api/accounts/' + account._id)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.user).to.equal(account.user);
                    return done();
                })
        }); 
    });

    it('should return create account with existent user', done => {
        const accountData = {
            "name": "Test Get By Id",
            "user": "test-get-by-id",
            "password": "1234",
            "balance": 5000
        }

        request(app)
            .post('/api/accounts/')
            .set('Authorization', token)
            .send(accountData)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.code).to.equal('user_already_exists');
                // expect(res.body.user).to.equal(account.user);
                return done();
            })
    });

    it('should return create account with a new user', done => {
        const accountData = {
            "name": "Test Create",
            "user": "test-create",
            "password": "1234",
            "balance": 5000
        }

        request(app)
            .post('/api/accounts/')
            .set('Authorization', token)
            .send(accountData)
            .end((err, res) => {
                console.log(res.body);
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                return done();
            })
    });

    it('should edit account', done => {
        const accountData = {
            "name": "Test Edit",
            "user": "test-edit",
            "password": "1234",
            "balance": 5000
        }

        new AccountModel(accountData).save(function (err, account) {
            request(app)
                .put('/api/accounts/' + account._id)
                .set('Authorization', token)
                .send({balance:15000})
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    request(app)
                    .get('/api/accounts/' + account._id)
                    .set('Authorization', token)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body.balance).to.equal(15000);
                        return done();
                    })
                })
        });

        
    });

    it('should delete account', done => {
        const accountData = {            
            "name": "Test Delte",
            "user": "test-delete",
            "password": "1234",
            "balance": 5000
        }

        new AccountModel(accountData).save(function (err, account) {
            console.log('id', account._id);
            request(app)
                .delete('/api/accounts/' + account._id)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    request(app)
                        .get('/api/accounts/' + account._id)
                        .set('Authorization', token)
                        .end((err, res) => {
                            expect(res).to.have.status(200);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.eql({});
                            return done();
                        })
                })
        });
    });

});