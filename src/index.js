import Vue from 'vue';
import createAuth0Client from '@auth0/auth0-spa-js';

/* wwEditor:start */
export { GET_AUTH0_ROLES } from './graphql.js';
import './components/SettingsEdit.vue';
import './components/SettingsSummary.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad() {
        Vue.prototype.$auth = this;
        Vue.prototype.$pluginAuth0 = this;
        const { domain, clientId: client_id } = this.settings.publicData;
        this.client = await createAuth0Client({ domain, client_id, redirect_uri: window.location.origin });

        try {
            const { code, state } = this.$route.query;
            if (code && state) {
                const { appState } = await this.client.handleRedirectCallback();
                this.onRedirectCallback(appState);
            }
        } catch (err) {
            this.error = err;
            wwLib.wwLog.error(err);
        } finally {
            // Initialize our internal authentication state
            this.isAuthenticated = await this.client.isAuthenticated();
            this.user = await this.client.getUser();
            this.loading = false;
        }
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    async getRoles(isNoCache = false) {
        try {
            const { data } = await wwLib.$apollo.query({
                query: GET_AUTH0_ROLES,
                variables: {
                    designId: this.settings.designId,
                    settingsId: this.settings.id,
                },
                fetchPolicy: isNoCache ? 'network-only' : 'cache-first',
            });
            return data.getAuth0Roles.data;
        } catch (err) {
            wwLib.wwLog.error(err);
        }
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth0 API
    \================================================================================================*/
    management: null,
    client: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    popupOpen: false,
    /** Authenticates the user using a popup window */
    async loginWithPopup(options, config) {
        this.popupOpen = true;
        try {
            await this.client.loginWithPopup(options, config);
        } catch (err) {
            wwLib.wwLog.error(err);
        } finally {
            this.popupOpen = false;
            this.user = await this.client.getUser();
            this.isAuthenticated = await this.client.isAuthenticated();
        }
    },
    /** Handles the callback when logging in using a redirect */
    async handleRedirectCallback() {
        this.loading = true;
        try {
            await this.client.handleRedirectCallback();
        } catch (err) {
            wwLib.wwLog.error(err);
        } finally {
            this.user = await this.client.getUser();
            this.isAuthenticated = true;
            this.loading = false;
        }
    },
    /** Authenticates the user using the redirect method */
    loginWithRedirect(o) {
        return this.client.loginWithRedirect(o);
    },
    /** Returns all the claims present in the ID token */
    getIdTokenClaims(o) {
        return this.client.getIdTokenClaims(o);
    },
    /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
    getTokenSilently(o) {
        return this.client.getTokenSilently(o);
    },
    /** Gets the access token using a popup window */
    getTokenWithPopup(o) {
        return this.client.getTokenWithPopup(o);
    },
    /** Logs the user out and removes their session on the authorization server */
    logout(o) {
        return this.client.logout(o);
    },
};
