
// @title A contract that divides a project's equity faily according to work contributed
// @author Josh

pragma solidity ^0.4.0 ;

contract Projectfactory {
    address[] public deployedProjects;
    function createProject() public {
        address newProject = new GruntFund(msg.sender);
        deployedProjects.push(newProject);
    }
    function getDeployedCampaigns() public view returns(address[]){
        return deployedProjects;
    }
}


contract GruntFund {
    struct Deliverable {
        address createdBy;
        string description;
        uint id;
        uint approvals;
        uint rejects;
        mapping (address => bool) voted;
        bool completed;
        bool rejected;
    }


    function GruntFund (address _creator) public {
        totalTimeList.push(_creator);
        totalTime[address(this)] = 2;
        totalTime[_creator] = 2;
    }

    mapping (uint => Deliverable) public pendingDeliverables;
    uint[] public pendingDeliverableList;
    
    mapping (address => uint) public totalTime;
    address[] public totalTimeList;

    function getVersion() public pure returns (string) {
        return "version 0.0.5";
    }

    function getPendingDeliverableList() public view returns (uint[]) {
        return pendingDeliverableList;
    }

    function getPendingDeliverable(uint _id) public view returns (address, string, uint, uint, bool, uint, bool) {
        return (
        pendingDeliverables[_id].createdBy,
        pendingDeliverables[_id].description,
        pendingDeliverables[_id].id,
        pendingDeliverables[_id].approvals,
        pendingDeliverables[_id].completed,
        pendingDeliverables[_id].rejects,
        pendingDeliverables[_id].rejected

        );
    }
    
    function addDeliverable(string _description) public {
        uint id = block.timestamp;
        Deliverable memory newTask = Deliverable({
            createdBy: msg.sender,
            description: _description,
            id: id,
            approvals: 0,
            rejects: 0,
            completed: false, 
            rejected: false
        });
        pendingDeliverables[id] = newTask;
        pendingDeliverableList.push(id);
    }
     /// @author Sumukh
    /// @notice Approving based on weight. 3 requires allow to check if the person voting is a grunt, if the task is completed and if has already voted.
    /// @return true if Bugs will eat it, false otherwise
    function approveDeliverable(uint _deliverableId) public returns(address) {
        Deliverable storage existingTask = pendingDeliverables[_deliverableId];
        require(totalTime[msg.sender]>=1);
        require(!existingTask.completed && !existingTask.rejected);
        require(!existingTask.voted[msg.sender]);
        existingTask.approvals += totalTime[msg.sender];
        existingTask.voted[msg.sender] = true;
        pendingDeliverables[_deliverableId] = existingTask;
        finalise(_deliverableId,  existingTask.createdBy);
        return existingTask.createdBy;
    }
    function rejectDeliverable(uint _deliverableId) public returns(address) {
        
        Deliverable storage existingTask = pendingDeliverables[_deliverableId];
        require(totalTime[msg.sender]>=1);
        require(!existingTask.completed && !existingTask.rejected);
        require(!existingTask.voted[msg.sender]);
        existingTask.rejects += totalTime[msg.sender];
        existingTask.voted[msg.sender] = true;
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
        } else if (pendingDeliverables[_deliverableId].rejects > (totalTime[address(this)]/2)) {
            pendingDeliverables[_deliverableId].rejected = true;
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