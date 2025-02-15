<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bản đồ OSM toàn màn hình</title>
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>
    <link rel="stylesheet" href="cs/style.css">
</head>

<body>
    <!-- Textbox tìm kiếm với biểu tượng kính lúp -->
    <div id="searchBox">
        <input type="text" id="locationInput" placeholder="Tìm kiếm khu vực">
        <button id="searchButton">
            <img src="https://img.icons8.com/material-outlined/24/search.png" alt="Search">
        </button>

        </button>
        <!-- Nút Xóa -->
        <button id="clearButton">Xóa</button>
    </div>

    <?php include './php/weather_layers.php'; ?>

    <!-- Bản đồ -->
    <div id="map"></div>

<!-- của bảo    -->
    <!-- Hiển thị thông tin thời tiết-->
    <div id="weatherInfo" style="display: none">
        <!-- <p>Lựa chọn vùng cần xem thông tin thời tiết</p> -->
    </div>

    <!-- Hiển thị dự báo thời tiết-->
    <div id="forecastContainer" style="display: none">
        <!-- <p style = "margin-left: 20px">Thông tin dự báo thời tiết</p> -->
    </div>
<!-- của bảo -->


    <?php include './php/data_weather.php'; ?>

    <!-- của bảo -->
    <script src="./js/get_weatherAPI.js"></script>
    <!-- của bảo -->

    <script src="./js/viewMap.js"></script>     
    <script src="./js/get_weather_layers.js"></script>    

    <script src="./js/searchByEnter.js"></script>
    <script src="./js/searchByClick.js"></script>
</body>

</html>