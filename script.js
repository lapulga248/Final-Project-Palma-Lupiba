let countrycityInput = document.getElementById('countrycity_input'),
checkweatherBtn = document.getElementById('checkweatherBtn'),
api_key = '9672eb7d4fd80e69190c786a1f4332a0',
currentWeatherCard = document.querySelectorAll('.weatherLeft .cardToday')[0];

function checkWeatherDetails(name, lat, lon, country, state){
	let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
	days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
		],
	months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
		];

	fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
		let date = new Date();
		currentWeatherCard.innerHTML = `
			<div class="weatherCurrent">
				<div class="todayDetails">
					<p>Today</p>
					<h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
					<p>${data.weather[0].description}</p>
				</div>
					<div class="weatherIcon">
						<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"  alt="">
					</div>
			</div>
			<hr>
			<div class="todayBottom">
				<p><i class="fa-light fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]}, ${date.getFullYear()}</p>
				<p><i class="fa-light fa-location-dot"></i> ${name}, ${country}</p>
			</div>
		`;
	}).catch(() => {
		alert('Failed to fetch current weather');
	});
}

function checkCountryCityCoordinates(){
	let countrycityName = countrycityInput.value.trim();
	countrycityInput.value = '';
	if(!countrycityName) return;
	let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${countrycityName}&limit=1&appid=${api_key}`;
	fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
		let {name, lat, lon, country, state} = data[0];
		checkWeatherDetails(name, lat, lon, country, state);
	}).catch(() => {
		alert('Failed to fetch coordinates of ${countrycityName}');
	});
}

checkweatherBtn.addEventListener('click', checkCountryCityCoordinates); 