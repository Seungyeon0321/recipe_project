const multer = require("multer");
const jwt = require("jsonwebtoken");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

exports.upload = upload;

exports.isLoggedIn = (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("No token provided");
    }

    const token = authHeader.split(" ")[1]; // "Bearer {token}" 형식에서 토큰만 추출

    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 디코딩된 사용자 정보를 req.user에 저장
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("Only user who does not log in can access it");
  }
};
