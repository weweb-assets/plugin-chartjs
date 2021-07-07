<template>
    <div class="auth0-settings-summary">
        <a
            class="ww-editor-link auth0-settings-summary__elem"
            :href="`https://manage.auth0.com/dashboard`"
            target="_blank"
            @click.stop
        >
            <div><wwEditorIcon large name="link" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">{{ settings.publicData.domain }}</span>
        </a>
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="direction" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">{{ settings.publicData.SPAClientId }}</span>
        </div>
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">
                {{ SPAClientSecret }}
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
        SPAClientSecret() {
            const clientSecret = this.settings.privateData.SPAClientSecret || '';
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
