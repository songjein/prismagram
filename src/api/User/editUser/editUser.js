import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username, email, firstName, lastName, bio } = args;
      const { user } = request;
      // 리턴을 바로 해버릴 때는 await이 필요 없음 (이 promise가 자동으로 resolve 됨)
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio }
      });
    }
  }
};
