angular.module('vkaudio', [])
	.controller("audioController", function($scope, $http) {
		var audio = this;

		$scope.playlists = [];
		$scope.newPlaylist = "";

		$http.get('/api/')
			.then(function success(response) {
				if (response.data) {
					$scope.playlists = response.data;
				}
			}, function error(response) {
				console.log(response);
			});

		audio.createPlaylist = function() {
			if (!$scope.newPlaylist) {
				alert("New playlist can not be empty!");
				return;
			}
			console.log("Create new playlist: " + $scope.newPlaylist);
			$http.post('/api/', {playlist: $scope.newPlaylist}).then(
				function success(response) {
					$scope.playlists = response.data;
				},
				function error(response) {
					console.log(response);
				});
			$scope.newPlaylist = "";
		};

		audio.loadPlaylist = function(id) {
			if (!id) {

			}
		}

	});