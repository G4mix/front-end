export const parseCookie = (cookie: string) => {
  const [content, ...options] = cookie.split("; ");
  const [name, value] = content.split("=");
  const opts = options.reduce((acc, option) => {
    const [optName, optValue] = option.split("=");
    return { ...acc, [optName]: optValue || true };
  }, {});
  return { name, value, opts };
};