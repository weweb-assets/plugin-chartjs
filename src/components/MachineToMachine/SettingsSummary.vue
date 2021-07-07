<template>
    <div class="auth0-settings-summary">
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="direction" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">{{ settings.publicData.M2MClientId }}</span>
        </div>
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">
                {{ M2MClientSecret }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        M2MClientSecret() {
            const clientSecret = this.settings.privateData.M2MClientSecret || '';
            return clientSecret.replace(/./g, '*');
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
