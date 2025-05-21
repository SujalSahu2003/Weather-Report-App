function getWeather() {
            let location = document.getElementById('location').value;
            if (!location) {
                alert('Please enter a location');
                return;
            }

            let apiKey = '3e99363d6f9e41e7b48140717252402';
            let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('weather').innerHTML = `
                        <h3>📍 ${data.location.name}, ${data.location.country}</h3>
                        <img src="https:${data.current.condition.icon}" alt="Weather Icon">
                        <p><strong>🌡️ Temperature:</strong> ${data.current.temp_c}°C</p>
                        <p><strong>🌤️ Condition:</strong> ${data.current.condition.text}</p>
                        <p><strong>💧 Humidity:</strong> ${data.current.humidity}%</p>
                        <p><strong>🌬️ Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
                        <p><strong>🤗 Feels Like:</strong> ${data.current.feelslike_c}°C</p>
                        <p><strong>📊 Pressure:</strong> ${data.current.pressure_mb} mb</p>
                        <p><strong>🔆 UV Index:</strong> ${data.current.uv}</p>
                        <p><strong>🌫️ Air Quality (PM2.5):</strong> ${data.current.air_quality.pm2_5.toFixed(2)} µg/m³</p>
                        <button onclick="showMoreDetails('${location}')" style="margin-top:10px; padding:8px 15px; background:#007BFF; color:#fff; border:none; border-radius:5px; cursor:pointer;">📋 More Details</button>
                    `;

                    document.getElementById('more-details').innerHTML = ''; // Clear previous extra details
                })
                .catch(error => alert('❌ Invalid location or network issue'));
        }

        function showMoreDetails(location) {
            let apiKey = '3e99363d6f9e41e7b48140717252402';
            let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const current = data.current;
                    const air = current.air_quality;

                    document.getElementById('more-details').innerHTML = `
                        <h3>📋 More Weather Details</h3>
                        <p><strong>🌧️ Precipitation:</strong> ${current.precip_mm} mm</p>
                        <p><strong>💨 Wind Direction:</strong> ${current.wind_dir}</p>
                        <p><strong>🌪️ Gust Speed:</strong> ${current.gust_kph} km/h</p>
                        <p><strong>☁️ Cloud Cover:</strong> ${current.cloud}%</p>
                        <p><strong>🌫️ Visibility:</strong> ${current.vis_km} km</p>
                        <p><strong>📊 Pressure:</strong> ${current.pressure_mb} mb</p>
                        <p><strong>🔆 UV Index:</strong> ${current.uv}</p>
                        <p><strong>🕒 Last Updated:</strong> ${current.last_updated}</p>
                        <h4>🌫️ Air Quality Index (µg/m³)</h4>
                        <p><strong>• PM2.5:</strong> ${air.pm2_5.toFixed(2)}</p>
                        <p><strong>• PM10:</strong> ${air.pm10.toFixed(2)}</p>
                        <p><strong>• CO:</strong> ${air.co.toFixed(2)}</p>
                        <p><strong>• NO₂:</strong> ${air.no2.toFixed(2)}</p>
                        <p><strong>• O₃:</strong> ${air.o3.toFixed(2)}</p>
                        <p><strong>• SO₂:</strong> ${air.so2.toFixed(2)}</p>
                    `;
                })
                .catch(error => {
                    document.getElementById('more-details').innerHTML = `<p style="color: red;">❌ Error fetching more details.</p>`;
                });
        }
