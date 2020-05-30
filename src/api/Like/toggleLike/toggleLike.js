import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      }
      try {
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          // prisma.deleteLike()의 경우엔 아이디를 직접 전달해야해
          await prisma.deleteManyLikes(filterOptions);
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
