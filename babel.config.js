module.exports = function (api) {
  const validEnv = ['development', 'test', 'production'];
  const currentEnv = api.env();
  const isTestEnv = api.env('test');

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    );
  }

  return {
    presets: [
      isTestEnv && [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      !isTestEnv && [
        '@babel/preset-env',
        {
          forceAllTransforms: true,
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          exclude: ['transform-typeof-symbol'],
        },
      ],
    ].filter(Boolean),
    plugins: [
      'babel-plugin-macros',
      '@babel/plugin-syntax-dynamic-import',
      isTestEnv && 'babel-plugin-dynamic-import-node',
      '@babel/plugin-transform-destructuring',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: false, // Set 'loose' to false
        },
      ],
      [
        '@babel/plugin-proposal-object-rest-spread',
        {
          useBuiltIns: true,
        },
      ],
      [
        '@babel/plugin-proposal-private-methods',
        {
          loose: false, // Set 'loose' to false
        },
      ],
      [
        '@babel/plugin-proposal-private-property-in-object',
        {
          loose: false, // Set 'loose' to false
        },
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
        },
      ],
      [
        '@babel/plugin-transform-regenerator',
        {
          async: false,
        },
      ],
    ].filter(Boolean),
  };
};
