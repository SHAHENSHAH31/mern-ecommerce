const app=require('./app');
const PORT=8000;
const connectDatabase=require('./config/database');
const cloudinary = require("cloudinary");
          

// handle uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the surver due to Uncaught Exception`);
    process.exit(1);
})

connectDatabase();
 
cloudinary.config({ 
    cloud_name: 'dceylf5nx', 
    api_key: '895435565855439', 
    api_secret: 'fCrNCz2lbwvtOGBxRxu7xvMoz10' 
  });

const server=app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Error occuring in initaiting server");
        return;
    }
    console.log(`Server has connected on port ${process.env.PORT}`);
});
//unhandeled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the surver due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
})