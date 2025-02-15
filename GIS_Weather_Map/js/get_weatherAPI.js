// Hàm gọi đến OpenWeatherAPI
async function getWeatherInformation(lon, lat, apiKey, apiType) {
    let api;

    if (apiType === "currentWeather"){
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=vi&units=metric&appid=${apiKey}`;  
    } else {
        api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=vi&units=metric&appid=${apiKey}`;
    }

    try {
        const response = await fetch(api);

         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dữ liệu thời tiết:", data);

        // Xử lý dữ liệu thời tiết ở đây
        if (apiType === "currentWeather"){
           displayWeather(data);
        } else {
            displayForecast(data);
        }

    } catch (error) {
       console.error("Lỗi khi gọi API:", error);
        displayError("Không thể tải thông tin thời tiết. Vui lòng thử lại sau.");
    }
 }

// Hàm viết hoa chữ cái đầu
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Hàm hiển thị lỗi khi truy vấn API
function displayError(message) {
    const weatherInfoDiv = document.getElementById("weatherInfo");
     if(!weatherInfoDiv) return;
    weatherInfoDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Hàm xử lý dữ liệu trả về từ API và hiển thị giao diện thông tin thời tiết hiện tại
function displayWeather(weatherData) {
    const weatherInfoDiv = document.getElementById("weatherInfo");
      if(!weatherInfoDiv) return;

    const temperature = weatherData.main.temp;
    const description = capitalizeFirstLetter(weatherData.weather[0].description);
    const cityName = locationName;
    const icon = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const country = weatherData.sys.country;
    const clouds = weatherData.clouds.all;
    const humidity = weatherData.main.humidity;
    const pressure = weatherData.main.pressure;                
    const windSpeed = weatherData.wind.speed;
    const windDirection = weatherData.wind.deg;
    const windDirectionText = `${windDirection}°`

   const weatherHTML = `
         <h2>${cityName}, ${country}</h2>
          <img src="${iconUrl}" alt="Weather Icon">
          <table>
              <tr>
                    <th>Nhiệt độ:</th>
                  <td>${temperature}°C</td>
              </tr>
              <tr>
                    <th>Mô tả:</th>
                  <td>${description}</td>
             </tr>
            <tr>
                  <th>Độ ẩm:</th>
                   <td>${humidity}%</td>
              </tr>
              <tr>
                   <th>Áp suất:</th>
                   <td>${pressure} hPa</td>
              </tr>
               <tr>
                  <th>Độ che phủ mây:</th>
                    <td>${clouds}%</td>
               </tr>
               <tr>
                    <th>Tốc độ gió:</th>
                   <td>${windSpeed} m/s</td>
               </tr>
               <tr>
                 <th>Hướng gió:</th>
                   <td>${windDirectionText}</td>
                </tr>
            </table>
   `;

    weatherInfoDiv.innerHTML = weatherHTML;
}

// Hàm xử lý dữ liệu trả về từ API và hiển thị giao diện dự báo thông tin thời tiết 
function displayForecast(forecastData) {
    const forecastContainer = document.getElementById("forecastContainer");
     if(!forecastContainer) return;

    forecastContainer.innerHTML = ""; // Clear loading message

    const country = forecastData.city.country;

    const groupedForecast = groupByDate(forecastData.list);

    let forecastHTML = ""; // Initialize an empty string to accumulate HTML
    for (const date in groupedForecast) {
       forecastHTML += `
                <div class="forecastDay">
                    <h3>${date}</h3>
                     ${groupedForecast[date].map(item => createForecastItemHTML(item)).join('')}
                 </div>
           `;

   }
  forecastContainer.insertAdjacentHTML('beforeend', forecastHTML);

}

// Hàm nhóm kết quả trả về theo ngày
function groupByDate(forecastList) {
 const grouped = {};
    forecastList.forEach(item => {
     const dateTime = new Date(item.dt * 1000);
     const date = dateTime.toLocaleDateString();
     if (!grouped[date]) {
         grouped[date] = [];
      }
        grouped[date].push(item);
    });
   return grouped;
}

// Hàm tạo ra giao diện cho từng mục dự báo
function createForecastItemHTML(item) {
     const dateTime = new Date(item.dt * 1000);
    const formattedTime =  dateTime.toLocaleTimeString();
     const temperature = Math.round(item.main.temp);
    const description = capitalizeFirstLetter(item.weather[0].description);
     const icon = item.weather[0].icon;
     const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const humidity = item.main.humidity;
    const windSpeed = item.wind.speed;
   const windDirection = item.wind.deg;
     const windDirectionText = windDirection;
     const precipitation = item.pop ? Math.round(item.pop * 100) : 0;

     return `
     <div class="forecastItem">
        <img src="${iconUrl}" alt="Weather Icon">
        <div class="temp-unit-container">
             <span class="temp-unit">${temperature}<sup>°C</sup></span>
        </div>
        <div class="info">
           <p><strong>${formattedTime}</strong></p>
            <p>Lượng mưa: ${precipitation}%</p>
           <p>Độ ẩm: ${humidity}%</p>
             <p>Gió: ${windSpeed} km/h</p>
        </div>
    </div>
    `;
}