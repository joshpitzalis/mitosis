
// @title A contract that divides a project's equity faily according to work contributed
// @author Josh

pragma solidity ^0.4.0 ;

contract GruntFund {
    struct Deliverable {
            address createdBy;
            string description;
            uint id;
            uint approvals;
            mapping (address => bool) moderators;
            bool completed;
            
        }


        function ProjectGrunt () public {
      
       
        totalTimeList.push(msg.sender);
        totalTime.[msg.sender] = 1;
   }

    mapping (uint => Deliverable) public pendingDeliverables;
    uint[] public pendingDeliverableList;
    
    mapping (address => uint) public totalTime;
    address[] public totalTimeList;

    function getVersion() public pure returns (string) {
        return 'version 0.0.4';
    }

    function getPendingDeliverableList() public view returns (uint[]) {
        return pendingDeliverableList;
    }

    function getPendingDeliverable(uint _id) public view returns (address, string, uint, uint, bool) {
        return (
        pendingDeliverables[_id].createdBy,
        pendingDeliverables[_id].description,
        pendingDeliverables[_id].id,
        pendingDeliverables[_id].approvals,
        pendingDeliverables[_id].completed
        );
    }
    
    function addDeliverable(string _description) public {
        uint id = now;
        Deliverable memory newTask = Deliverable({
            createdBy: msg.sender,
            description: _description,
            id: id,
            approvals: 0,
            completed: false
        });
        pendingDeliverables[id] = newTask;
        pendingDeliverableList.push(id);
    }

    function approveDeliverable(uint _deliverableId) public returns(address) {
        
        Deliverable storage existingTask = pendingDeliverables[_deliverableId];
        require(!totalTime[exisitingTask.createdBy]>=1);
        require(!existingTask.completed);
        require(!existingTask.moderators[msg.sender]);
        existingTask.approvals += totalTime[msg.sender];
        existingTask.moderators[msg.sender] = true;
        pendingDeliverables[_deliverableId] = existingTask;
        finalise(_deliverableId,  existingTask.createdBy);
        return existingTask.createdBy;
    }

    function finalise(uint _deliverableId, address _createdBy) private {
        if (pendingDeliverables[_deliverableId].approvals > (totalTime[address(this)]/2)) {
            totalTime[address(this)] += 2;
            totalTime[_createdBy] += 2;
            totalTimeList.push(_createdBy);
            pendingDeliverables[_deliverableId].completed = true;
        }
    }

    function getSummaryList() public view returns (address[]) {
        return totalTimeList;
    }

  function getSummary(address _id) public view returns (uint) {
        return totalTime[_id];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}