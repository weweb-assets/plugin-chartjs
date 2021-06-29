<template>
    <div class="auth0-settings-summary" v-if="isValid">
        <a
            class="ww-editor-link auth0-settings-summary__elem"
            :href="`https://manage.auth0.com/dashboard`"
            target="_blank"
            @click.stop
        >
            <div><wwEditorIcon large name="link" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">{{ this.settings.publicData.domain }}</span>
        </a>
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="direction" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">{{ this.settings.publicData.SPAClientId }}</span>
        </div>
        <div class="auth0-settings-summary__elem">
            <div><wwEditorIcon large name="key" class="auth0-settings-summary__icon" /></div>
            <span class="auth0-settings-summary__value caption-m">
                {{ this.settings.privateData.SPAClientSecret.replace(/./g, '*') }}
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
            const { domain, SPAClientId } = this.settings.publicData;
            const { SPAClientSecret } = this.settings.privateData;
            return !!domain && !!SPAClientId && !!SPAClientSecret;
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
