const env = {
  API_URL: (process.env.NEXT_PUBLIC_API_URL as string) || "",
  IMAGEKIT_PUBLIC_KEY:
    (process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string) || "",
  IMAGEKIT_URL_ENDPOINT:
    (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string) || "",
  IMAGEKIT_AUTH_ENDPOINT:
    (process.env.NEXT_PUBLIC_IMAGEKIT_AUTH_ENDPOINT as string) || "",
};

export default env;
