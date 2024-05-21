import axios from "axios";

let userRole = null
let userToken = null
let authFlag = false
let selectedStatus=null
let selectedType = null
let selectedFuel = null
let repairFlag = false
let photoFlag = false
let garageFlag=true

function setPhotoFlag(bool){
    photoFlag = bool
    garageFlag=false
    repairFlag=false
}
function setGarageFlag(bool){
    garageFlag = bool
    photoFlag=false
    repairFlag=false
}
function setRepairFlag(bool){
    repairFlag = bool
    garageFlag=false
    photoFlag=false
}



function setFuel(fuel){
    selectedFuel = fuel
}
function setStatus(status){
    selectedStatus = status
}
function setType(type){
    selectedType = type
}

function setRole(role){
    userRole = role
}
function setToken(token){
    userToken = token
}
function setAuthFlag(flag){
    authFlag = flag
}
function getConsole(){
    return console.log(userRole +"  "+userToken+"  "+authFlag)
}
function nullFilters(){
    selectedFuel=null
    selectedType=null
    selectedStatus=null
}

export { userRole, userToken,selectedStatus,selectedType, selectedFuel, repairFlag, photoFlag,
    garageFlag, setGarageFlag, setRepairFlag, setPhotoFlag, setRole, setToken, setType, setStatus,
    setAuthFlag, setFuel, nullFilters, getConsole}