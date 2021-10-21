export default class FetchBuilder {
    public GerUserByEmail(email: string) {
        var fetchData = {
            domainname: this.xmlEncode(email)
        };
        var fetchXml = [
            "<fetch>",
            "  <entity name='systemuser'>",
            "    <attribute name='internalemailaddress' />",
            "    <attribute name='lastname' />",
            "    <attribute name='firstname' />",
            "    <attribute name='jobtitle' />",
            "    <attribute name='domainname' />",
            "    <attribute name='fullname' />",
            "    <attribute name='systemuserid' />",
            "    <attribute name='businessunitid' />",
            "    <filter>",
            "      <condition attribute='domainname' operator='eq' value='", fetchData.domainname/*rramdewar@brighthealthplan.com*/, "'/>",
            "    </filter>",
            "  </entity>",
            "</fetch>",
        ].join("");
        return fetchXml;
    }
    public GerUserById(systemUserId: string) {
        var fetchData = {
            systemuserid: this.xmlEncode(systemUserId)
        };
        var fetchXml = [
            "<fetch>",
            "  <entity name='systemuser'>",
            "    <attribute name='internalemailaddress' />",
            "    <attribute name='lastname' />",
            "    <attribute name='firstname' />",
            "    <attribute name='jobtitle' />",
            "    <attribute name='domainname' />",
            "    <attribute name='fullname' />",
            "    <attribute name='systemuserid' />",
            "    <attribute name='businessunitid' />",
            "    <filter>",
            "      <condition attribute='systemuserid' operator='eq' value='", fetchData.systemuserid/*68f7c573-b855-eb11-bb23-000d3a5a1fbe*/, "'/>",
            "    </filter>",
            "  </entity>",
            "</fetch>",
        ].join("");
        return fetchXml;
    }
    public GetUserRole(systemUserId: string) {
        var fetchData = {
            systemuserid: this.xmlEncode(systemUserId)
        };
        var fetchXml = [
            "<fetch>",
            "  <entity name='systemuserroles'>",
            "    <attribute name='roleid' />",
            "    <attribute name='systemuserid' />",
            "    <filter>",
            "      <condition attribute='systemuserid' operator='eq' value='", fetchData.systemuserid/*68f7c573-b855-eb11-bb23-000d3a5a1fbe*/, "'/>",
            "    </filter>",
            "    <link-entity name='role' from='roleid' to='roleid'>",
            "      <attribute name='name' alias='RoleName' />",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        return fetchXml;
    }

    /**  Encodes the string to make it encoded for use in xml or html.  */
    private xmlEncode(input: string): string {
        if (input === null || input === undefined)
            return input;
        const text = String(input);
        // from http://stackoverflow.com/a/27979933
        const encoded = text.replace(/[<>&'"]/g, c => {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
                default:
                    throw new Error('Should not reach');
            }
        });
        return encoded;
    }
}