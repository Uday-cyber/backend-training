import cron from "node-cron";
import Task from "../models/Tasks.js";
import mongoose from "mongoose";
import cronLogs from "../models/cronLogs.js";

cron.schedule("0 * * * *", async () => {
  try {
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
    await Task.updateMany(
      { status: "pending", createdAt: { $lt: cutoff } },
      { $set: { status: "overdue" } }
    );

    await cronLogs.create({
      job: "pending→overdue",
      message: `Updated ${result.modifiedCount} tasks`,
      status: "success",
      runAt: new Date(),
    });

    console.log("CRON: Pending -> Overdue updated");
  } catch (err) {
    await cronLogs.create({
      job: "pending→overdue",
      message: err.message,
      status: "failed",
      runAt: new Date(),
    });
    console.log("CRON ERROR (pending->overdue):", err);
  }
});

cron.schedule("0 3 * * 0", async () => {
  try {
    await Task.updateMany(
      { status: "completed" },
      { $set: { status: "archived" } }
    );

    await cronLogs.create({
      job: "pending→overdue",
      message: `Updated ${result.modifiedCount} tasks`,
      status: "success",
      runAt: new Date(),
    });

    console.log("CRON: Completed -> Archived moved");
  } catch (err) {
    await cronLogs.create({
      job: "pending→overdue",
      message: err.message,
      status: "failed",
      runAt: new Date(),
    });
    console.log("CRON ERROR (archive):", err);
  }
});

cron.schedule("0 0 * * *", async () => {
  try {
    const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await Task.deleteMany({
      status: "archived",
      updatedAt: { $lt: cutoff },
    });

    await cronLogs.create({
      job: "pending→overdue",
      message: `Updated ${result.modifiedCount} tasks`,
      status: "success",
      runAt: new Date(),
    });

    console.log("CRON: Old archived tasks deleted");
  } catch (err) {
    await cronLogs.create({
      job: "pending→overdue",
      message: err.message,
      status: "failed",
      runAt: new Date(),
    });
    console.log("CRON ERROR (delete old archive: ", err);
  }
});

// cron.schedule("*/10 * * * * *", () => {
//     console.log("running every 10 seconds");
// });
