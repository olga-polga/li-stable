import React, {Component} from 'react';
import ListItem from './components/ListItem';
import ViewArea from "./components/Gallery";
import ListingForm from "./components/ListingForm";
import axios from 'axios';
import {ToastContainer} from 'react-toastr';
import Dropzone from 'react-dropzone'
import './App.css';
import './stylesheets/menu.css';
var items = "...loading...";

export default class Listable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: null,
            files: [],
            picturesUrl: null,
            sources: []
        };

        this.loadImages = this.loadImages.bind(this);
        this.addListing = this.addListing.bind(this);
        console.log(process.env);
        this.apiUrl = process.env.REACT_APP_REPO_URL + "/api/houses";
        this.onFileLoad = (e, file) => console.log(e.target.result, file.name);
    }

    // Lifecycle method
    componentDidMount() {
        // Make HTTP request with Axios
        axios.get(this.apiUrl)
            .then((response) => {
                // Set state with result
                this.setState({
                    listings: response.data._embedded.houses,
                    selection: response.data._embedded.houses[0].id,
                    picturesUrl: response.data._embedded.houses[0]._links.pictures.href
                })
                this.loadImages(1);
            });
    }


    renderItems() {
        if (this.state.listings !== undefined)
            return this.state.listings.map((item) =>
                <ListItem selected={this.state.selection} key={item.id} id={item.id} value={item.address}
                          handleClick={this.loadImages}/>);
    }


    addListing(newListing) {
        if (newListing !== undefined) {
            axios.post(process.env.REACT_APP_REPO_URL + '/api/houses', {
                address: newListing

            }).then(response => {
                console.log(response.status);

                this.refs.toastContainer.success(
                    "Added new Listing"
                );
                axios.get(this.apiUrl)
                    .then((response) => {
                        // Set state with result
                        this.setState({listings: response.data._embedded.houses});
                    });

            });
        }
    }

    
    loadImages(key) {
        const id = key - 1;
        const url = this.state.listings[id]._links.pictures.href;
        this.setState({
            selection: key,
            picturesUrl: url
        })
        axios.get(url)
            .then((response) => {
                const src = response.data._embedded.pictures.map(item =>
                    ({src: item.url}));
                console.log(JSON.stringify(src))

                this.setState({sources: src})
            });
    }

    onDrop(files) {
        const url = process.env.REACT_APP_UPLOAD_URL + "/upload"

        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("listingId", this.state.selection);

            // Make an AJAX upload request using Axios
            return axios.post(url, formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            }).then(response => {
                const data = response.data;
                console.log(data);
            })
        });

        // Once all the files are uploaded
        axios.all(uploaders).then(() => {
            console.log(" - all in -");
            this.loadImages(this.state.selection);
        });
    }


    render() {
        items = this.renderItems(this.state.listings);
        let pictures = this.state.sources.map(({src}) => (
            {
                src: src,
                thumbnail: src,
                srcSet: [
                    src.replace(/(.*)=.*/, '$1'),
                ],
                useForDemo: true
            }))
        let gallery = <ViewArea ref="viewArea" images={pictures}/>

        return (
            <div className="container">
                <div className="column menu">
                    {items}
                    <ListingForm addListing={this.addListing}/>
                </div>

                <div className="column main">
                    <ToastContainer ref="toastContainer" className="toast-top-right"/>
                    {gallery}
                    <Dropzone
                        onDrop={this.onDrop.bind(this)}
                        multiple
                        accept="image/*">
                        <p>Drop files here... <br/> or click me to upload</p>
                    </Dropzone>
                </div>
            </div>
        )
    }
}
