import mongoose from './connection';
const { Schema } = mongoose;

const UserSchema = new Schema({
  id: ObjectId,
  email: {
    type: String,
    required: true,
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
  },
  date: Date
});

class UserClass {
	setPassword(pass){
		this.password = password( passwordString, this._id );
	}

	async hash(password) {
	    return new Promise((resolve, reject) => {
	        const salt = crypto.randomBytes(8).toString("hex")

	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) reject(err);
	            resolve(salt + ":" + derivedKey.toString('hex'))
	        });
	    })
	}

	async verify(password) {
	    return new Promise((resolve, reject) => {
	        const [salt, key] = this.hash.split(":")
	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) reject(err);
	            resolve(key == derivedKey.toString('hex'))
	        });
	    })
	}


	static async login(email, password) {
		const user = await this.findOne({ email });
  	 	
  	 	const isPassword = await user.verify(password);

  	 	if(!isPassword){
  	 		throw new Error('Is not the password') 
  	 	}

    	return user;
  }
}

userSchema.loadClass(UserClass);

UserSchema.pre('save', function(next) {
	doc.date = new Date();
	next();
});


export default  mongoose.model('users', UserSchema);