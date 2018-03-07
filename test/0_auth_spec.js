describe('API endpoint /api/auth', function() {
    this.timeout(5000); // How long to wait for a response (ms)

    before(async () => {
        app = await expressSetting();
        await mongoose.connection.db.dropDatabase();
    });

    it('should return token with wrong credentials', done => {
        const loginData = {
            "user":"renan",
            "password":"wrong_password"
        }
        request(app)
            .post('/api/auth/login')
            .send(loginData)
            .end((err, res) => {
                expect(res).to.have.status(400);
                return done();
            })
    });

    it('should return new account with less information', done => {
        const loginData = {
            "name":"Renan Cesar",
            "password": "wrong_password",
            "balance":12000
        }
        request(app)
            .post('/api/auth/sign')
            .send(loginData)
            .end((end, res) => {
                expect(res).to.have.status(400);
                return done();
            })
    });
    
    it('should return new account all informations', done => {
        const loginData = {
            "name":"Renan Cesar",
            "user":"renan",
            "password": "1234",
            "balance":12000
        }
        request(app)
            .post('/api/auth/sign')
            .send(loginData)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.user.user).to.eql(loginData.user);
                return done();
            })
    });

    it('should return token with correct credentials', done => {
        const loginData = {
            "user": "renan",
            "password": "1234"
        }
        request(app)
            .post('/api/auth/login')
            .send(loginData)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.token).to.be.an('string');
                token = res.body.token;
                
                return done();
            })
    });

});