import { Series } from "../models/serise.model.js";

const createSeries = async (req, res) => {
  try {
    const { title, description, episode, rating } = req.body;

    if (!title || !description || !episode) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const newSeries = await Series.create({
      title,
      description,
      episode,
      rating,
    });

    const createdSeries = await Series.findById(newSeries?._id);

    if (!createdSeries) {
      return res.status(500).json({
        message: "Failed to create series",
      });
    }

    res.status(200).json({
      message: "series created successfully",
      createdSeries,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create series",
    });
  }
};

const getSeries = async (req, res) => {
  try {
    const allSeries = await Series.find();

    if (!allSeries) {
      return res.status(400).json({
        message: "No series found",
      });
    }

    res.status(200).json({
      message: "series fetched successfully",
      allSeries,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get Series",
    });
  }
};

const updateSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, episode } = req.body;

    const series = Series.findById(id);

    if (!series) {
      return res.status(404).json({
        message: "series not found",
      });
    }

    const updateSeries = await Series.findByIdAndUpdate(
      id,
      {
        title,
        description,
        episode,
      },
      { new: true }
    );

    const updated_series = await Series.findById(updateSeries?._id);

    if (!updated_series) {
      return res.status(400).json({
        message: "Failed to update series",
      });
    }

    res.status(200).json({
      message: "series updated successfully",
      updated_series,
    });
  } catch (error) {
    console.log("error while updating the series", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteSeries = async (req, res) => {
  try {
    const { id } = req.params;

    const series = await Series.findById(id);

    if (!series) {
      return res.status(404).json({
        message: "series not found",
      });
    }

    await Series.findByIdAndDelete(id);

    res.status(200).json({
      message: "series deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting the series", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { createSeries, getSeries, updateSeries, deleteSeries };
