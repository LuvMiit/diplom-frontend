import axios from "axios";

let userRole = null
let userToken = null
let authFlag = false
let selectedStatus=null
let selectedType = null
let selectedFuel = null
let selectedStorage = null
let selectedConsumable = null
let selectedBoss = null
function setBoss(boss){
    selectedBoss = boss
}
function setConsumable(consumable){
    selectedConsumable = consumable
}
function setStorage(storage){
    selectedStorage = storage
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
    selectedStorage=null
}

export { userRole, userToken,selectedStatus,selectedType, selectedFuel,selectedStorage, selectedConsumable, selectedBoss,
    setConsumable, setStorage, setRole, setToken, setType, setStatus, setAuthFlag, setFuel, setBoss, nullFilters,
    getConsole}