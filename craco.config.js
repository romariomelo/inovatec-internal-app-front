const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#3c3c3a",
          "@link-color": "#3c3c3a",
          "@success-color": "#52c41a", // success state color
          "@warning-color": "#faad14", // warning state color
          "@error-color": "#f5222d", // error state color
          "@font-size-base": "14px", // major text font size
          "@heading-color": "rgba(0, 0, 0, 0.85)", // heading text color
          "@text-color": "rgba(0, 0, 0, 0.65)", // major text color
          "@text-color-secondary": "rgba(0, 0, 0, 0.45)", // secondary text color
          "@disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
          "@border-radius-base": "2px", // major border radius
          "@border-color-base": "#d9d9d9", // major border color
          "@layout-header-background": "#3c3c3a",
          "@box-shadow-base":
            "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  ],
};
