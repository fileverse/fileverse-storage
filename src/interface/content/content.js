const qs = require('querystring');
const mime = require('mime-types');
const File = require('../../domain/file')
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

/** Define the contentFn function that handles the request and response
 *
 * Handles the request and response for retrieving content.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function contentFn(req, res) {
  // Extract the contract from the request headers
  const { contract } = req.headers;
  // Extract the necessary query parameters from the request
  const { ipfsHash, fileId, filename, mimetype } = req.query;
  const { download } = req.query;
  // Retrieve the content stream using the ipfsHash
  const { contentStream } = await content(ipfsHash);

  // Set the response headers
  const header = {
    'Content-Type': mimetype,
  };

  console.log(contentStream);
  // If the download query parameter is present, set the Content-Disposition header for downloading
  if (download) {
    header['Content-Disposition'] = `attachment; filename="${qs.escape(
      filename,
    )}"`;
    // Log the download event
    await Log.create('download', { contractAddress: contract, fileId, ipfsHash });
  } else {
    // Log the view event
    await Log.create('view', { contractAddress: contract, fileId, ipfsHash });
  }
  // Write the response headers
  res.writeHead(200, header);
  // Pipe the content stream to the response
  contentStream.pipe(res);
}

module.exports = [validate(contentValidation), contentFn];
