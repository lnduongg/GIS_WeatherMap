![Packagist Dependency Version](https://img.shields.io/badge/php-%5E8.0-blue?style=flat-square&logo=blue)
![Packagist Version](https://img.shields.io/badge/packagist-1.0-brightgreen?style=flat-square)
![Language Support](https://img.shields.io/badge/language-vietnamese-red?style=flat-square)
# GIS WeatherMap
- Đây là bản đồ thời tiết ứng dụng công nghệ GIS để theo dõi và dự báo thời tiết trên toàn thế giới.
- Sử dụng dữ liệu không gian từ geoBoundaries và dữ liệu thời tiết từ OpenWeatherMap.

## Các chức năng
- Chọn cấp độ chi tiết của khu vực để xem thông tin thời tiết ( Tỉnh hoặc Quận/huyện/thành phố )
- Chọn một địa điểm bằng con trỏ chuột để xem thông tin thời tiết và dự báo thời tiết tại địa điểm đó.
- Chọn và theo dõi các yếu tố thời tiết khác.
  
## Các công cụ cần thiết
- [x] [PostgreSQL](https://www.postgresql.org)
- [x] [PHP & VS Code](https://www.youtube.com/watch?v=RaH75OuHge8)
- [x] [Dữ liệu không gian cấp tỉnh ADM1](https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/CGAZ/geoBoundariesCGAZ_ADM1.zip)
- [x] [Dữ liệu không gian cấp thành phố ADM2](https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/CGAZ/geoBoundariesCGAZ_ADM2.zip)
- [x] [Tạo API cho OpenWeatherMap](https://www.youtube.com/watch?v=Xs4Uo-vAAGw)

## Khởi tạo dữ liệu
- [Thêm dữ liệu SHAPEFILE đã tải từ geoBoundaries vào trong PostgreSQL](https://www.youtube.com/watch?v=R-yPG5SMvow)
- Sau đó tạo một query trống trong PostgreSQL, khởi chạy chuỗi lệnh sau:
```sql
ALTER TABLE <tên bảng> ADD COLUMN lon DOUBLE PRECISION;
ALTER TABLE <tên bảng> ADD COLUMN lat DOUBLE PRECISION;

UPDATE <tên bảng>
SET lon = ST_X(ST_Centroid(geom)), lat = ST_Y(ST_Centroid(geom));
```
với 
```<tên bảng>```
là tên bảng đã tạo cho hai dữ liệu ADM1 và ADM2 trong PostgreSQL

## Thêm thông tin trong code
### data_weather.php
- Trong file ```data_weather.php``` nằm trong folder ```php```, tìm phần code:
```php
$host = '';
$dbname = '';
$user = '';
$password = '';
```
sau đó thêm các thông tin tương ứng với cài đặt PostgreSQL ( sửa cho cả hai biến ).

- Các bạn tìm đến biến
```php
$query = "
        SELECT *, ST_AsGeoJSON(geom) AS geometry
        FROM <table_adm2>
        WHERE ST_Contains(geom, ST_SetSRID(ST_Point($lon, $lat), 4326))
        LIMIT 1;
    ";
```
sửa <table_adm2> theo tên bảng ADM2 trong PostgreSQL

### get_weather_layers.js
- Trong file ```get_weather_layers.js``` nằm trong folder ```js```, các bạn tìm phần code:
```js
const apiKey = '';
```
và thêm key của API vừa tạo trên OpenWeatherMap.

## Khởi tạo một server trên php và chạy chương trình!
