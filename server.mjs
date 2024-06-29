import app from "./src/index.mjs";

const PORT = process.env.PORT | 3000;

app.listen(PORT,() => {
    console.log(`The app is running at port ${PORT}`);
})