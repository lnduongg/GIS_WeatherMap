<?php
$host = 'localhost';
$dbname = 'world';
$user = 'postgres';
$password = 'lnduong270403';

$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Kết nối cơ sở dữ liệu thất bại!");
}



$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$districtName = isset($_GET['districtName']) ? $_GET['districtName'] : null;

if ($lon && $lat) {
    $query = "
        SELECT *, ST_AsGeoJSON(geom) AS geometry
        FROM world_adm2
        WHERE ST_Contains(geom, ST_SetSRID(ST_Point($lon, $lat), 4326))
        LIMIT 1;
    ";

    $result = pg_query($conn, $query);

    if ($result) {
        $row = pg_fetch_assoc($result);
        if ($row) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Không tìm thấy quận tại vị trí này"]);
        }
    } else {
        echo json_encode(["error" => "Lỗi truy vấn cơ sở dữ liệu"]);
    }
} elseif ($districtName) {
    $query = "
        SELECT *, ST_AsGeoJSON(geom) AS geometry
        FROM world_adm2
        WHERE LOWER(shapename) LIKE LOWER('%$districtName%')
        LIMIT 1;
    ";

    $result = pg_query($conn, $query);

    if ($result) {
        $row = pg_fetch_assoc($result);
        if ($row) {
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Không tìm thấy quận có tên: $districtName"]);
        }
    } else {
        echo json_encode(["error" => "Lỗi truy vấn cơ sở dữ liệu"]);
    }
} else {
    echo json_encode(["error" => "Vui lòng cung cấp tọa độ hoặc tên quận"]);
}

pg_close($conn);
