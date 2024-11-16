import mongoose from "mongoose";

const { Schema } = mongoose;

// Định nghĩa Schema
const bookingSchema = new Schema({
  customerName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Sử dụng kiểu String cho giờ
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
});

// Tạo Model
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
