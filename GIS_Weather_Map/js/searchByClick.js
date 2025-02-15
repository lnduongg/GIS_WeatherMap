
  // Xử lý sự kiện click trên bản đồ
        map.on('click', function(event) {
            var coordinate = ol.proj.toLonLat(event.coordinate); // Chuyển đổi tọa độ click từ pixel sang lon, lat
            var lon = coordinate[0];
            var lat = coordinate[1];

            // Gửi yêu cầu tới API PHP để tìm quận
            fetch(`php/data_weather.php?lon=${lon}&lat=${lat}`)
                .then(response => response.json())
                .then(data => {
                    if (data.geometry) {
                        var format = new ol.format.GeoJSON();
                        var feature = format.readFeature(data.geometry, {
                            featureProjection: map.getView().getProjection()
                        });

                        // Highlight quận
                        highlightLayer.getSource().clear();
                        highlightLayer.getSource().addFeature(feature);

                        // Hiển thị tên quận vào textbox
                        document.getElementById("locationInput").value = data.shapename; // Hiển thị tên quận trong textbox


                        // Tính toán tọa độ trung tâm của quận (bounding box)
                        var extent = feature.getGeometry().getExtent();
                        map.getView().fit(extent, {
                            duration: 500,
                            maxZoom: 11,  // Giới hạn zoom tối đa
                            minZoom: 10   // Giới hạn zoom tối thiểu
                        });

                        // của bảo
                        locationName = data.shapename;
                        // của bảo

                        document.getElementById("weatherInfo").style.display = "block";
                        document.getElementById("forecastContainer").style.display = "block";
                    } else {
                        alert(data.error);
                    }
                })
                .catch(error => {
                    console.error('Error fetching district:', error);
                });

                // của bảo
          // Gửi yêu cầu tới OpenWeatherAPI để lấy dữ liệu thời tiết hiện tại
          getWeatherInformation(lon, lat, "3694d5e04effedb969032e4095e5a02d", "currentWeather");
          // Gửi yêu cầu tới OpenWeatherAPI để lấy dữ liệu dự báo thời tiết
          getWeatherInformation(lon, lat, "daad5ca44d5225cb7b4f44d756ce19a6", "forecastWeather");
                //của bảo
        });

        // Xử lý sự kiện khi nhấn nút "Xóa" // cách 2
        document.getElementById("clearButton").addEventListener("click", function() {
            // Xóa highlight trên bản đồ
            highlightLayer.getSource().clear();

            // Xóa nội dung trong textbox
            document.getElementById("locationInput").value = '';

            //ẩn thẻ thời tiết
            document.getElementById("weatherInfo").style.display = "none";
            document.getElementById("forecastContainer").style.display = "none";
        });  