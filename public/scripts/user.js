var last_users = [];
(function () {
	axios
		.get('/helpers')
		.then((response) => {
			last_users = response.data; //response.data
			console.log(response.data);
		})
		.catch((error) => console.log(error));
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
	console.log('thisUser', thisUser);
	var exists = false;
	last_users.forEach(us =>{
		if(userId == us.id) exists = true;
	})
	
	if (!exists) last_users.push(thisUser);
	var map = new L.map('map', mapOptions);
	var layer = new L.TileLayer(
		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	);

	map.addLayer(layer);
	if (last_users.length > 0) {
		console.log(last_users);
		last_users.forEach((user) => {
			if (user !== null) {
				console.log(user);
				let marker = new L.Marker([user.lat, user.lon], {
					title: user.name,
				});
				marker
					.addTo(map)
					.bindPopup(user.name + ' ' + user.time)
					.openPopup();
			}
		});
	}
	console.log(last_users);

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
