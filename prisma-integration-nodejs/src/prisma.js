import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466",
});

// prisma.query
// prisma.mutation
// prisma.subscription
// prisma.exists
// console.log("hello World");

//first argument: operationa argument
//second argument: selection chat

// prisma.query.users(null, "{id name}").then((data) => {
//   console.log(data);
// });

// console.log("------------------------------");

// prisma.query.users(null, "{id name posts {id title}}").then((data) => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.users({where : {id: 'cm2jfj0bz00ln0931co0luxi3'}}, "{id name posts {title}}").then((data) => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// console.log("------------------------------");

// prisma.query
//   .comments(null, "{id text post {id title} author {name }}")
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });
// console.log("------------------------------");

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "My new graphql Post",
//         body: "Course",
//         published: true,
//         author: {
//           connect: {
//             id: "cm2jfj0bz00ln0931co0luxi3",
//           },
//         },
//       },
//     },
//     "{id title body published}"
//   )
//   .then((data) => {
//     // console.log(JSON.stringify(data, undefined, 2));

//     return prisma.query.users(null, "{id name posts {id title}}");
//   })
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation.createPost({
//     data: {
//               title: "My new graphql Post",
//               body: "Course",
//               published: true,
//               author: {
//                 connect: {
//                   id: "cm2jfj0bz00ln0931co0luxi3",
//                 },
//               },
//             },
//   }, "{id, title author {name}}"
// ).then(data=> {
//   console.log('data',JSON.stringify(data, undefined, 2));
// })

//------------using async await-------------------------------------------

//check if data exists using prisma binding

const createPostForUser = async (authorId, data) => {
  try {
    //------------
    const Userexists = await prisma.exists.User({
      id: authorId,
    });

    if (!Userexists) {
      throw new Error(`User with id ${authorId} does not exist`);
    }

    const post = await prisma.mutation.createPost(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      },
      "{id}"
    );

    const user = await prisma.query.user(
      { where: { id: authorId } },
      "{id name posts {title}}"
    );
    return user;
  } catch (error) {
    console.log("error", error.message);
  }
};

const data = {
  title: "My new graphql Post",
  body: "Course",
  published: true,
};

createPostForUser("cm2jfj0bz00ln0931co0luxi3", data).then((result) => {
  console.log("badjatya", JSON.stringify(result, undefined, 2));
});

//----------------------------------------------------------

//update Post

// const updateUserPost = async (data, postId) => {
//   const updatedPost = await prisma.mutation.updatePost({
//     where: { id: postId },
//     data: {
//       ...data
//     }
//   }, "{author {name id email}}");

//   const userPosts =await prisma.query.users({where: {
//     id: updatedPost.author.id
//   }}, "{posts {id title}}")
//   return userPosts
// };

// const updateData = {
//       title: "pipli badjatya"
//     }
// updateUserPost(updateData, "cm2jhdcbg017u0931pgcyvwbs").then(data=> {
//     console.log('data bajatya',JSON.stringify(data, undefined, 2));
//   })
