import { Route } from 'express';
import passport from "./jwt";
import stock from '@another/stock';

const API = Route()

API.get('/:stock/history', stock.history)
API.get('/:stock/info', stock.info)
API.post('/trade', passport.authenticate("jwt", { session: false }), stock.trade);

export default API