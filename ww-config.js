module.exports = {
    componentPath: './src/index.js',
    editor: {
        settings: [
            {
                label: 'Set-up Single Page Application',
                icon: 'advanced',
                edit: () => import('./src/components/SinglePageApp/SettingsEdit.vue'),
                summary: () => import('./src/components/SinglePageApp/SettingsSummary.vue'),
            },
            {
                label: 'Set-up Machine to Machine Application',
                icon: 'advanced',
                edit: () => import('./src/components/MachineToMachine/SettingsEdit.vue'),
                summary: () => import('./src/components/MachineToMachine/SettingsSummary.vue'),
            },
            {
                label: 'Define rediretions (URLs)',
                icon: 'open-out',
                edit: () => import('./src/components/Redirections/SettingsEdit.vue'),
                summary: () => import('./src/components/Redirections/SettingsSummary.vue'),
            },
        ],
        designSystemId: '33059de9-35aa-4cd8-80b6-ad59d464dc45',
    },
};
