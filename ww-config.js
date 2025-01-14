export default {
    editor: {
        // PROD
        // designSystemId: '40cf1c33-2c6e-4d37-b54d-7c877872e235',
        // STAGING
        designSystemId: '40cf1c33-2c6e-4d37-b54d-7c877872e235',
        /* wwEditor:start */
        settings: {
            copilot: {
                description: 'Configure Chart.js plugin settings',
                returns: 'void',
                schema: {
                    designSystemId: {
                        type: 'string',
                        description: 'The design system ID to use for the Chart.js plugin',
                        bindable: false
                    }
                }
            }
        }
        /* wwEditor:end */
    },
};