<template>
    <div class="auth0-settings-summary" v-if="isValid">
        <a
            class="auth0-settings-summary__elem"
            :href="`https://manage.auth0.com/dashboard`"
            target="_blank"
            @click.stop
        >
            <wwEditorIcon large name="link" class="auth0-settings-summary__icon"></wwEditorIcon>
            <span class="caption-m">{{ this.settings.publicData.domain }}</span>
        </a>
        <div class="auth0-settings-summary__elem">
            <wwEditorIcon large name="key" class="auth0-settings-summary__icon"></wwEditorIcon>
            <span class="caption-m">{{ this.settings.publicData.clientId }}</span>
        </div>
        <div class="auth0-settings-summary__elem">
            <wwEditorIcon large name="key" class="auth0-settings-summary__icon"></wwEditorIcon>
            <span class="caption-m">{{ this.settings.privateData.clientSecret }}</span>
        </div>
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
            const { domain, clientId } = this.settings.publicData;
            const { clientSecret } = this.settings.privateData;
            return !!domain && !!clientId && !!clientSecret;
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
