import mongoose from "mongoose";
import { Feedback } from "../models/feedback.model.js";

const createFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, ownerId, itemType } = req.body;

    if (!content || !id) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    if (!["Movie", "Series"].includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }

    const newFeedback = await Feedback.create({
      content,
      itemId: id,
      owner: ownerId,
      itemType,
    });

    const createdFeedback = await Feedback.findById(newFeedback?._id);

    if (!createdFeedback) {
      return res.status(500).json({
        message: "Failed to create Feedback",
      });
    }

    res.status(200).json({
      message: "Feedback created successfully",
      createdFeedback,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create feedback",
    });
  }
};

const getFeedbackForItem = async (req, res) => {
  const { itemId, itemType } = req.params;

  if (!["Movie", "Series"].includes(itemType)) {
    return res.status(400).json({ message: "Invalid item type" });
  }

  try {
    const feedbacks = await Feedback.find({ itemId, itemType }).populate({
      path: "owner",
      select: "name",
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }
    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error delete feedbacks", error });
  }
};

export { createFeedback, getFeedbackForItem, deleteFeedback };
