<template>
    <div class="auth0-settings-summary" v-if="isValid">
        <wwEditorFormRow label="Page to redirect after the user signed-in">
            <div class="auth0-settings-summary__elem">
                <wwEditorIcon large name="document" class="auth0-settings-summary__icon"></wwEditorIcon>
                <span class="caption-m">{{ getPageFromId(this.settings.publicData.afterSignInPageId).name }}</span>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Page to redirect when user is not signed-in">
            <div class="auth0-settings-summary__elem">
                <wwEditorIcon large name="document" class="auth0-settings-summary__icon"></wwEditorIcon>
                <span class="caption-m">{{ getPageFromId(this.settings.publicData.afterNotSignInPageId).name }}</span>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    computed: {
        isValid() {
            const { afterSignInPageId, afterNotSignInPageId } = this.settings.publicData;
            return !!afterSignInPageId && !!afterNotSignInPageId;
        },
        pages() {
            return wwLib.wwWebsiteData.getPages();
        },
    },
    watch: {
        isValid: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    methods: {
        getPageFromId(id) {
            return this.pages.find(page => page.id === id) || {};
        },
    },
};
</script>

<style lang="scss" scoped>
.auth0-settings-summary {
    &__elem {
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-bottom: var(--ww-spacing-02);
        }
    }
    &__icon {
        margin-right: var(--ww-spacing-02);
    }
}
</style>
