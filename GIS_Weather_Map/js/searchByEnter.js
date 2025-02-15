document.getElementById("clearButton").addEventListener("click", function () {
    // Xóa highlight trên bản đồ
    highlightLayer.getSource().clear();

    // Xóa nội dung trong textbox
    document.getElementById("locationInput").value = '';

    //ẩn thẻ thời tiết
    document.getElementById("weatherInfo").style.display = "none";
    document.getElementById("forecastContainer").style.display = "none";
});


// Hàm tìm kiếm quận theo tên
function fetchDistrictByName(districtName) {
    fetch(`php/data_weather.php?districtName=${encodeURIComponent(districtName)}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.geometry) {
                var format = new ol.format.GeoJSON();
                var feature = format.readFeature(data.geometry, {
                    featureProjection: map.getView().getProjection()
                });

                // Highlight quận trên bản đồ
                highlightLayer.getSource().clear();
                highlightLayer.getSource().addFeature(feature);

                // Zoom tới quận được tìm thấy
                var extent = feature.getGeometry().getExtent();
                map.getView().fit(extent, { 
                    duration: 500 ,
                    maxZoom: 11,  // Giới hạn zoom tối đa
                    minZoom: 10   // Giới hạn zoom tối thiểu
                });

                //cảu bảo
                //tính lon, lat của vùng được highlight
                var center = ol.extent.getCenter(extent); // Lấy tâm phạm vi (extent)
                var lonLat = ol.proj.toLonLat(center, map.getView().getProjection()); // Chuyển sang tọa độ địa lý
                locationName = data.shapename;

                // Gửi yêu cầu tới OpenWeatherAPI để lấy dữ liệu thời tiết hiện tại
                getWeatherInformation(lonLat[0], lonLat[1], "3694d5e04effedb969032e4095e5a02d", "currentWeather");
                // Gửi yêu cầu tới OpenWeatherAPI để lấy dữ liệu dự báo thời tiết
                getWeatherInformation(lonLat[0], lonLat[1], "daad5ca44d5225cb7b4f44d756ce19a6", "forecastWeather");

                //của bảo

                document.getElementById("weatherInfo").style.display = "block";
                document.getElementById("forecastContainer").style.display = "block";

            } else {
                console.log("Không tìm thấy quận!");
                highlightLayer.getSource().clear();
            }
        })
        .catch(error => {
            console.error('Error fetching district by name:', error);
        });

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('locationInput').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            var districtName = this.value.trim();
            if (districtName) {
                fetchDistrictByName(districtName);
            }
        }
    });
});


// Xử lý sự kiện click nút Tìm kiếm
document.getElementById('searchButton').addEventListener('click', function () {
    var districtName = document.getElementById('locationInput').value.trim();
    if (districtName) {
        fetchDistrictByName(districtName);
    }
});