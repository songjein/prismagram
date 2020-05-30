import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  // payload에는 토큰에서 해석된 id가 담겨있음
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user); // authenticate에 전달한 콜백
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// middleware
// passport.authenticate은  밑에서 등록했던 Strategy를 이용해서 jwt 토큰을 추출
// => 토큰이 추출 되면 verifyUser를 payload와 함께 실행
// => verifyUser에서 유저를 받아온 이후에 req 객체에 user를 넣어준다.
// express는 미들웨어를 거쳐 라우트가 실행 되는데, 거기서 req.user로 유저에 접근이 가능.
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user; // 이렇게 담으면, '최종적으로' server.js에서 context에 request를 담아주는 흐름
    }
    next();
  })(req, res, next); // passport.authenticate()은 func를 리턴함. 리턴된 함수를 (req, res, next)로 실행.

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();