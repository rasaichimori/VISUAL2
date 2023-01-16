import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track);
    }
    return (
        <div
            className="d-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handlePlay}
        >
            <img src={track.albumUrl} style={{ height: "100px", width: "100px" }} />
            <div className="ml-3">
                <p>{track.title}</p>
                <p className="text-muted">{track.artist}</p>
            </div>
        </div>
    )
}