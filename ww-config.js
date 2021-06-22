module.exports = {
    componentPath: './src/index.js',
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
        },
        designSystemId: '33059de9-35aa-4cd8-80b6-ad59d464dc45',
    },
};
