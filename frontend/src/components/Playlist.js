import React from 'react';
import { Table } from 'antd';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.playlist != prevProps.playlist) {
            console.log(this.props.playlist);
            this.setState({ data: this.props.playlist });
        }

        if (this.props.playerInstance != prevProps.playerInstance) {

        }
        
        if (this.props.playlistId != prevProps.playlistId) {
            if (this.props.playlist != undefined) return;

            fetch(`/api/playlists/${this.props.playlistId}`).then((resp) => {
                if (resp.status != 200) {
                    console.log("Bad status code " + resp.status);
                }

                resp.json().then((data) => {
                    this.setState(resp.playlist);
                });
            })
        }
    }

    play = (index) => {
        const playerInstance = this.props.playerInstance;

        if (!playerInstance) {
            console.log("No player instance specified!");
            return;
        }

        if (this.props.playlist != playerInstance.state.playlist) {
            console.log("Loading new playlist");
            playerInstance.loadPlaylist(this.props.playlist);
        }
        playerInstance.play(index);
    };

    render() {
        const columns = [{
            title: "Title",
            dataIndex: "song_name",
            key: "title",
            render: (text, row, index) => <a onClick={ () => this.play(index) }>{ text } </a>
        }, {
            title: "Artist",
            dataIndex: "artist",
            key: "artist"
        }, {
            title: "Album",
            dataIndex: "album_name",
            key: "album"
        }];

        return <Table dataSource={ this.state.data } columns={columns} />;
    }
}