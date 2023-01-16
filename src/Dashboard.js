import React, { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"

import axios from "axios"
// const encodedParams = new URLSearchParams();
// encodedParams.append("country", "US");
// encodedParams.append("term", "synergy");

// const options = {
//     method: 'POST',
//     url: 'https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMusic',
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'X-RapidAPI-Key': 'de4618b15cmsh3d2ac8f4781e468p1ba0eejsna9cf24ec96b5',
//         'X-RapidAPI-Host': 'iTunesvolodimir-kudriachenkoV1.p.rapidapi.com'
//     },
//     data: encodedParams
// };

// axios.request(options).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });

const spotifyApi = new SpotifyWebApi({
    clientId: 'ec7e3ec691014d779e52e5e8e07b4329',
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()


    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
    }

    console.log(searchResults);


    useEffect(() => {
        if (!playingTrack) return
        axios.get('http://localhost:3001/trackfile', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            console.log(res.data)
        })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    // spotifyApi.getCategories({
    //     limit: 50,
    //     offset: 0,
    // })
    //     .then(function (data) {
    //         console.log(data.body);
    //     }, function (err) {
    //         console.log("Something went wrong!", err);
    //     });


    // spotifyApi.getCategory('Hyperpop')
    //     .then(function (data) {
    //         console.log(data.body);
    //     }, function (err) {
    //         console.log("Something went wrong!", err);
    //     });

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false;
        spotifyApi.searchTracks(search, { limit: 10 }).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[0].url,
                }
            })
            )
        })
        return () => cancel = true;
    }, [search, accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <h1>Music Spotter</h1>
            <h3>How are you feeling?</h3>
            <p>I'm feeling:</p>
            <DropdownMenu default="slow">
                <DropdownItem>shit</DropdownItem>
                <DropdownItem>lazy sad</DropdownItem>
                <DropdownItem>garbo</DropdownItem>
            </DropdownMenu>


            <select name="mood" id="mood">
                <option value="slow">Lazy</option>
                <option value="fast">Pumped</option>
                <option value="hard">Angry</option>
                <option value="sad">Deflated</option>
                <option value="nostalgic">Nostalgic</option>
                <option value="sexy">Desired</option>
            </select>

            <Form.Control
                type="search"
                placeholder="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {
                    searchResults.map(track => (
                        <TrackSearchResult
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                        />
                    ))
                }
            </div>
            <div>
                {/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}
            </div>
        </Container>
    )
}

function DropdownMenu(props) {
    const [open, setOpen] = useState(false);
    return (
        <div className="menu-button" onClick={() => setOpen(!open)}>
            <a>testing</a>
            {open && props.children}
        </div>
    )
}

function DropdownItem(props) {
    const [selection, setSelection] = useState(props.default);
    return (
        <li>
            <a href="#" className="itemButton" onClick={() => { setSelection(props.children) }}>
                {props.children}
            </a >

        </li >
    )
}