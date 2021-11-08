var last_users = {};
(function () {
	axios
		.get('/helpers')
		.then((response) => {
			last_users = response.data; //response.data
		})
		.catch((error) => console.log(error));
		console.log(last_users)
})();

navigator.geolocation.getCurrentPosition(success, error, options);

function success(pos) {
	var coordintes = pos.coords;
	var mapOptions = {
		center: [coordintes.latitude, coordintes.longitude],
		zoom: 8,
	};

	var thisUser = {
		id: userId,
		name: userName + ' ' + userLastName,
		lat: coordintes.latitude,
		lon: coordintes.longitude,
		time: Date(),
	};

	document.getElementById('lon').textContent = 'Longitude: ' + coordintes.longitude;
	document.getElementById('lat').textContent = 'Latitude: ' + coordintes.latitude;

	
	if (!(userId in last_users)) last_users[userId] = thisUser;

	var map = new L.map('map', mapOptions);
	var layer = new L.TileLayer(
		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	);

	map.addLayer(layer);

	for (id in last_users) {
		let user = last_users[id];
		let marker = new L.Marker([user.lat, user.lon], {
			title: user.name,
		});
		marker
			.addTo(map)
			.bindPopup(user.name + ' ' + user.time)
			.openPopup();
	}

	axios.post('/helpers', thisUser)
    .then(response => console.log(response));
}

function error(err) {
	console.log(err);
}

var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};
