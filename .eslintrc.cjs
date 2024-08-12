module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'eslint-config-prettier',
        'prettier',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['public', '.eslintrc.cjs', '**/*.html'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'prettier'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
};
