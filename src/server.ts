import { app } from "./config/app"

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000")
})
