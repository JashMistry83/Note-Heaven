import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  // console.log(Id);
  const Demanded_post = posts.find((items) => items.id === Id);

  // console.log(Demanded_post);

  res.json(Demanded_post);
});

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => {
  // const LastIndex = posts.findIndex((items)=>items[posts.length - 1])
  // console.log(posts.length - 1)
  const id = posts[posts.length - 1].id + 1;
  console.log(id);

  // console.log(req.body);

  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const date = new Date();

  const post = { id, title, content, author, date };

  posts.push(post);

  res.json(post);
  // const _date = req.body.date
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  // console.log(req.params.id)

  const _title = req.body.title;
  const _content = req.body.content;
  const _author = req.body.author;

  const _oldPost = posts.find((items) => items.id === parseInt(req.params.id));

  console.log(_oldPost);

  if (!_oldPost) {
    res.status(404).json("Not founded..");
  }

  if (req.body.title) {
    _oldPost.title = req.body.title;
  }
  if (req.body.content) {
    _oldPost.content = req.body.content;
  }
  if (req.body.author) {
    _oldPost.author = req.body.author;
  }

  console.log(_oldPost);
  res.json(_oldPost);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const Id = parseInt(req.params.id);
  // console.log(Id);
  const Demanded_post_index = posts.findIndex((items) => items.id === Id);

  console.log(Demanded_post_index);

  // posts[Demanded_post_index] = [];
  posts.splice(Demanded_post_index, 1);

  res.json(`Record's id = ${Demanded_post_index} get deleted.`);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
