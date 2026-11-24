import * as watchlistService from '../services/watchlistService.js';

export async function getWatchlist(req, res, next) {
  try {
    const watchlist = await watchlistService.getWatchlist(req.user.id);

    res.status(200).json(watchlist);
  } catch (error) {
    next(error);
  }
}

export async function addToWatchlist(req, res, next) {
  try {
    const entry = await watchlistService.addToWatchlist(
      req.user.id,
      Number(req.params.listingId)
    );

    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
}

export async function removeFromWatchlist(req, res, next) {
  try {
    await watchlistService.removeFromWatchlist(
      req.user.id,
      Number(req.params.listingId)
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}