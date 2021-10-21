import { IUser } from './Interfaces';

export default class FetchParser {

    public ParseSystemUser(user: any) {
        let u: IUser = {
            id: user.systemuserid,
            fullname: user.fullname,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.internalemailaddress,
            busunessUnitId: user._businessunitid_value,
        }
        return u;
    }
    public ParseRoles(roles: any) {
        let roleIds: string[] = [];
        roles.forEach((element: { roleid: string, RoleName: string }) => {
            roleIds.push(element.RoleName);
        });
        return roleIds;
    }
}