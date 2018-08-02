import Map from '../src';

test('', () => {
    // Set up our document body
    document.body.innerHTML = `<div id="js-map"></div>`;

    Map.init('js-map', { 
        subscriptionKey: '',
        zoom: 11,
        center: [55.972247, -3.171403],
        tileLayers: [
            {
                url:  'https://atlas.microsoft.com/map/tile/png?api-version=1.0&layer=basic&style=main&zoom={z}&x={x}&y={y}&subscription-key={subscriptionKey}'
            }
        ],
        icon: {
            url: '../map-marker.svg',
            size: [25, 40]
        }
    });
    
});