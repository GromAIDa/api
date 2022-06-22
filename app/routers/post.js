const postController = require('../controllers/post');
const upload = require('../services/multers/multer-photo.service');
const validators = require('../middleware/validators/validators');
const commonValidators = require('../middleware/validators/common-validators');
const postValidators = require('../middleware/validators/post');

module.exports = function (app) {
  app.post(
    '/post',
    upload.array('files'),
    validators.postValidatorsPost,
    (req, res) => {
      postController.addPost(req, res);
    }
  );

  app.get('/posts', commonValidators.limit(), (req, res) => {
    postController.getPosts(req, res);
  });

  app.post('/post-view', postValidators.id(), (req, res) => {
    postController.postView(req, res);
  });
};
