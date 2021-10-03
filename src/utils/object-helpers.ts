import {UsersArrayType} from "../Types/types";

export const updateObjectInArray = (items: Array<UsersArrayType>, itemId: number, objectPropName: string, newObjProp: {followed: boolean}) => {
    return items.map((u: any) => {
        if (u[objectPropName] === itemId) {
            return {...u, ...newObjProp}
        }

        return u;
    })
}