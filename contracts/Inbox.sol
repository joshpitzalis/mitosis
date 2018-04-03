pragma solidity ^0.4.6;

contract gruntv2 {
    
    function add(string _value) public {
        gruntInterface originalContract = gruntInterface(0x23BA231Ab7976880d322b604a6C90F94fa541d81);
        originalContract.addDeliverable(_value);
    }
    
    
}

contract gruntInterface {
    // function getValue(uint initialValue) returns(uint);
    // function storeValue(uint value);
    // function getValues() returns(uint);
    function addDeliverable(string) public;
}