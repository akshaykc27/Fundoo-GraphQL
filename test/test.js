const chai = require('chai')
const expect = chai.expect;
const test = require('supertest');
const server = require('../server');

describe('login test', () =>
    it('login', (done) => {
        test(server)
            .post('/graphql')
                .send({ query : 'mutation{login(email:"akshaykc27@gmail.com",password :"12345678"){message}}'})
                .expect(200)
                .end((err,res) => {
                    if(err) return done(err);
                    expect(JSON.parse(res.text).data.login.message).to.deep.equal(
                        "login successfull"
                    )           
                    done();
                })
    }))
      
    describe('registration test', () =>
    it('register', (done) => {
        test(server)
            .post('/graphql')
                .send({ query : 'mutation{register(firstName:"akshay", lastName:"kc", email:"akshaykrc27@gmail.com", password :"12345678"){message}}'})
                .expect(200)
                .end((err,res) => {
                    if(err) return done(err);
                    expect(JSON.parse(res.text).data.register.message).to.deep.equal(
                        "registration successful"
                    )           
                    done();
                })
    }))

    describe('forgot password test', () => {
        it('forgotPassword',(done) => {
            test(server)
            .post('/graphql')
                .send({query : 'mutation{forgotPassword(email:"akshaykc27@gmail.com"){message}}'})
                .expect(200)
                .end((err,res) => {
                    if(err) return done(err);
                    expect(JSON.parse(res.text).data.forgotPassword.message).to.deep.equal(
                        //token
                    )
                    done();
                })
        })

    })
