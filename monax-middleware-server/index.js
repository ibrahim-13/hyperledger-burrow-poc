"use strict";

/**
Copyright (C) 2019 MD. Ibrahim Khan

Project Name: Hyperledger Burrow Test Application
Author: MD. Ibrahim Khan
Author's Email: ib.arshad777@gmail.com

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this
   list of conditions and the following disclaimer in the documentation and/or
   other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of the contributors may
   be used to endorse or promote products derived from this software without
   specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTIONS) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
OF THE POSSIBILITY OF SUCH DAMAGE.
**/

Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var cors = require("cors");
var fs = require("fs");
var monax = require("@monax/burrow");
//var fs = require("fs");
//var monax = require("@monax/burrow");
var burrow_url = "localhost:10997";
var account = "69BF2B3D56CD78B96456C40532933AA74A9C0659";
var options = { objectReturn: true };
var burrow = monax.createInstance(burrow_url, account, options);
var abi = JSON.parse(fs.readFileSync("abi.json").toString());
var cio = burrow.contracts.new(abi);
var address = "58D5647D044A5AA9EF553B0C8C0717F98B6BDEE2";
function err(e) {
    console.log("ERROR OUTPUT -->");
    console.log(e);
}
// Express App
var app = Express();
// Express middleware
/* app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
}); */
app.use(cors());
app.get("/", function (req, res, next) {
    var ret = { status: true, result: { hash: "null" } };
    if (req.query.data) {
        var raw_data = Buffer.from(req.query.data, "base64").toString();
        var data = void 0;
        try {
            data = JSON.parse(raw_data);
        }
        catch (err) {
            ret.status = false;
            ret.err = "JSON parse failed";
            res.send(JSON.stringify(ret));
            next();
            return;
        }
        if (data.name == "getInt") {
            var tmp = cio.getInt.at(address).then(function (data) {
                ret.result.hash = data.hash;
                ret.result.data = data.raw;
                res.send(JSON.stringify(ret));
                next();
            }).catch(err);
        }
        else if (data.name == "setInt") {
            if (!data.param) {
                ret.status = false;
                ret.err = "Param not found for " + data.name;
                res.send(JSON.stringify(ret));
                next();
                return;
            }
            var tmp = cio.setInt.at(address, data.param).then(function (data) {
                ret.result.hash = data.hash;
                res.send(JSON.stringify(ret));
                next();
            }).catch(err);
        }
        else if (data.name == "getBool") {
            var tmp = cio.getBool.at(address).then(function (data) {
                ret.result.hash = data.hash;
                ret.result.data = data.raw;
                res.send(JSON.stringify(ret));
                next();
            }).catch(err);
        }
        else if (data.name == "setBool") {
            if (!data.param) {
                ret.status = false;
                ret.err = "Param not found for " + data.name;
                res.send(JSON.stringify(ret));
                next();
                return;
            }
            var tmp = cio.setBool.at(address, data.param).then(function (data) {
                ret.result.hash = data.hash;
                res.send(JSON.stringify(ret));
                next();
            }).catch(err);
        }
        else if (data.name == "getString") {
            var tmp = cio.getString.at(address).then(function (data) {
                ret.result.hash = data.hash;
                ret.result.data = data.raw;
                res.send(JSON.stringify(ret));
                next();
            }).catch(err);
        }
        else if (data.name == "setString") {
            if (!data.param) {
                ret.status = false;
                ret.err = "Param not found for " + data.name;
                res.send(JSON.stringify(ret));
                next();
                return;
            }
            var tmp = cio.setString.at(address, data.param).then(function (data) {
                ret.result.hash = data.hash;
                res.send(JSON.stringify(ret));
                next();
            }).catch(err);
        }
        else {
            ret.status = false;
            ret.err = "Function not recognized";
            res.send(JSON.stringify(ret));
            next();
        }
    }
    else {
        ret.status = false;
        ret.err = "No data param";
        res.send(JSON.stringify(ret));
        next();
    }
});
app.listen(3000, "0.0.0.0", function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Starting server in 0.0.0.0:3000");
    }
});
