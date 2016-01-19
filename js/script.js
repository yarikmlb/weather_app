(function($) {
    $(document).ready(function() {
			$('.wrapper-form #submit').on('click', function(e) {
			e.preventDefault();
	        var location = $('body .wrapper-form #city').val();

	        getWeatherForTab(location, true)
	    });

		$(document).on('click', '#tabs li > a', function(e) {
			e.preventDefault();
			var $link = $(this);

			getWeatherForTab($link.attr('href').replace('#', ''));
		});

		function addTab(location) {
		  $('#tabs').append('<li><a href="#' + location + '">' + location + '</a><a href="#" class="delete"</a></li>');
		  $('#tabs_content').append('<div class="tab tab-pane" id="' + location + '"></div>');
		}

		$(document).on('click', '.delete', function(e) {
		  var $li = $(this).parent();
		  var location = $li.find('a:first').attr('href').replace('#');

		  $('#tabs_content').find(location).remove();
		  $li.remove();

		})

		function getWeatherForTab(location, isNewTab) {
			var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=dba7f76d026ee86d564d2bc71b790d20&units=metric&q=';

			$.ajax({
	        	url: weatherUrl + location,
	        	type: 'GET',
	        	dataType: 'json'
	        }).success(function(data) {
	        	var temp = data.main.temp;
	        	var wind = data.wind.speed;
	        	var rain = data.weather[0].main;
	        	var humidity = data.main.humidity;
	        	var name = location;
	        	var country = data.sys.country;
	        	var imgUrl = 'http://openweathermap.org/img/w/'+ data.weather[0].icon +'.png';
				var $tab;

				if (isNewTab) {
					addTab(location);
				}

				$tab = $('#' + location, '#tabs_content');
				$tab.html(
					'<h3>' + name + ',' + country + '</h3>' +
					'<img src="' + imgUrl + '">' +
					'<span>' + rain + '</span>' +
					'<p>Temp:' + temp + ' °C</p>' +
					'<p>Speed:' + wind + 'm/s</p>' +
					'<p>Humidity:' + humidity + '%</p>'

				);

				$('.tab').removeClass('active');
            	$tab.addClass('active');
	        });
		}

	});

})(jQuery);