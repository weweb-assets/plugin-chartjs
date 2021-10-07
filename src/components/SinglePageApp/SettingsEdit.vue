<template>
    <div class="auth0-settings-edit">
        <wwEditorFormRow required label="Domain">
            <template #append-label>
                <a class="auth0-settings-edit__link" href="https://manage.auth0.com/#/applications" target="_blank">
                    Find it here
                </a>
            </template>
            <wwEditorInputText
                type="text"
                name="domain"
                placeholder="project-name.auth0.com"
                :model-value="settings.publicData.domain"
                large
                @update:modelValue="changePublicSettings('domain', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Client ID">
            <template #append-label>
                <a
                    class="auth0-settings-edit__link"
                    href="https://auth0.com/docs/get-started/create-apps/single-page-web-apps"
                    target="_blank"
                >
                    Find it here
                </a>
            </template>
            <wwEditorInputText
                type="text"
                name="client-id"
                placeholder=""
                :model-value="settings.publicData.SPAClientId"
                large
                @update:modelValue="changePublicSettings('SPAClientId', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Client Secret">
            <wwEditorInputText
                type="text"
                placeholder="**************"
                name="client Secret"
                :model-value="settings.privateData.SPAClientSecret"
                :style="{ '-webkit-text-security': isKeyVisible ? 'none' : 'disc' }"
                large
                @update:modelValue="changePrivateSettings('SPAClientSecret', $event)"
            />
        </wwEditorFormRow>
        <div class="auth0-settings-edit__row">
            <wwEditorInputSwitch v-model="isKeyVisible" />
            <span class="auth0-settings-edit__radio-label caption-m">Show client secret</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    data() {
        return {
            isKeyVisible: false,
        };
    },
    methods: {
        changePublicSettings(key, value) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, [key]: value },
            });
        },
        changePrivateSettings(key, value) {
            this.$emit('update:settings', {
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
