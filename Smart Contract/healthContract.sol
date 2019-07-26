pragma solidity 0.5.10;
pragma experimental ABIEncoderV2;
contract MediProfile {

    struct Doctor{
        uint doctorId;
        string registrationNumber;
        string name;
        string email;
        string docAddress;
        uint contactNo;
        address publicAddress;

    }
    
    struct Patient{
        address publicAddress;
        uint patientId;
        string name;
        string email;
        string patAddress;
        uint contactNo;
        string bloodGroup;
        uint bloodPressure;
        mapping(address =>bool) docterViewList;
        
    }
    
    mapping (uint => Doctor) doctorList;
    mapping (uint => Patient) patientList;


    function give_permission(address _doctorAddress, uint _patient_id) public returns(bool){
        
        require(msg.sender==patientList[_patient_id].publicAddress,"Only Patient is Allowed to the operation");
        
        patientList[_patient_id].docterViewList[_doctorAddress]=true;
    
        return true; 
    }

    function push_doctor_data(uint _doctorId, string memory _name,string memory _email, string memory _docAddress, uint _contactNo ) public returns(bool)
    {
        Doctor memory _new_doctor;
        
        _new_doctor.doctorId= _doctorId;
        _new_doctor.name= _name;
        _new_doctor.email= _email;
        _new_doctor.docAddress= _docAddress;
        _new_doctor.contactNo= _contactNo;
        _new_doctor.publicAddress=msg.sender;
        

        doctorList[_doctorId]=_new_doctor;
        
        return true;
    }

    function push_patient_data (uint _patientId, string memory _name, string memory _email, string memory _patAddress, uint _contactNo,string memory _bloodGroup,uint _bloodPressure) public returns(bool)
    {
        Patient memory _new_patient;
        _new_patient.patientId= _patientId;
        _new_patient.name= _name;
        _new_patient.email= _email;
        _new_patient.patAddress= _patAddress;
        _new_patient.contactNo= _contactNo;
        _new_patient.bloodGroup= _bloodGroup;
        _new_patient.bloodPressure= _bloodPressure;
        _new_patient.publicAddress= msg.sender;
        
        patientList[_patientId]=_new_patient;

        return true;
    }
    
    
    function show_doctor_details(uint _doctorId) public view returns(uint, string memory, string memory,string memory, uint )
    {
        require(msg.sender==doctorList[_doctorId].publicAddress,"Only Doctor is Allowed to this operation");
        
        return (doctorList[_doctorId].doctorId,doctorList[_doctorId].name,doctorList[_doctorId].email,doctorList[_doctorId].docAddress,doctorList[_doctorId].contactNo);

    }

    function show_patient_details(uint _patientId) public view returns(uint, string memory, string memory,string memory, uint ,string memory,uint )
    {
        require(msg.sender==patientList[_patientId].publicAddress  || patientList[_patientId].docterViewList[msg.sender]==true  ,"Only Patient and selected Doctors are Allowed to this operation");
        
        return (patientList[_patientId].patientId,patientList[_patientId].name,patientList[_patientId].email,patientList[_patientId].patAddress,patientList[_patientId].contactNo,patientList[_patientId].bloodGroup,patientList[_patientId].bloodPressure);

    }
        
}
