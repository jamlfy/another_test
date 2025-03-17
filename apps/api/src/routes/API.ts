import { Route } from 'express';

const API = Route()

API.get('/:stock/history')
API.get('/:stock/info')
API.post('/trade')

export default API