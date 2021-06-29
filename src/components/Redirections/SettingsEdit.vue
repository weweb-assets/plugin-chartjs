<template>
    <div class="auth0-settings-edit">
        <wwEditorFormRow required label="Page to redirect after the user signed-in">
            <wwEditorSelect
                name="after-sign-in-page-id"
                :options="pagesOptions"
                :value="settings.publicData.afterSignInPageId"
                @input="changePublicSettings('afterSignInPageId', $event)"
                placeholder="Select a page"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Page to redirect when user is not signed-in">
            <wwEditorSelect
                name="after-not-sign-in-page-id"
                :options="pagesOptions"
                :value="settings.publicData.afterNotSignInPageId"
                @input="changePublicSettings('afterNotSignInPageId', $event)"
                placeholder="Select a page"
                large
            />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    data() {
        return {};
    },
    watch: {
        isValid: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isValid() {
            const { afterSignInPageId, afterNotSignInPageId } = this.settings.publicData;
            return !!afterSignInPageId && !!afterNotSignInPageId;
        },
        pagesOptions() {
            return wwLib.wwWebsiteData.getPages().map(page => ({ label: page.name, value: page.id }));
        },
    },
    methods: {
        changePublicSettings(key, value) {
            this.$emit('update-settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, [key]: value },
            });
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
    &__radio-label {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
