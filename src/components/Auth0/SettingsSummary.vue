<template>
    <div class="auth0-settings-edit caption-m">
        <wwEditorFormRow label="Copy all URLs in SPA settings">
            <div class="caption-m">Applications › SPA › Settings › Application URIs</div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Allowed Callback URLs">
            <div class="auth0-settings-edit__row">
                <div class="auth0-settings-edit__url caption-s">{{ callbackUrls }}</div>
                <button type="button" class="ww-editor-button -icon -primary m-left" @click="copy(callbackUrls)">
                    <wwEditorIcon class="ww-editor-button-icon" name="copy-paste" />
                </button>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Allowed Logout URLs">
            <div class="auth0-settings-edit__row">
                <div class="auth0-settings-edit__url caption-s">{{ logoutUrls }}</div>
                <button type="button" class="ww-editor-button -icon -primary m-left" @click="copy(logoutUrls)">
                    <wwEditorIcon class="ww-editor-button-icon" name="copy-paste" />
                </button>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Allowed Web Origins">
            <div class="auth0-settings-edit__row">
                <div class="auth0-settings-edit__url caption-s">{{ origins }}</div>
                <button type="button" class="ww-editor-button -icon -primary m-left" @click="copy(origins)">
                    <wwEditorIcon class="ww-editor-button-icon" name="copy-paste" />
                </button>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Allowed Origins (CORS)">
            <div class="auth0-settings-edit__row">
                <div class="auth0-settings-edit__url caption-s">{{ origins }}</div>
                <button type="button" class="ww-editor-button -icon -primary m-left" @click="copy(origins)">
                    <wwEditorIcon class="ww-editor-button-icon" name="copy-paste" />
                </button>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        pagesOptions() {
            return wwLib.wwWebsiteData.getPages().map(page => ({ label: page.name, value: page.id }));
        },
        website() {
            return wwLib.wwWebsiteData.getInfo();
        },
        callbackUrls() {
            return this.getUrls(this.settings.publicData.afterSignInPageId);
        },
        logoutUrls() {
            return this.getUrls(this.settings.publicData.afterNotSignInPageId);
        },
        origins() {
            return `https://editor.weweb-staging.io, https://${this.website.id}.weweb-preview.io`;
        },
    },
    methods: {
        getUrls(pageId) {
            const page = wwLib.wwWebsiteData.getPages().find(page => page.id === pageId);
            const isHomePageId = page.id === this.website.homePageId;
            const editorUrl = `https://editor.weweb-staging.io/${this.website.id}/${isHomePageId ? '' : page.id}`;
            const frontUrls = page.langs.map(lang => {
                const defaultLang = this.website.langs.find(websiteLang => websiteLang.lang === lang);
                return `https://${this.website.id}.weweb-preview.io/${
                    defaultLang.default && !defaultLang.isDefaultPath ? '/' : `${lang}/`
                }${isHomePageId ? '' : page.paths[lang] || page.paths.default}`;
            });
            return [editorUrl, ...frontUrls].join(', ');
        },
        copy(string) {
            navigator.clipboard.writeText(string).then(
                function () {
                    wwLib.wwNotification.open({
                        text: 'URLs copied to clipboard.',
                        color: 'green',
                    });
                },
                function () {
                    wwLib.wwNotification.open({
                        text: 'Error while trying to copy URLs to clipboard.',
                        color: 'red',
                    });
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.auth0-settings-edit {
    display: flex;
    flex-direction: column;
    &__link {
        color: var(--ww-color-blue-500);
        margin-left: var(--ww-spacing-02);
    }
    &__row {
        display: flex;
        align-items: center;
    }
    &__url {
        color: var(--ww-color-dark-500);
        background-color: var(--ww-color-dark-200);
        padding: var(--ww-spacing-01) var(--ww-spacing-02);
        border-radius: var(--ww-border-radius-01);
    }
}
.m-left {
    margin-left: var(--ww-spacing-02);
}
</style>
