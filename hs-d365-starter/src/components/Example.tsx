

import { Label, MessageBar, MessageBarType, PrimaryButton } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';


import { authProvider } from '../common/ADALConfig_V2';
import { getUser } from '../common/BusinessLogic';
import { acquireToken, createConfig } from '../common/DataLayer';
import { IEntityParam } from '../common/Interfaces';
import { useStoreActions, useStoreState } from '../common/model/Store';


const Example = (props: { info: IEntityParam }) => {
    const { info } = props;

    const notification = useStoreState((state) => state.notification);
    const setNotification = useStoreActions((state) => state.setNotification);

    const user = useStoreState((state) => state.currentUser);
    const setCurrentUser = useStoreActions((state) => state.setCurrentUser);
    const loadRoles = useStoreActions((state) => state.loadRoles);



    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            console.log("Dev Example Load");
            const token = acquireToken();
            token.then(async (res: { accessToken: string | undefined; }) => {
                if (res.accessToken) {
                    const userSettings = authProvider.getAccountInfo();
                    const userName = userSettings?.account.userName;
                    createConfig(res.accessToken);
                    const user = await getUser(undefined, userName).then();
                    if (user) {
                        setCurrentUser(user);
                    }
                }
            });
        }
        else {
            // used in production
            console.log("Prod Survey Load")
            if (info.id) {
                const userSettings = Xrm.Utility.getGlobalContext().userSettings; // userSettings is an object with user information.
                const currentUserId = userSettings.userId; // The user's unique id
                createConfig(undefined);
                const wait = getUser(currentUserId, undefined);
                wait.then(user => {
                    if (user)
                        setCurrentUser(user);
                })
            }
        }
    }, []);

    function getRoles() {
        if (user && user.id) {
            setNotification({ type: MessageBarType.info, message: "Loading Roles...." })
            loadRoles(user.id);

        }
    }
    return (
        <React.Fragment>
            <Row>
                <Col>
                    {notification ?
                        <MessageBar
                            hidden={notification === undefined ? true : false}
                            messageBarType={notification?.type}
                        >
                            {notification?.message}
                        </MessageBar>
                        : ""}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>{user?.fullname}</Label>
                </Col>
                <Col>
                    <Label>{user?.email}</Label>
                </Col>
            </Row>
            <Row>
                <Col>
                    {user?.roles ? user.roles.map(rle => {
                        return <p>{rle}</p>
                    }) : ""}
                </Col>
            </Row>
            <Row>
                <Col>
                    <PrimaryButton text="Load Roles" onClick={getRoles} allowDisabledFocus />
                </Col>
            </Row>
        </React.Fragment >

    )

}

export default Example
