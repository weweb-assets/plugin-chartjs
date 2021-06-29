<template>
    <div class="auth0-settings-edit">
        <wwEditorFormRow required label="Client ID">
            <template slot="append-label">
                <a
                    class="auth0-settings-edit__link"
                    href="https://auth0.com/docs/get-started/create-apps/machine-to-machine-apps"
                    target="_blank"
                >
                    Find it here
                </a>
            </template>
            <wwEditorFormInput
                type="text"
                name="client-id"
                placeholder=""
                :value="settings.publicData.M2MClientId"
                @input="changePublicSettings('M2MClientId', $event)"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Client Secret">
            <wwEditorFormInput
                type="text"
                placeholder="**************"
                name="client Secret"
                :value="settings.privateData.M2MClientSecret"
                @input="changePrivateSettings('M2MClientSecret', $event)"
                :style="{ '-webkit-text-security': isKeyHidden ? 'disc' : 'none' }"
                large
            />
        </wwEditorFormRow>
        <div class="auth0-settings-edit__row">
            <wwManagerRadio :value="!isKeyHidden" @input="isKeyHidden = !$event" />
            <span class="auth0-settings-edit__radio-label caption-m">Show client secret</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    data() {
        return {
            isKeyHidden: true,
        };
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
            const { domain, M2MClientId } = this.settings.publicData;
            const { M2MClientSecret } = this.settings.privateData;
            return !!domain && !!M2MClientSecret && !!M2MClientId;
        },
    },
    methods: {
        changePublicSettings(key, value) {
            this.$emit('update-settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, [key]: value },
            });
        },
        changePrivateSettings(key, value) {
            this.$emit('update-settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, [key]: value },
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
