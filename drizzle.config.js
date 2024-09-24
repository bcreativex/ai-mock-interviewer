/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:kUuz0dZecB1H@ep-damp-dawn-a5rzsonx.us-east-2.aws.neon.tech/ai-mock-interviewer?sslmode=require',
    }
  };