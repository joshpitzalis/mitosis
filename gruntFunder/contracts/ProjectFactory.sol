pragma solidity ^0.4.18;

import './GruntFund.sol';

contract ProjectFactory {
    address[] public deployedProjects;
    function createProject() public {
        address newProject = new GruntFund();
        deployedProjects.push(newProject);
    }
    function getDeployedCampaigns() public view returns(address[]){
        return deployedProjects;
    }
}