// import Booking from "../models/booking_model.mjs";

// class BookingController {
//   // Lấy danh sách lịch đặt chỗ
//   static async index(req, res) {
//     let q = req.query.q; // Tìm kiếm theo tên hoặc trạng thái
//     const re = new RegExp(q, "i"); // Tìm kiếm không phân biệt hoa thường
//     let bookings;

//     if (q) {
//       bookings = await Booking.find({
//         $or: [{ customerName: re }, { status: re }],
//       });
//     } else {
//       bookings = await Booking.find({});
//     }

//     res.render("index", { title: "Booking Management", bookings, q });
//   }

//   // Hiển thị form tạo mới lịch đặt chỗ
//   static async new(req, res) {
//     res.render("newBooking", { title: "Create New Booking" });
//   }

//   // Tạo lịch đặt chỗ mới
//   static async create(req, res) {
//     let { customerName, date, time } = req.body;

//     try {
//       // Kiểm tra trùng lịch đặt
//       const existingBooking = await Booking.findOne({ date, time });
//       if (existingBooking) {
//         return res.send("The booking already exists for this date and time.");
//       }

//       let booking = await Booking.create({
//         customerName,
//         date,
//         time,
//       });

//       if (booking) {
//         res.redirect("/bookings");
//       } else {
//         res.render("newBooking", { title: "Create New Booking" });
//       }
//     } catch (error) {
//       console.error("Error creating booking:", error.message);
//       res.status(500).send("Error creating booking.");
//     }
//   }
//   // Hiển thị form chỉnh sửa lịch đặt chỗ
//     static async edit(req, res) {
//       try {
//         // Kiểm tra và chuyển đổi id thành ObjectId nếu cần
//         const bookingId = mongoose.Types.ObjectId.isValid(req.params.id)
//           ? req.params.id
//           : null;
  
//         if (!bookingId) {
//           return res.status(400).send("Invalid booking ID");
//         }
  
//         let booking = await Booking.findById(bookingId);
  
//         if (!booking) {
//           return res.status(404).send("Booking not found");
//         }
  
//         res.render("editBooking", { title: "Edit Booking", booking });
//       } catch (error) {
//         console.error("Error loading booking for edit:", error.message);
//         res.status(500).send("Error loading booking.");
//       }
//     }
//   }

//   // Cập nhật lịch đặt chỗ
//   static async update(req, res) {
//     let { customerName, date, time } = req.body;

//     try {
//       let updatedBooking = await Booking.findByIdAndUpdate(
//         req.params.id,
//         { customerName, date, time },
//         { new: true }
//       );

//       if (updatedBooking) {
//         res.redirect("/bookings");
//       } else {
//         res.render("editBooking", { title: "Edit Booking", booking: updatedBooking });
//       }
//     } catch (error) {
//       console.error("Error updating booking:", error.message);
//       res.status(500).send("Error updating booking.");
//     }
//   }

//   // Xóa lịch đặt chỗ
//   static async delete(req, res) {
//     let id = req.params.id;

//     try {
//       let { deletedCount } = await Booking.deleteOne({ _id: id });
//       if (deletedCount === 0) {
//         console.log("Unable to delete booking!");
//       } else {
//         console.log("Booking deleted successfully!");
//       }

//       res.redirect("/bookings");
//     } catch (error) {
//       console.error("Error deleting booking:", error.message);
//       res.status(500).send("Error deleting booking.");
//     }
//   }

//   // Hủy lịch đặt chỗ
//   static async cancel(req, res) {
//     try {
//       let updatedBooking = await Booking.findByIdAndUpdate(
//         req.params.id,
//         { status: "Cancelled" },
//         { new: true }
//       );

//       if (updatedBooking) {
//         console.log("Booking cancelled successfully!");
//         res.redirect("/bookings");
//       } else {
//         res.status(404).send("Booking not found.");
//       }
//     } catch (error) {
//       console.error("Error cancelling booking:", error.message);
//       res.status(500).send("Error cancelling booking.");
//     }
//   }
// }

// export default BookingController;
import mongoose from 'mongoose';
import Booking from "../models/booking_model.mjs";

class BookingController {
  // Lấy danh sách lịch đặt chỗ
static async index(req, res) {
  let q = req.query.q; // Tìm kiếm theo tên hoặc trạng thái
  const re = new RegExp(q, "i"); // Tìm kiếm không phân biệt hoa thường
  let bookings;

  if (q) {
    bookings = await Booking.find({
      $or: [{ customerName: re }, { status: re }],
    });
  } else {
    bookings = await Booking.find({});
  }

  // Truyền `q` vào view để sử dụng trong form
  res.render("index", { title: "Booking Management", bookings, q });
}


  // Hiển thị form tạo mới lịch đặt chỗ
  static async new(req, res) {
    res.render("newBooking", { title: "Create New Booking" });
  }

  // Tạo lịch đặt chỗ mới
  static async create(req, res) {
    let { customerName, date, time } = req.body;

    try {
      // Kiểm tra trùng lịch đặt
      const existingBooking = await Booking.findOne({ date, time });
      if (existingBooking) {
        return res.send("The booking already exists for this date and time.");
      }

      let booking = await Booking.create({
        customerName,
        date,
        time,
      });

      if (booking) {
        res.redirect("/bookings");
      } else {
        res.render("newBooking", { title: "Create New Booking" });
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
      res.status(500).send("Error creating booking.");
    }
  }

  // Hiển thị form chỉnh sửa lịch đặt chỗ
  static async edit(req, res) {
    try {
      // Kiểm tra và chuyển đổi id thành ObjectId nếu cần
      const bookingId = mongoose.Types.ObjectId.isValid(req.params.id)
        ? req.params.id
        : null;

      if (!bookingId) {
        return res.status(400).send("Invalid booking ID");
      }

      let booking = await Booking.findById(bookingId);

      if (!booking) {
        return res.status(404).send("Booking not found");
      }

      res.render("editBooking", { title: "Edit Booking", booking });
    } catch (error) {
      console.error("Error loading booking for edit:", error.message);
      res.status(500).send("Error loading booking.");
    }
  }

  // Cập nhật lịch đặt chỗ
  static async update(req, res) {
    let { customerName, date, time } = req.body;

    try {
      // Kiểm tra và chuyển đổi id thành ObjectId nếu cần
      const bookingId = mongoose.Types.ObjectId.isValid(req.params.id)
        ? req.params.id
        : null;

      if (!bookingId) {
        return res.status(400).send("Invalid booking ID");
      }

      let updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { customerName, date, time },
        { new: true }
      );

      if (updatedBooking) {
        res.redirect("/bookings");
      } else {
        res.render("editBooking", { title: "Edit Booking", booking: updatedBooking });
      }
    } catch (error) {
      console.error("Error updating booking:", error.message);
      res.status(500).send("Error updating booking.");
    }
  }

  // Xóa lịch đặt chỗ
  static async delete(req, res) {
    let id = req.params.id;

    try {
      // Kiểm tra và chuyển đổi id thành ObjectId nếu cần
      const bookingId = mongoose.Types.ObjectId.isValid(id)
        ? id
        : null;

      if (!bookingId) {
        return res.status(400).send("Invalid booking ID");
      }

      let { deletedCount } = await Booking.deleteOne({ _id: bookingId });
      if (deletedCount === 0) {
        console.log("Unable to delete booking!");
      } else {
        console.log("Booking deleted successfully!");
      }

      res.redirect("/bookings");
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      res.status(500).send("Error deleting booking.");
    }
  }

  // Hủy lịch đặt chỗ
  static async cancel(req, res) {
    try {
      // Kiểm tra và chuyển đổi id thành ObjectId nếu cần
      const bookingId = mongoose.Types.ObjectId.isValid(req.params.id)
        ? req.params.id
        : null;

      if (!bookingId) {
        return res.status(400).send("Invalid booking ID");
      }

      let updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: "Cancelled" },
        { new: true }
      );

      if (updatedBooking) {
        console.log("Booking cancelled successfully!");
        res.redirect("/bookings");
      } else {
        res.status(404).send("Booking not found.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error.message);
      res.status(500).send("Error cancelling booking.");
    }
  }
}

export default BookingController;
