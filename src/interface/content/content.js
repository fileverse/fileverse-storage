const qs = require('querystring');
const mime = require('mime-types');
const { content } = require('../../domain');
const { validator } = require('../middleware');
const { Joi, validate } = validator;

const Log = require('../../domain/log');

const contentValidation = {
  headers: Joi.object({
    contract: Joi.string().required(),
  }).unknown(true),
  query: Joi.object({
    ipfsHash: Joi.string().required(),
    fileId: Joi.string().required(),
    filename: Joi.string().required(),
    mimetype: Joi.string().required(),
    download: Joi.boolean().optional(),
  }),
};

async function contentFn(req, res) {
  const { contract } = req.headers;
  const { ipfsHash, fileId, filename, mimetype } = req.query;
  const { download } = req.query;
  const { contentStream } = await content(ipfsHash);
  const header = {
    'Content-Type': mimetype,
  };
  console.log(contentStream);
  if (download) {
    header['Content-Disposition'] = `attachment; filename="${qs.escape(
      filename,
    )}"`;
    await Log.create('download', { contractAddress: contract, fileId, ipfsHash });
  } else {
    await Log.create('view', { contractAddress: contract, fileId, ipfsHash });
  }
  res.writeHead(200, header);
  contentStream.pipe(res);
}

module.exports = [validate(contentValidation), contentFn];
