 const express = require("express");
 const mongoose = require("mongoose");
 const router = express.Router();


 const Order = require("../models/orders");

 router.get("/", (req, res, next) => {
     Order.find()
         .exec()
         .then(result => {
             const Obj = {
                 count: result.length,
                 message: "Orders retrieved successfully.",
                 data: result,
             }
             res.status(200).json(Obj)
         })
         .catch(err => {
             res.status(500).json({
                 error: err
             })
         })
 });


 router.post("/", (req, res, next) => {
     const { nameOfItem, unitPrice, totalPrice, quantity } = req.body
     const orders = new Order({
         nameOfItem,
         unitPrice,
         totalPrice,
         quantity
     });
     orders.save()
         .then(result => {
             console.log(result);
             res.status(201).json({
                 message: "Order Created Successfully!!!",
                 data: result,
             });
         })
         .catch(err => {
             console.log(err);
             res.status(500).json({
                 error: err
             });
         })
 });

 router.get("/:ordersId", (req, res, next) => {
     const id = req.params.ordersId;
     Order.findById(id)
         .exec()
         .then(data => {
            if (data) {
            res.status(200).json({
                 message: "Get Single Order",
                 data
           });
          } else {
                res.status(404).json({
                    Message: "The provided ID is not valid..."
                })
             }
         })
         .catch(err => {
             res.status(500).json({
                 error: err
             })
         })

 })

router.patch("/:ordersId", (req, res, next) => {
    const id = req.params.ordersId; // 1
    const updateOps = req.body
    Order.updateOne({ _id: id }, {
            $set:updateOps
        })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "An Order was Updated Successfully!!",
                data: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


 router.delete("/:ordersId", (req, res, next) => {
     const id = req.params.ordersId;
     Order.remove({
             _id: id,
         })
         .exec()
         .then(result => {
             res.status(200).json({
                 message: "One Product Successfully Deleted!!!",
               
             })
         })
         .catch(err => {
             console.log(err)
             res.status(500).json({
                 error: err
             })
         })
 })

 module.exports = router;