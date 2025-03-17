import Stock from '@another/db/Stock';
import History from '@another/db/History';


export const history = (req, res ) => {
	const time  = parseInt(req.query.time) ?? 15;

	History.aggregate([
	  { 
	  	"$group": {
		    "_id": {
		      "year": { "$year": "$date" },
		      "dayOfYear": { "$dayOfYear": "$date" },
		      "hour": { "$hour": "$date" },
		      "interval": {
		        "$subtract": [ 
		          { "$minute": "$date" },
		          { "$mod": [{ "$minute": "$date"}, time] }
		        ]
		      }
		    },
		    minPrice: { $min: { $divide: [ "$price", "$amount" ] } },
     		maxPrice: { $max: { $divide: [ "$price", "$amount" ] } },
     		averagePrice: { $avg: { $divide: [ "$price", "$amount" ] } },

		},
	    "count": { "$sum": 1 }
	  },

	])
};

export const info = = (req, res ) => {
	Stock.findOne({
		tick: req.params.name
	}).exec()
		.then(e => {
			if(!e){
				throw new Error('Dont found')
			}

			return res.json(e);
		})
		.catch(error => res.status(404).json({
			error,
			message: "Dont found"
		}))

};