let countrycityInput = document.getElementById('countrycity_input'), // let declares the data inside it as variables. This variable has a method to select an HTML element by its ID.
checkweatherBtn = document.getElementById('checkweatherBtn'), // This variable has a method which is getElementById to select an HTML element by its ID which is the checkweatherBtn.
api_key = '9672eb7d4fd80e69190c786a1f4332a0', // This code is the OpenWeatherMap API Key that can access to the OpenWeatherMap service.
currentWeatherCard = document.querySelectorAll('.weatherLeft .cardToday')[0], // This code has a method which is querySelectorAll to select the first element in a group of elements in CSS.
humidityValue = document.getElementById('humidityValue'), // This variable has a method which is getElementById to select an HTML element by its ID which is the humidityValue.
windspeedValue = document.getElementById('windspeedValue'); // This variable has a method which is getElementById to select an HTML element by its ID which is the windspeedValue.

function checkWeatherDetails(name, lat, lon, country, state){ // This code defines the first function called checkWeatherDetails that has five parameters. 
	let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`, // This is the URL of OpenWeatherMap API to fetch weather data using lati & longi.
	days = [ // Two arrays that contains the days of the week & months of the year.
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

	fetch(WEATHER_API_URL).then(res => res.json()).then(data => { // This fetch code sends a request to the OpenWeatherMap API and the response is converted into a JSON Format. 
		let date = new Date(); // This code creates a date variable and the new Date() code creates a date object to get the current date and time.
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
		`; // When current weather data is retrieved, the currentWeatherCard updates the contents of the HTML codes inside it.
		   // The information contains the current temperature, weather description, icons that represents the current weather, current date and time, and the city & country name.
		   // The ${__} code is used to reference a variable within a string.
		let {humidity} = data.main, // This code uses the destructuring technique which is to only get the humidity & windspeed specifically from the API Response.
		{speed} = data.wind; 
		humidityValue.innerHTML = `${humidity}%`; // This code updates the HTML Contents to show the humidity's percentage & windspeed's meters per second.
		windspeedValue.innerHTML = `${speed}m/s`; 
	}).catch(() => {
		alert('Failed to fetch current weather'); // If the fetch request fails, this catch code then displays the alert code message inside it.
	});
}

function checkCountryCityCoordinates(){ // This code defines the second function called checkCountryCityCoordinates that executes when the checkweatherBtn is clicked. 
	let countrycityName = countrycityInput.value.trim(); // This code retrieves the value entered by the user and it trims any whitespace or extra space on it.
	countrycityInput.value = ''; // This code clears the input field. 
	if(!countrycityName) return; // This code if the input field is empty, it returns.
	let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${countrycityName}&limit=1&appid=${api_key}`; // This is the URL of Geocoding API to fetch geographic coordinates of the city.
	fetch(GEOCODING_API_URL).then(res => res.json()).then(data => { // This fetch code sends a request to the OpenWeatherMap Geocoding API and the response is converted into a JSON Format. 
		let {name, lat, lon, country, state} = data[0]; 
		checkWeatherDetails(name, lat, lon, country, state); // When the data is retrieved, This code calls the function checkWeatherDetails with the retrieved data and display it.
	}).catch(() => {
		alert('Failed to fetch coordinates of ${countrycityName}'); // If the fetch request fails, this catch code then displays the alert code message inside it.
	});
}

checkweatherBtn.addEventListener('click', checkCountryCityCoordinates); // This code has an event listener and when the button is clicked, it calls the function checkCountryCityCoordinates.
