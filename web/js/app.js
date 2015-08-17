var app = angular.module("todo", []);

app.controller('TodoListController', ['$scope', '$filter', '$timeout', function($scope, $filter, $timeout){
	$scope.data = {
		tasks: [
		{
			complete: true,
			visible: true,
			text: "Make a static HTML version of the app"
		},
		{
			complete: true,
			visible: true,
			text: "Add necessary 3rd party libraries"
		},
		{
			complete: false,
			visible: true,
			text: "Style this bad boy"
		},
		{
			complete: false,
			visible: true,
			text: "Convert this from static HTML to a dynamic web app with angular"
		},
		{
			complete: false,
			visible: true,
			text: "Write tests for your angular code to make sure this all works"
		}
	]};

	$scope.updateTasks = function() {
		$timeout(function(){
				$scope.data.unfinishedTasks = $filter('filter')($scope.data.tasks, {complete: false}, true);
				$scope.data.finishedTasks = $filter('filter')($scope.data.tasks, {complete: true, visible: true}, true);
		});
	};

	$scope.clearFinished = function() {
		angular.forEach($scope.data.tasks, function(t){
			if (t.complete && t.visible) {
				t.visible = false;
			}
		});
		$scope.updateTasks();
	};

	$scope.createTask = function() {
		if ($scope.newText) {
			task = {
				text: $scope.newText,
				complete: false,
				visible: true
			};

			$scope.data.tasks.push(task);
			$scope.newText = "";
			$scope.updateTasks();
		}
		
	};

	$scope.updateTasks();
}]);


