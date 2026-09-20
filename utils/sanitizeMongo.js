// Strips MongoDB operator keys ($gt, $ne, etc.) and dotted paths from
// user-supplied input, so form fields can never be crafted into query
// operators (a classic NoSQL injection vector when req.body/req.query
// values are passed straight into Mongoose .find()/.findOne() calls).
function sanitizeValue(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === "object") {
    const clean = {};
    for (const key of Object.keys(value)) {
      if (key.startsWith("$") || key.includes(".")) {
        continue; // drop dangerous keys entirely
      }
      clean[key] = sanitizeValue(value[key]);
    }
    return clean;
  }
  return value;
}

module.exports = function sanitizeMongo(req, res, next) {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.params) req.params = sanitizeValue(req.params);
  // req.query is read-only in newer Express versions — mutate its
  // existing keys in place instead of reassigning the object itself.
  if (req.query) {
    const cleaned = sanitizeValue(req.query);
    for (const key of Object.keys(req.query)) {
      if (!(key in cleaned)) delete req.query[key];
    }
    Object.assign(req.query, cleaned);
  }
  next();
};
