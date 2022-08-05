import { combineReducers } from "redux";
import Picture from "./Picture";
import Preview from "./Preview";
import PermissionSave from "./PermissionSave";
export default combineReducers({
    Picture,
    Preview,
    PermissionSave
})