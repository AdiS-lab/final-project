import "dotenv/config";

export const config = {
  port: process.env.PORT || 3000,
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_KEY!,
  secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  secretRefreshKey: process.env.SECRET_REFRESH_KEY!,
  appMode: process.env.APP_MODE || "DEV",
};
