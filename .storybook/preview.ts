import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "gamix",
      values: [
        {
          name: 'gamix',
          value: '#1C2034',
        }
      ],
    },
  },
};

export default preview;
