const jwt = require('jsonwebtoken');

const config = process.env;

const jwtGenerate = (empID) => {
    const accessToken = jwt.sign({ EmpID: empID }, config.ACCESS_TOKEN_SECRET, { expiresIn: "5m", algorithm: "HS256" })

    return accessToken
}

module.exports = {
    jwtGenerate
};
