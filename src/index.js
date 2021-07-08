import createAuth0Client from '@auth0/auth0-spa-js';

/* wwEditor:start */
import './components/MachineToMachine/SettingsEdit.vue';
import './components/MachineToMachine/SettingsSummary.vue';
import './components/Redirections/SettingsEdit.vue';
import './components/Redirections/SettingsSummary.vue';
import './components/SinglePageApp/SettingsEdit.vue';
import './components/SinglePageApp/SettingsSummary.vue';
import { GET_AUTH0_ROLES } from './graphql';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad() {
        await this.createClient();
        if (!this.client) return;
        await this.checkRedirectCallback();
        await this.checkIsAuthenticated();
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    async getRoles(isNoCache = false) {
        const { data } = await wwLib.$apollo.query({
            query: GET_AUTH0_ROLES,
            variables: {
                designId: this.settings.designId,
                settingsId: this.settings.id,
            },
            fetchPolicy: isNoCache ? 'network-only' : 'cache-first',
        });
        return data.getAuth0Roles.data.map(role => ({ label: role.description, value: role.id }));
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Auth0 API
    \================================================================================================*/
    client: null,
    user: null,
    isAuthenticated: false,
    async createClient() {
        const { domain, SPAClientId: client_id, afterSignInPageId } = this.settings.publicData;
        if (!domain || !client_id) return;

        const page = wwLib.wwWebsiteData.getPages().find(page => page.id === afterSignInPageId);
        const redirect_uri = page
            ? `${window.location.origin}/${page.paths[wwLib.wwLang.lang] || page.paths.default}`
            : window.location.origin;

        this.client = await createAuth0Client({ domain, client_id, redirect_uri });
    },
    async checkRedirectCallback() {
        try {
            const { code, state } = wwLib.manager
                ? wwLib.getEditorRouter().currentRoute.value.query
                : wwLib.getFrontRouter().currentRoute.value.query;
            if (code && state) {
                await this.client.handleRedirectCallback();
                await this.setCookieSession();
            }
        } catch (err) {
            wwLib.wwLog.error(err);
        }
    },
    async checkIsAuthenticated() {
        this.isAuthenticated = await this.client.isAuthenticated();
        this.user = await this.client.getUser();
    },
    async loginWithPopup(options, config) {
        try {
            await this.client.loginWithPopup(options, config);
            await this.setCookieSession();
            this.redirectAfterSignIn();
        } catch (err) {
            wwLib.wwLog.error(err);
        } finally {
            this.checkIsAuthenticated();
        }
    },
    loginWithRedirect(o) {
        return this.client.loginWithRedirect(o);
    },
    logout(o) {
        return this.client.logout(o);
    },
    async setCookieSession(token = null) {
        const sessionToken = token || (await this.client.getTokenSilently());
        window.vm.config.globalProperties.$cookie.setCookie('session', sessionToken);
    },
    redirectAfterSignIn() {
        wwLib.goTo(this.settings.publicData.afterSignInPageId);
    },
};
