import DynamicsWebApi from 'dynamics-web-api';
import { AccessTokenResponse } from 'react-aad-msal';
import { authProvider } from './ADALConfig_V2';


let apiConfig: DynamicsWebApi;

function getUrl() {
    if ((!process.env.NODE_ENV || process.env.NODE_ENV === "development")) {
        return "https://bh-dev.crm.dynamics.com";
    }
    else {
        return Xrm.Utility.getGlobalContext().getClientUrl;
    }
}

export function createConfig(token: string | undefined) {
    try {
        const url = getUrl();
        if (token && (!process.env.NODE_ENV || process.env.NODE_ENV === "development")) {
            apiConfig = new DynamicsWebApi({
                webApiVersion: '9.1',
                webApiUrl: getUrl() + '/api/data/v9.1/',
                onTokenRefresh: acquireTokenAPI
            });
        }
        else {
            console.log('prod api config ' + url);
            apiConfig = new DynamicsWebApi({ webApiVersion: '9.1' });
        }
    }
    catch (e) {
        alert(e);
    }
}

async function acquireTokenAPI(dynamicsWebApiCallback: (arg0: AccessTokenResponse) => void) {
    // authProvider.logout();
    const tkn = await authProvider.getAccessToken();
    dynamicsWebApiCallback(tkn);
}

export async function acquireToken() {
    const tkn = await authProvider.getAccessToken();
    return tkn;
};

export async function executeFetchXML(entity: string, fetchXML: string) {
    const res = apiConfig.executeFetchXml(entity, fetchXML).then((response: any) => {
        // console.log(JSON.stringify(response));
        return response;
    }).catch(function (error) {
        console.log(error.message);
    });
    return res;
};

export async function getRoles(userId: string) {
    const filter = "systemuserid eq " + userId;
    const res = await apiConfig.retrieveAll('systemuserrolescollection', ['roleid'], filter).then((response: any) => {
        return response;
    }).catch(function (error) {
        throw error;
    });
    if (res && res.value.length >= 1) {
        return res.value;
    }
    else {
        return undefined;
    }
};


export async function getRoleName(roleId: string) {
    const filter = "roleid eq " + roleId;
    const res = await apiConfig.retrieveAll('roles', ['name'], filter).then((response: any) => {
        return response;
    }).catch(function (error) {
        throw error;
    });
    if (res && res.value.length === 1) {
        return res.value[0]["name"];
    }
    else {
        return undefined;
    }
};

//SAMPLE CREATE
// export async function createTemplateRule(templateId: string, rule: IRule) {
//     var entity: any = {};
//     entity.bh_name = rule.name;
//     entity.bh_order = rule.order;
//     entity.bh_operator = rule.operator;
//     entity.bh_action = rule.action;
//     entity.bh_value = rule.value;
//     entity["bh_Question@odata.bind"] = "/bh_assessmentquestions(" + rule.question + ")";
//     entity["bh_ActionQuestion@odata.bind"] = "/bh_assessmentquestions(" + rule.actionQuestion + ")";
//     entity["bh_Template@odata.bind"] = "/bh_assessmenttemplates(" + templateId + ")";
//     entity.bh_actiongroup = rule.actionGroup;
//     const res = apiConfig.create(entity, 'bh_assessmentrules', "return=representation").then((response: any) => {
//         // console.log(JSON.stringify(response));
//         return response.bh_assessmentquestionid;
//     }).catch(function (error) {
//         throw error;
//     });
//     return res;
// }


//SAMPLE UPSERT
// export async function upsertAnswer(answer: IAnswer) {
//    var entity: any = {};
//     entity.bh_name = answer.name;
//     entity["bh_assessmentid@odata.bind"] = "/bh_assessments(" + answer.assessmentId + ")";
//     entity["bh_AssessmentTemplate@odata.bind"] = "/bh_assessmenttemplates(" + answer.assessmentTemplateId + ")";
//     entity["bh_Question@odata.bind"] = "/bh_assessmentquestions(" + answer.questionId + ")";
//     entity["bh_CompletedBy@odata.bind"] = "/systemusers(" + answer.completedById + ")";
//     entity["bh_member@odata.bind"] = "/contacts(" + answer.member + ")";
//     entity.bh_completedon = answer.completedOn;
//     entity.bh_order = answer.order;
//     entity.bh_points = answer.points;
//     entity.bh_answer = answer.text;
//     entity.bh_describe = answer.otherChoiceText;
//     entity.bh_questiontype = answer.questionType;

//     const res = await apiConfig.upsert(answer.id, 'bh_assessmentresponses', entity, "return=representation").then((response: any) => {
//         // console.log(JSON.stringify(response));
//         return response;
//     }).catch(function (error) {
//         throw error;
//     });
//     return res;
// };


//SAMPLE Call Custom API Plugin
// export async function postMCGAnswers(mcgId: string, version: string, answersJSON: string) {
//     var actionRequest = {
//         MCGID: mcgId,
//         Version: version,
//         AnswerJSON: answersJSON
//     };
//     const res = apiConfig.executeUnboundAction('bh_MCG_GetCarePlan', actionRequest).then((response: any) => {
//         // console.log(JSON.stringify(response));
//         return response;
//     }).catch(function (error) {
//         throw error;
//     });
//     return res;
// }