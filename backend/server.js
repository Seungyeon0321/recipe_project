const dotenv = require("dotenv");
const MongoClient = require;
const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! Shutting down..");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

//this is way to read the variables from our env file and save them

//Mongodb랑 접속하는 방법, mongoose를 이용
const DB = process.env.MONGO_URL.replace("<password>", process.env.MONGO_PW);

let client;
// .connect(process.env.DATABASE_LOCAL) //이렇게 local로도 접속가능
const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(error);
  }
};

connectDB();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//catch unhandled promise rejection (config.env에서 비밀번호를 틀리게 되면 해당 메세지가 뜬다, 이럴때 위에 mongoose connect에서 catch로 해당 에러를 관리하는 것도 가능하지만 global 적으로 관리하는 것도 알아야 한다, 앱이 엄청 큰 경우에는 그래야 함) 아래와 같이 관리가 가능하다

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION!! Shutting down..");
  console.log(err);
  //process.exit(1)을 하게 되면 바로 즉각적으로 프로그램을 중지시키기 때문에 이상적이기 않기 때문에 순차적으로 서버먼저 종료시키고 프로그램을 종료 시키기 위한 코드
  server.close(() => {
    process.exit(1);
  });
});

//*

module.exports = { connectDB, client };
