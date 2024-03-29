const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Post = require("../models/Post");
const fs = require("fs");

const addPost = async (req, res) => {
  const post = new Post({
    title: "Tottenham on Top",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin volutpat accumsan ipsum at fermentum. Ut ut aliquam diam. Nam et purus vehicula nisi tempor scelerisque non quis sem. Aenean vel ligula lectus. Curabitur non mattis tortor. Fusce feugiat sapien vitae metus tempus dictum. In venenatis accumsan sapien, eu volutpat sapien ultricies quis. Donec eu mauris eget mi eleifend imperdiet. Donec nec ligula convallis, accumsan massa eget, volutpat nunc. Nulla congue lobortis porttitor. Vivamus et velit vitae libero semper tempus quis ut dolor. Nam fringilla nunc eget orci molestie ullamcorper. Vestibulum vitae vestibulum nisi, at fermentum nibh. Nunc pulvinar faucibus dolor, et vulputate diam imperdiet a. Cras dictum, erat condimentum tincidunt facilisis, est leo faucibus libero, a sollicitudin turpis sem non enim. Nullam suscipit leo eget nunc ullamcorper, ut venenatis quam elementum. Sed bibendum, lacus quis tempor maximus, nisl enim porta eros, nec aliquam odio erat in nisi. Donec nec hendrerit est. In a varius sapien. Cras molestie odio eros, in rutrum massa cursus ac. Morbi a rhoncus massa.In viverra arcu vel purus sollicitudin faucibus. Aliquam nibh nisl, dictum eget efficitur at, tincidunt in dolor. Nulla purus tellus, pulvinar ut tristique nec, egestas vitae enim. Nunc fermentum tristique facilisis. Pellentesque ut aliquet felis. Proin ac porta tortor, in ullamcorper nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam eu odio erat.Nulla accumsan, enim ac dapibus lobortis, mauris ipsum ornare mauris, sed pharetra augue turpis at magna. Etiam placerat fermentum purus non placerat. Sed sit amet nulla erat. In et risus felis. Quisque eu mollis elit. Quisque ornare, turpis id congue porta, augue quam fermentum velit, in aliquam metus nunc vel enim. Donec finibus fringilla ex, at suscipit sapien consequat in. Vestibulum tortor lacus, molestie auctor libero a, volutpat facilisis ipsum. Fusce lacinia non magna quis sodales. Fusce eget orci in quam aliquet hendrerit id in ipsum.Praesent congue volutpat justo, nec maximus leo finibus at. Nullam rutrum ipsum ante, et venenatis dui malesuada commodo. Integer facilisis imperdiet quam, ac viverra ligula feugiat a. Fusce imperdiet mauris tincidunt lacus placerat, ac placerat ex sollicitudin. Ut commodo aliquet ipsum, commodo pellentesque orci cursus id. Mauris consectetur in enim id posuere. Nunc non pellentesque odio. Nulla maximus tincidunt aliquet.",
    image: fs.readFileSync("./Tottenham.webp"),
  });

  try {
    const createdPost = await Post.create(post);
    res.status(StatusCodes.CREATED).json(createdPost);
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const getPosts = async (req, res) => {
  const { count } = req.query;
  let posts;
  try {
    if (count) {
      posts = await Post.find({}).sort({ updatedAt: -1 }).limit(count);
    } else {
      posts = await Post.find({}).sort({ updatedAt: -1 });
    }
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    throw new NotFoundError(error);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.find({ _id: id });
    res.status(StatusCodes.OK).json(...post);
  } catch (error) {
    throw new NotFoundError(error);
  }
};

module.exports = { addPost, getPosts, getPost };
