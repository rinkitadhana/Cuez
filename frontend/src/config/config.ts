const config = {
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api",
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
  isDevelopment: process.env.NODE_ENV === "development",
}

export default config
