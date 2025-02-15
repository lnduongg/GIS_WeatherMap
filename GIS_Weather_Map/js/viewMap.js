var map = new ol.Map({
    target: 'map', // Hiển thị bản đồ trong thẻ div có id="map"
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM() // Lớp bản đồ nền từ OpenStreetMap
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([105.804817, 21.028511]), // Tọa độ Hà Nội
        zoom: 13 // Mức độ phóng to
    }),

    controls: ol.control.defaults({
        zoom: false // Ẩn nút zoom
    })
});

var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(0, 123, 255, 0.5)' // Màu đỏ để highlight
    }),
    stroke: new ol.style.Stroke({
        color: '#007BFF',
        width: 2
    })
});

var highlightLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: highlightStyle
});
map.addLayer(highlightLayer);


// Thêm vector layer cho quận
var districtLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: highlightStyle
});
map.addLayer(districtLayer);

var locationName;