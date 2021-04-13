pragma solidity >=0.5.0;

contract ToDoList {
    // keep track of number of tasks
    uint public taskCount = 0; // state variable

    struct Task{
        uint id; 
        string content;
        bool completed; // if task done or not
    }

    //how to access storage on blockchain

    //state variable
    mapping(uint => Task) public tasks; //mapping stores as key-value pair, key = uint

    //add some "content" so that a few things already present before customer sees the deployment page.

    constructor() public {
        createTask("Check out this trial list by Abhiram!");
    }


    function createTask(string memory _content) public {
        // write some code to add task ON mapping
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false); //since new task, so set completed = false
    }

    




}