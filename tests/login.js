import should from "should"
import assert from "assert"
import request from "request"
import querystring from "querystring"

describe("login", function() {

  it("Login should redirect to home and return a user token", function(done) {
    const postData = querystring.stringify({
      username : "user",
      password : "foo",
    })

    const options = {
      uri: "http://" + "localhost" + ":" + "51015" +  "/login",
      followRedirect: false,
    }

    request.post(options)
    .form(postData)
    .on("response", function(res) {
      console.log(res.headers)
      res.statusCode.should.equal(302)
    })
    .on("data",function(data) {
      should.exist(data)
      should.fail(0,1,"Test not implemented")
      done()
    })
    .on("error", function(e) {
      should.fail(0,1,"Problem with request: " + e.message)
    })
  })
})