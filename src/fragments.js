// 필드를 명시하지 않으면 null 채워져서 리턴됨
export const USER_FRAGMENT = `
  fragment UserParts on User {
    id
    username
    email
    firstName
    lastName
    bio
    posts {
      id
      caption
    }
  }
`;