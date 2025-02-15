const apiKey = 'c2db4dee35278bb4c148f0f8abd0d588';

const weatherLayers = {
    clouds: `https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${apiKey}`,
    precipitation: `https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${apiKey}`,
    wind: `https://tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=${apiKey}`,
    pressure: `https://tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid=${apiKey}`,
    temperature: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`
};

const layerOpacity = {
    clouds: 1,
    precipitation: 1,
    wind: 1,
    pressure: 1,
    temperature: 1
};

let activeLayer = null; // Lưu trữ lớp bản đồ hiện tại
let activeButton = null; // Lưu trữ nút hiện tại

// Hàm để thêm lớp bản đồ và áp dụng opacity
function toggleWeatherLayer(layerKey, buttonElement) {
    const sliders = document.querySelectorAll('.opacity-slider');

    // Ẩn tất cả các thanh trượt khi chọn nút khác
    sliders.forEach(slider => slider.classList.add('hidden'));

    if (activeButton === buttonElement) {
        map.removeLayer(activeLayer);
        activeLayer = null;
        activeButton.classList.remove('active');
        activeButton = null;

        document.querySelectorAll('.legend').forEach(legend => legend.classList.add('hidden'));
        return;
    }

    if (activeLayer) {
        map.removeLayer(activeLayer);
        activeButton.classList.remove('active');
    }

    const newLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: weatherLayers[layerKey]
        }),
        opacity: layerOpacity[layerKey] // Áp dụng opacity lưu trữ
    });

    map.addLayer(newLayer);
    activeLayer = newLayer;

    buttonElement.classList.add('active');
    activeButton = buttonElement;

    document.querySelectorAll('.legend').forEach(legend => legend.classList.add('hidden'));

    const legendId = `${layerKey}Legend`;
    const legendElement = document.getElementById(legendId);
    if (legendElement) {
        legendElement.classList.remove('hidden');
    }

    // Hiển thị thanh trượt tương ứng
    const sliderId = `${layerKey}OpacitySlider`;
    const sliderElement = document.getElementById(sliderId);
    if (sliderElement) {
        sliderElement.classList.remove('hidden');
        const input = sliderElement.querySelector('input[type="range"]');
        input.value = layerOpacity[layerKey]; // Cập nhật vị trí thanh trượt
    }
}



function updateOpacity(value) {
    if (activeLayer) {
        activeLayer.setOpacity(value); // Cập nhật opacity cho lớp bản đồ hiện tại

        const activeLayerKey = Object.keys(weatherLayers).find(key => activeLayer.getSource().getUrls()[0] === weatherLayers[key]);
        if (activeLayerKey) {
            layerOpacity[activeLayerKey] = value;
        }
    }
}

document.querySelectorAll('.opacity-slider input[type="range"]').forEach(slider => {
    slider.addEventListener('input', function (event) {
        const layerKey = event.target.parentElement.id.replace('OpacitySlider', '');
        const opacityValue = parseFloat(event.target.value);
        layerOpacity[layerKey] = opacityValue;

        if (activeLayer && activeButton && activeButton.id.includes(layerKey)) {
            activeLayer.setOpacity(opacityValue);
        }
    });
});

function setupWeatherLayerButtons() {
    document.getElementById('cloudsButton').addEventListener('click', function () {
        toggleWeatherLayer('clouds', this);
    });
    document.getElementById('precipitationButton').addEventListener('click', function () {
        toggleWeatherLayer('precipitation', this);
    });
    document.getElementById('windButton').addEventListener('click', function () {
        toggleWeatherLayer('wind', this);
    });
    document.getElementById('pressureButton').addEventListener('click', function () {
        toggleWeatherLayer('pressure', this);
    });
    document.getElementById('temperatureButton').addEventListener('click', function () {
        toggleWeatherLayer('temperature', this);
    });
}

document.addEventListener('DOMContentLoaded', setupWeatherLayerButtons);
