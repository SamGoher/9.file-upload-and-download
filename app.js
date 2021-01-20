// application requirements
const express = require(`express`);
const app = express();
const path = require(`path`);
const multer = require(`multer`);
const storage = require(`./utils/multerStorage`);
const upload = multer({
  storage: storage,
  limits: {fileSize: 3145729}

});

// handling the body of request
app.use(express.urlencoded({extended: false}));

// serving static files
app.use(express.static(`./public`));

// setting port
const port = process.env.PORT || 3000;

// @desc    get index page
// @route   GET '/'
// @access  public
app.get(`/`, (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, `./views/index.html`));
  } catch (error) {
    next(error);
  }
});

// @desc    get download page
// @route   GET '/download'
// @access  public
app.get(`/download`, (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, `./views/download.html`));
  } catch (error) {
    next(error);
  }
});

// @desc    upload files
// @route   POST '/upload'
// @access  private
app.post(`/upload`, upload.single(`avatar`), (req, res, next) => {
  try {
    res.redirect(`/images/${req.file.filename}`);
  } catch (error) {
    next(error);
  }

  // console.log(req.file);
});

// @desc    downloading files
// @route   GET '/download'
// @access  private
app.get(`/downloadit`, (req, res, next) => {
  try {
    const file = `${__dirname}/public/images/someImg.jpg-1611174737220.jpg`;
    res.download(file);
  } catch (error) {
    next(error);
  }

  // console.log(req.file);
});

app.use((err, req, res, next) => {

  console.log(err);

  if(err.code === `LIMIT_FILE_SIZE`) {

    res.json({
      success: `false`,
      message: `file too large, maximum size of uploading files is 3mb.`
    });

  } else {

    res.json({
      success: `false`,
      message: `there's an error occured.`
    });

  }
  
})

app.listen(port, () => {
  console.log(`server listening to port ${port} ...`);
});