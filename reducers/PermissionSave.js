export default function PermissionSave(state={value:false},action){
    console.log(action)
    switch(action.type){
        case "CHANGE_PERMISSION":
            return {value:action.data};
        default:
            return state
    }
}