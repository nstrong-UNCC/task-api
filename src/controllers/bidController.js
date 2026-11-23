import * as bidService from '../services/bidService.js';

export async function placeBid(req, res, next) {
  try {
    const bid = await bidService.placeBid(
      Number(req.params.id),
      req.body.amount,
      req.user
    );

    res.status(201).json(bid);
  } catch (error) {
    next(error);
  }
}