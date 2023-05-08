import RoleModel from "./RoleModel"

interface SessionModel {
    token: Object
    role: RoleModel
    name: string
    id: string
}

export default SessionModel