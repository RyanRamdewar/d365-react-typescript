import {
    IEntityParam,
    Mode,
} from './Interfaces';
import {
    createTheme,
} from '@fluentui/react';
import FetchBuilder from './FetchBuilder';
import FetchParser from './FetchParser';
import { executeFetchXML, getRoleName, getRoles } from './DataLayer';
import * as queryString from 'query-string';


const fb: FetchBuilder = new FetchBuilder();
const fp: FetchParser = new FetchParser();


export const myTheme = createTheme({
    palette: {
        themePrimary: '#1098A2',
        themeLighterAlt: '#f2fbfb',
        themeLighter: '#ceeef0',
        themeLight: '#a6dfe3',
        themeTertiary: '#efefef',
        themeSecondary: '#24a5ae',
        themeDarkAlt: '#0f8a93',
        themeDark: '#0c757c',
        themeDarker: '#09565b',
        neutralLighterAlt: '#faf9f8',
        neutralLighter: '#f3f2f1',
        neutralLight: '#edebe9',
        neutralQuaternaryAlt: '#e1dfdd',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c6c4',
        neutralTertiary: '#a19f9d',
        neutralSecondary: '#605e5c',
        neutralPrimaryAlt: '#3b3a39',
        neutralPrimary: '#323130',
        neutralDark: '#201f1e',
        black: '#000000',
        white: '#ffffff',
    }
});

export function getAppMode() {
    let qs;
    if (window.location.search) {
        qs = queryString.parse(window.location.search);
    }
    else if (window.location.href) {
        qs = queryString.parse(window.location.href);
    }
    else if (window.location.href) {
        qs = queryString.parse(window.location.href);
    }

    let mode: IEntityParam | undefined = undefined;
    if (qs && qs.data) {
        const entity = qs.data.toString().split("=");
        if (entity && entity[0] === "example2") {
            const mode: IEntityParam = {
                type: Mode.Example2,
                id: entity[1]
            }
            return mode;
        }
        console.log(JSON.stringify(mode, null, '\t'));
        return mode;
    }
    else if (qs && qs.id) {
        const mode: IEntityParam = {
            type: Mode.Example,
            id: qs.id.toString()
        }
        return mode;
    }
    return undefined;
}

export async function getUser(id?: string | undefined, email?: string | undefined) {
    let fetchXml;

    if (id) {
        fetchXml = fb.GerUserById(id);
    }
    else if (email) {
        fetchXml = fb.GerUserByEmail(email);
    }
    else
        return undefined;

    let result = await executeFetchXML('systemusers', fetchXml);
    if (result && result.value.length > 0) {
        const user = fp.ParseSystemUser(result.value[0]);
        return user;
    }
    return undefined;

}

export async function getRoleNames(userId: string) {
    let roleNames: string[] = [];
    const roles = await getRoles(userId);
    if (roles) {
        for (var r of roles) {
            const name = await getRoleName(r.roleid);
            roleNames.push(name);
        }
    }
    return roleNames;

}