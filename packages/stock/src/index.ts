import Stock from '@another/db/Stock';
import History from '@another/db/History';


export const history = (req, res ) => {
	Stock.findOne()
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
		.catch(e => res.status(404).json({
			error,
			message: "Dont found"
		}))

};