type Provider = {
  issuer: string;
  clientId: string;
};

type ZKLoginConfig = {
  providers: { [key: string]: Provider };
  redirectUri: string;
};

export const ZKLOGIN_CONFIG: ZKLoginConfig = {
  providers: {
    google: {
      issuer: "https://accounts.google.com",
      clientId: "933952394130-rgdnihvcuiqnee2lc2618ntrbhfk1uel.apps.googleusercontent.com",
    },
    // Uncomment and configure additional providers as needed:
    // facebook: {
    //   issuer: "https://www.facebook.com",
    //   clientId: "YOUR_FACEBOOK_CLIENT_ID",
    // },
    // apple: {
    //   issuer: "https://appleid.apple.com",
    //   clientId: "YOUR_APPLE_CLIENT_ID",
    // },
    // twitch: {
    //   issuer: "https://id.twitch.tv/oauth2",
    //   clientId: "YOUR_TWITCH_CLIENT_ID",
    // },
  },
  redirectUri: "http://localhost:5173/callback",
};

