<template>
    <div class="auth0-settings-summary" v-if="isValid">
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="direction" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">{{ this.settings.publicData.M2MClientId }}</span>
        </div>
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">
                {{ this.settings.privateData.M2MClientSecret.replace(/./g, '*') }}
            </span>
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
            const { domain, M2MClientId } = this.settings.publicData;
            const { M2MClientSecret } = this.settings.privateData;
            return !!domain && !!M2MClientId && !!M2MClientSecret;
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
    &__value {
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
