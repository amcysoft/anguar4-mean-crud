var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//mongoose.set('debug', true);
var User = new Schema(
		{
		password: {
			type: String,
			trim: true
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		OauthId: String,
		OauthToken: String,
		first_name: {
			type: String,
			required: true,
			trim: true
		},
		last_name: {
			type: String,
			required: true,
			trim: true
		}
	},
	{
		timestamps: true
	}
).index({ email: 'text' });

User.virtual('full_name').get(function () {
	return this.first_name + ' ' + this.last_name;
});
User.set('toJSON', {
	virtuals: true
});

User.methods.setPassword = function (password, cb) {
    if (!password) {
        return cb(new BadRequestError(options.missingPasswordError));
    }

    var self = this;

    crypto.randomBytes(options.saltlen, function(err, buf) {
        if (err) {
            return cb(err);
        }

        var salt = buf.toString('hex');

        crypto.pbkdf2(password, salt, options.iterations, options.keylen, function(err, hashRaw) {
            if (err) {
                return cb(err);
            }

            self.set(options.hashField, new Buffer(hashRaw, 'binary').toString('hex'));
            self.set(options.saltField, salt);

            cb(null, self);
        });
    });
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);