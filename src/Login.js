import React from 'react'
import querystring from 'query-string'
import { Container } from 'react-bootstrap'

var client_id = 'ec7e3ec691014d779e52e5e8e07b4329'; // Your client id
var client_secret = '23f0e9b881da4d398e0ac4482e61c30a'; // Your secret
var redirect_uri = 'http://localhost:3000'; // Your redirect uri


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


var scope = 'user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state';
// var scope = 'user-read-private';
var state = generateRandomString(16);
const AUTH_URL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    });

export default function Login() {
    return (
        <Container>
            <a className='btn btn-success btn-lg' href={AUTH_URL}>
                Login with Spotify
            </a>
        </Container>
    )
}