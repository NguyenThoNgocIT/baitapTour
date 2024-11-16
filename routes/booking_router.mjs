import express from "express";
import BookingController from "../controllers/booking_controller.mjs";

const router = express.Router();

// Lấy danh sách lịch đặt chỗ
router.get("/bookings", BookingController.index);

// Hiển thị form tạo mới lịch đặt chỗ
router.get("/bookings/new", BookingController.new);

// Tạo lịch đặt chỗ mới
router.post("/bookings", BookingController.create);

// Hiển thị form chỉnh sửa lịch đặt chỗ
router.get("/bookings/:id/edit", BookingController.edit);

// Cập nhật lịch đặt chỗ
router.put("/bookings/:id", BookingController.update);

// Xóa lịch đặt chỗ
router.delete("/bookings/:id", BookingController.delete);

// Hủy lịch đặt chỗ (thay đổi trạng thái thành "Cancelled")
router.post("/bookings/:id/cancel", BookingController.cancel);

export default router;
