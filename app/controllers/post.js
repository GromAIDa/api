const fs = require('fs');
const Post = require('../schemas/Post');
const errors = require('../middleware/errors/errors');
const StatusCodes = require('../data/status-codes');
const mailerService = require('../services/mailer.service');
const errorsMsg = require('../data/error-message');

exports.getPosts = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const options = {
      page,
      limit,
      collation: {
        locale: 'en',
      },
      sort: { createdAt: -1 },
    };
    Post.paginate({}, options, (err, data) => {
      res.status(StatusCodes.OK).send({ data });
    });
  }
};

exports.postView = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    Post.updateOne({ _id: req.query.id }, { $inc: { views: +1 } }).then(
      (data) => {
        if (!data.length) {
          res.status(StatusCodes.CREATED).send({});
        } else {
          res.status(StatusCodes.NOT_FOUND).send(errorsMsg.IsNotFound('post'));
        }
      }
    );
  }
};

exports.addPost = (req, res) => {
  if (!errors.ContainsError(req, res)) {
    if (!req.files.length) {
      res.status(StatusCodes.OK).send({
        errors: [
          {
            value: [],
            msg: 'Photos is empty',
            param: 'photo',
            location: 'files',
          },
        ],
      });
    } else {
      Post.create({
        photos: req.files.map((el) => ({
          photo: el.filename,
        })),
        description: req.body.description,
        title: req.body.title,
        timeToRead: Math.round(
          (req.body.description.length + req.body.title.length) / 200
        ),
      })
        .then((data) => {
          if (data) {
            mailerService.sendUpdatesForSubscribers(
              'Our team have added a new post'
            );
            res.status(StatusCodes.OK).send({ data });
          }
        })
        .catch((err) => {
          req.files
            .map((el) => ({
              photo: el.path,
            }))
            .forEach((element) => {
              const path = element.photo;
              fs.unlink(path, () => {
                res.status(StatusCodes.UNAUTHORIZED).json(err);
              });
            });
        });
    }
  } else {
    req.files
      .map((el) => ({
        photo: el.path,
      }))
      .forEach((element) => {
        const path = element.photo;
        fs.unlink(path);
      });
  }
};
