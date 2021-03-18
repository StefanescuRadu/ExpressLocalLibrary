var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
  return (
    this.date_of_birth_formatted +
    " - " +
    this.date_of_death_formatted
  ).toString();
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

// Virtual for formatted date of birth
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Virtual for formatted date of birth
AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

AuthorSchema.virtual("date_of_birth_form").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toFormat("yyyy-LL-dd")
    : "";
});

AuthorSchema.virtual("date_of_death_form").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toFormat("yyyy-LL-dd")
    : "";
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
