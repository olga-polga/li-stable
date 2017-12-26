import React, {Component, PropTypes} from 'react';
import ListItem from './ListItem';
import ViewArea from "./Gallery";
import ListingForm from "./ListingForm";
import {Icon} from 'react-fa'
import axios from 'axios';
var items = "...loading...";

const sel1 = [
    {id: '1451934403379-ffeff84932da', caption: 'Photo by Gwen Weustink', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/I3C1sSXj1i8 (Leopard)
    {id: '1499933374294-4584851497cc', caption: 'Photo by Gwen Weustink', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/I3C1sSXj1i8 (Leopard)
    {id: '1493809842364-78817add7ffb', caption: 'Photo by Adam Willoughby-Knox', orientation: 'landscape', useForDemo: true },
    {id: '1502005229762-cf1b2da7c5d6', caption: 'Photo by Teddy Kelley', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/cmKPOUgdmWc (Deer)
    {id: '1499916078039-922301b0eb9b', caption: 'Photo by Jay Ruzesky', orientation: 'landscape', useForDemo: true}
];

const sel2 = [
    {id: '1430285561322-7808604715df', caption: 'Photo by Gwen Weustink', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/I3C1sSXj1i8 (Leopard)
    {id: '1484154218962-a197022b5858', caption: 'Photo by Gaetano Cessati', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/YOX8ZMTo7hk (Baby Crocodile)
    {id: '1464288550599-43d5a73451b8', caption: 'Photo by Boris Smokrovic', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/n0feC_PWFdk (Dragonfly)
    {id: '1480434935263-07efee66f5b7', caption: 'Photo by Gwen Weustink', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/I3C1sSXj1i8 (Leopard)
    {id: '1501183638710-841dd1904471', caption: 'Photo by Alan Emery', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/emTCWiq2txk (Beetle)
];
const sel3 = [
    {id: '1475855581690-80accde3ae2b', caption: 'Photo by Gaetano Cessati', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/YOX8ZMTo7hk (Baby Crocodile)
    {id: '1489171078254-c3365d6e359f', caption: 'Photo by Teddy Kelley', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/cmKPOUgdmWc (Deer)
    {id: '1499916078039-922301b0eb9b', caption: 'Photo by Jay Ruzesky', orientation: 'landscape', useForDemo: true}, // https://unsplash.com/photos/h13Y8vyIXNU (Walrus)
    {id: '1495433324511-bf8e92934d90', caption: 'Photo by Ján Jakub Naništa', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/xqjO-lx39B4 (Scottish Highland Cow)
    {id: '1502005097973-6a7082348e28', caption: 'Photo by Eric Knoll', orientation: 'landscape', useForDemo: true}
];


function makeUnsplashSrc(id) {
    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}

function makeUnsplashSrcSet(id, size) {
    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`;
}

function makeUnsplashThumbnail(id, orientation = 'landscape') {
    const dimensions = orientation === 'square'
        ? 'w=110&h=110'
        : 'w=170&h=100';

    return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`;
}


export default class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = { selection: null};

        this.showPix = this.showPix.bind(this);
        this.addListing = this.addListing.bind(this);
        this.addPhoto = this.addPhoto.bind(this);

        this.apiUrl = process.env.REACT_APP_REPO_URL;
    }
    // Lifecycle method
    componentDidMount(){
        // Make HTTP request with Axios
        axios.get(this.apiUrl)
            .then((response) => {
                // Set state with result
                this.setState({listings:response.data._embedded.houses});
            });
    }


    renderItems() {
        if (this.state.listings !== undefined)
            return this.state.listings.map((item) =>
            <ListItem key={item.id} id={item.id} value={item.address} handleClick={this.showPix}/>);
    }

    addListing(newListing) {
        if (newListing !== undefined) {
            var newItem = {};
            newItem.id = Math.floor(Math.random() * 5000);
            newItem.address = newListing;

            var updates = this.state.listings.slice();
            updates.push(newItem);
            this.setState({listings: updates})
        }
    }

    addPhoto() {
        if (this.state.selection !== null) {
            alert("@TODO: add images for listing #" + this.state.selection)
        }
    }

    showPix(key) {
        console.log(key);
        this.setState({selection: key})
    }

    render() {
        items = this.renderItems(this.state.listings);
        let gallery = null;
        let source = null;
        try {
            source = eval("sel" + this.state.selection)
        } catch (e) {
            //TODO:
        }
        if (source === null) {
            gallery =
                <pre>
                    <code>
                        {JSON.stringify(this.state.listings, null, "\t")}
                    </code>
                </pre>
        } else {
            gallery = <ViewArea ref="viewArea" images={source.map(({caption, id, orientation, useForDemo}) => ({
                src: makeUnsplashSrc(id),
                thumbnail: makeUnsplashThumbnail(id, orientation),
                srcSet: [
                    makeUnsplashSrcSet(id, 333),
                    makeUnsplashSrcSet(id, 800),
                    makeUnsplashSrcSet(id, 500),
                    makeUnsplashSrcSet(id, 320),
                ],
                caption,
                orientation,
                useForDemo
            }))}/>
        }


        return (
            <div className="container">
                <div className="column menu">
                    {items}
                    <ListingForm addListing={this.addListing}/>
                </div>

                <div className="column main">
                    {gallery}
                    <Icon name="camera" size="lg" onClick={this.addPhoto} />
                </div>
            </div>

        )
    }
}



