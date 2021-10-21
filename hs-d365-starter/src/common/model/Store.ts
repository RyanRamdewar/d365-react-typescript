import { MessageBarType } from '@fluentui/react';
import { action, Action, createTypedHooks, thunk, Thunk } from 'easy-peasy';
import { getRoleNames } from '../BusinessLogic';

import {
    INotification,
    IUser,
} from '../Interfaces';


const typedHooks = createTypedHooks<IStoreModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export interface IStoreModel {
    notification: INotification | undefined,
    setNotification: Action<IStoreModel, INotification | undefined>,
    currentUser: IUser | undefined,
    setCurrentUser: Action<IStoreModel, IUser>,
    setCurrentUserRoles: Action<IStoreModel, string[]>,
    loadRoles: Thunk<IStoreModel, string>,

}

export const initStoreModel: IStoreModel = {
    notification: undefined,
    setNotification: action((state, payload) => {
        state.notification = payload;
    }),

    currentUser: undefined,
    setCurrentUser: action((state, payload) => {
        console.log("CurrentUser: " + JSON.stringify(payload))
        state.currentUser = payload;
    }),
    setCurrentUserRoles: action((state, payload) => {
        console.log("CurrentUser: " + JSON.stringify(payload))
        if (state.currentUser)
            state.currentUser.roles = payload;
    }),
    loadRoles: thunk(async (actions, payload) => {
        if (payload) {
            try {
                actions.setNotification({ type: MessageBarType.info, message: "Loading Roles..." });
                setTimeout(() => {
                    getRoleNames(payload).then(roles => {
                        if (roles) {
                            actions.setCurrentUserRoles(roles);
                        }
                        actions.setNotification({ type: MessageBarType.success, message: "Roles Loaded" });
                    });
                }, 3000);
                setTimeout(() => {
                    actions.setNotification(undefined)
                }, 6000);
            }
            catch (e) {
                actions.setNotification({ type: MessageBarType.error, message: "Error Loading Assessment " + e });
            }
        }
    }),

}