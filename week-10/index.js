"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertData = InsertData;
const pg_1 = require("pg");
function InsertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'mysecretpassword',
            database: 'postgres'
        });
        try {
            yield client.connect();
            const insertQuery = `
        INSERT INTO users(username, email, password)
        VALUES
        ($1, $2, $3)
        `;
            const values = [
                username,
                email,
                password
            ];
            const res = yield client.query(insertQuery, values);
            console.log("successfully inserted", res);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield client.end();
        }
    });
}
// InsertData('gkffhu','bdyhubwhuf@gmail.com',"bdbluyh")
function getUserData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'mysecretpassword',
            database: 'postgres'
        });
        try {
            yield client.connect();
            const selectQuery = `
        SELECT * FROM users
        WHERE email=$1
        `;
            const values = [
                email
            ];
            const res = yield client.query(selectQuery, values);
            if (res.rows.length > 0) {
                console.log("User data:", res.rows[0]);
                return res.rows[0];
            }
            else {
                console.log("User not found");
                return null;
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield client.end();
        }
    });
}
