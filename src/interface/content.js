const qs = require('querystring');
const mime = require('mime-types');
const { content } = require('../domain');
const { validator } = require('./middleware');
const { Joi, validate } = validator;

const { Log } = require('../domain');

const contentValidation = {
  params: Joi.object({
    ipfsHash: Joi.string().required(),
  }),
};

async function contentFn(req, res) {
  const { ipfsHash } = req.params;
  const { download } = req.query;
  const { contentStream, mimetype } = await content(ipfsHash);
  const extension = mime.extension(mimetype);
  const filename = `${ipfsHash}.${extension}`;
  const header = {
    'Content-Type': mimetype,
  };
  if (download) {
    header['Content-Disposition'] = `attachment; filename="${qs.escape(
      filename,
    )}"`;
    await Log.create('download', ipfsHash);
  } else {
    await Log.create('view', ipfsHash);
  }
  res.writeHead(200, header);
  contentStream.pipe(res);
}

module.exports = [validate(contentValidation), contentFn];
