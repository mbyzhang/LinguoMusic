import React from 'react';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

export default class MyPlaylists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: []
        };
    }

    componentDidMount() {
        fetch("/api/playlists")
            .then(resp => {
                console.log(resp);
                resp.json().then(data => {
                    this.setState({ playlists: data.playlists });
                });
            })
    }

    render() {
        return this.state.playlists.map(item =>
            <Menu.Item key={item.playlist_id}>
                <NavLink to={`/playlists/${item.playlist_id}`} className="nav-text"><Icon type="unordered-list" /> {item.playlist_name}</NavLink>
            </Menu.Item>
        )
    }
}