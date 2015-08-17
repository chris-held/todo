describe('TodoListController', function(){
	var controller, scope;
	beforeEach(module('todo'));
	beforeEach(inject(function ($controller, $rootScope, $filter, $timeout) {
    scope = $rootScope.$new();
    //instantiating the controller will add the necesary controller methods onto scope so they can be tested
    controller = $controller('TodoListController', {
      $scope: scope,
      $filter: $filter,
      $timeout: $timeout
    });
  }));

  it('should set finished and unfinished tasks after update', inject(function($timeout) {
  	//TODO - should set scope.data.tasks here and assert on that
    scope.data.tasks = [
      {
        complete: true,
        visible: true,
        text: "foo"
      },
      {
        complete: false,
        visible: true,
        text: "bar"
      },
      {
        complete: true,
        visible: false,
        text: "baz"
      }
    ]
  	scope.updateTasks();
  	$timeout.flush();
  	expect(scope.data.finishedTasks.length).to.equal(1);
    expect(scope.data.finishedTasks[0].text).to.equal("foo");
  	expect(scope.data.unfinishedTasks.length).to.equal(1);	
    expect(scope.data.unfinishedTasks[0].text).to.equal("bar");

  }));

  it('should set finished tasks to invisible', inject(function($timeout){
  	scope.data.tasks = [
      {
        complete: true,
        visible: true,
        text: "foo"
      },
      {
        complete: true,
        visible: false,
        text: "baz"
      }
    ];
    scope.clearFinished();
    $timeout.flush();
    expect(scope.data.unfinishedTasks.length).to.equal(0);
  }));

  it('should add a new task to tasks', inject(function($timeout){
    scope.data.tasks = [
    ];
    scope.newText = "foo";
    scope.createTask();
    $timeout.flush();
    expect(scope.data.tasks.length).to.equal(1);
    expect(scope.data.tasks[0].text).to.equal("foo");
    expect(scope.data.unfinishedTasks.length).to.equal(1);
    expect(scope.data.unfinishedTasks[0].text).to.equal("foo");
  }));

  it('should not add a new task to tasks (no newText)', inject(function($timeout){
    scope.data.tasks = [
    ];
    scope.createTask();
    $timeout.flush();
    expect(scope.data.tasks.length).to.equal(0);
  }));

});