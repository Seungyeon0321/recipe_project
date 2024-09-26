// const mongoose = require("mongoose");

// const GoogleAndFaceBookUserSchema = new mongoose.Schema({
//   googleId: {
//     type: String,
//     unique: true,
//   },
//   facebookId: {
//     type: String,
//     unique: true,
//   },
//   userEmail: {
//     type: String,
//     unique: true,
//   },
//   userName: {
//     type: String,
//   },
//   provider: {
//     type: String,
//   },
// });

// const GoogleAndFaceBookUser = mongoose.model(
//   "GoogleAndFaceBookUser",
//   GoogleAndFaceBookUserSchema
// );

// module.exports = GoogleAndFaceBookUser;

// const DataTypes = require("sequelize");
// const { Model } = DataTypes;

// module.exports = class GFUser extends Model {
//   static init(sequelize) {
//     return super.init(
//       {
//         googleId: {
//           type: DataTypes.STRING(100),
//         },
//         facebookId: {
//           type: DataTypes.STRING,
//         },
//         userEmail: {
//           type: DataTypes.STRING(30),
//         },
//         userName: {
//           type: DataTypes.STRING,
//         },
//         provider: {
//           type: DataTypes.STRING,
//         },
//       },
//       {
//         modelName: "GFUser",
//         tableName: "GFUsers",
//         charset: "utf8",
//         collate: "utf8_general_ci",
//         sequelize,
//       }
//     );
//   }

//   static associations(db) {}
// };
