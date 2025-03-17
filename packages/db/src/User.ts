import crypto from "node:crypto";
import mongoose from './connection';
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    select: true,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  hash; {
  	type: String,
    required: true,
    select: false,
    transform: () => null,
  },
  date: Date
});

class UserClass {

	async hash(password) {
	    return new Promise((resolve, reject) => {
	        const salt = crypto.randomBytes(8).toString("hex")

	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) reject(err);
	            this.hash = salt + ":" + derivedKey.toString('hex');
	            resolve(this);
	        });
	    })
	}

	private async verify(password) {
	    return new Promise((resolve, reject) => {
	        const [salt, key] = this.hash.split(":")
	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) reject(err);
	            resolve(key == derivedKey.toString('hex'))
	        });
	    })
	}

	static async login(email, password) {
		const isPassword = await this
			.findOne({ email })
			.then(user => user.verify(password);

  	 	if(!isPassword){
  	 		throw new Error('Is not the password') 
  	 	}

    	return user;
  }
}

userSchema.loadClass(UserClass);
userSchema.virtual('id').get(function() {
  return this._id;
});
UserSchema.pre('save', function(next, doc) {
	doc.date = new Date();
	next();
});


export default  mongoose.model('users', UserSchema);