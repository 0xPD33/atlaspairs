const { ethers } = require("ethers");
const express = require("express");
const { poolMaster, provider, eventData } = require("../global");

const router = express.Router();

const filters = {
  day: 24 * 60 * 60,
  week: 7 * 24 * 60 * 60,
  month: 30 * 24 * 60 * 60,
};

function getEventsForPeriod(period) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const targetTimestamp = currentTimestamp - period;

  const winnerEvents = eventData.winnerEvents.filter(
    (event) => event.timestamp >= targetTimestamp,
  );
  const loserEvents = eventData.loserEvents.filter(
    (event) => event.timestamp >= targetTimestamp,
  );

  return { winnerEvents, loserEvents };
}

function calculateWinnerStats(events) {
  const amounts = events.map((event) => event.amount);
  const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);
  const avgAmount = totalAmount / events.length;
  const addressCounts = {};

  events.forEach((event) => {
    const { address } = event;
    addressCounts[address] = (addressCounts[address] || 0) + 1;
  });

  const sortedAddressCounts = Object.entries(addressCounts).sort(
    (a, b) => b[1] - a[1],
  );
  const topAddress = sortedAddressCounts[0]?.[0] || null;
  const topCount = sortedAddressCounts[0]?.[1] || 0;

  return { totalAmount, avgAmount, topAddress, topCount };
}

function calculateLoserStats(events) {
  const amounts = events.map((event) => event.amount);
  const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);
  const avgAmount = totalAmount / events.length;
  const addressCounts = {};

  events.forEach((event) => {
    const { address } = event;
    addressCounts[address] = (addressCounts[address] || 0) + 1;
  });

  const sortedAddressCounts = Object.entries(addressCounts).sort(
    (a, b) => b[1] - a[1],
  );
  const topAddress = sortedAddressCounts[0]?.[0] || null;
  const topCount = sortedAddressCounts[0]?.[1] || 0;

  return { totalAmount, avgAmount, topAddress, topCount };
}

router.get("/", (req, res) => {
  const period = req.query.period ? filters[req.query.period] : filters.day;

  const { winnerEvents, loserEvents } = getEventsForPeriod(filters.day);

  const winnerStats = calculateWinnerStats(winnerEvents);
  const loserStats = calculateLoserStats(loserEvents);

  const leaderboardData = {
    winnerStats,
    loserStats,
  };
  console.log(leaderboardData);

  res.json(leaderboardData);
});
