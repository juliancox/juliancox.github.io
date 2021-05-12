import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';

import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import Vector from 'ol/layer/Vector';
import * as source from 'ol/source';
import * as olstyle from 'ol/style';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import Overlay from 'ol/Overlay';
import { Observable } from 'ol';

console.log('in locations');


var iconStyle = new olstyle.Style({
    image: new olstyle.Icon({
        anchor: [0.5, 1],
        src: '/images/marker.png',
    })
});

var labelStyle = new olstyle.Style({
    text: new olstyle.Text({
        font: '10px Calibri,sans-serif',
        overflow: true,
        scale: 1,
        fill: new olstyle.Fill({
            color: '#000'
        }),
        padding: [2, 3, 1, 5],
        backgroundFill: new olstyle.Stroke({
            color: '#fff',
            width: 3
        }),
        offsetY: -12
    })
});

var style = [iconStyle, labelStyle];


const locations = [
    new Feature({
        geometry: new Point(proj.fromLonLat([174.3205840, -35.7227244])),
        name: 'Whangarei',
        offsetX: -40,
        offsetY: -20,
        href: '#whangarei'
    }),new Feature({
        geometry: new Point(proj.fromLonLat([174.7758079, -36.8591584])),
        name: 'Auckland',
        offsetX: 38,
        offsetY: -20,
        href: '#auckland'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([ 175.27140957, -37.7995873])),
        name: 'Hamilton',
        offsetX: -36,
        offsetY: -20,
        href: '#hamilton'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([176.9948102, -37.949992])),
        name: 'Whakatane',
        offsetX: 40,
        offsetY: -20,
        href: '#whakatane'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([174.0724078, -39.0565451])),
        name: 'New Plymouth',
        offsetX: -48,
        offsetY: -20,
        href: '#newply'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([176.84296389929284,  -39.64181479854006])),
        name: 'Hastings',
        offsetX: 36,
        offsetY: -20,
        href: '#hastings'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([175.61113, -40.35636])),
        name: 'Palmerston North',
        offsetX: -56,
        offsetY: -20,
        href: '#palmnth'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([174.77727, -41.27898])),
        name: 'Wellington',
        offsetX: 38,
        offsetY: -20,
        href: '#wellington'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([171.20962167, -42.4523367])),
        name: 'Greymouth',
        offsetX: 38,
        offsetY: -20,
        href: '#greymouth'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([172.636648, -43.53104008])),
        name: 'Christchurch',
        offsetX: 46,
        offsetY: -20,
        href: '#christchurch'
    }),
    new Feature({
        geometry: new Point(proj.fromLonLat([170.5026, -45.8746])),
        name: 'Dunedin',
        offsetX: 38,
        offsetY: -20,
        href: '#dunedin'
    })
];

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            minZoom: 10, // visible at zoom levels 14 and below
            source: new OSM(),
          }),
        new TileLayer({
            maxZoom: 10,
            source: new XYZ({
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
        }),

        new Vector({
            source: new source.Vector({
                features: locations
            }),
            style: function (feature) {
                labelStyle.getText().setText(feature.get('name'));
                labelStyle.getText().setOffsetX(feature.get('offsetX'));
                labelStyle.getText().setOffsetY(feature.get('offsetY'));
                return style;
            }
        })

    ],
    view: new View({
        center: proj.fromLonLat([171.77006523273894, -41.24093721677914]),
        zoom: 5,
    })
});

map.on('singleclick', function (evt) {
    let done = false;
    map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        if (!done) {
            const href = feature.get('href');
            done = true;
            document.location.hash = href;
        }
    });
});

const isMobile = function() {
    return /Chrome\/|Mobile( Safari)?\/|Opera M(in|ob)i\/|w(eb)?OSBrowser\/|Mobile\;|Tablet\;/.test(navigator.userAgent);
}

const links = document.querySelectorAll("[href^='tel:+']");
links.forEach(function (link) {
    link.addEventListener('click', function (evt) {
        if (!isMobile()) {
            const href = link.getAttribute('href');
            let num = href.split('+64')[1];
            num = '0' + num
            let parts = num.split('');
            parts.splice(-7,0,' ');
            parts.splice(-4,0,' ');
            link.innerHTML = parts.join('');
            evt.stopPropagation();
            evt.preventDefault();
        }
    })
});