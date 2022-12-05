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
                 description: "GET All Orders.",
                 data: result,
                 require: {
                     type: "GET",
                     url: "localhost:7000/orders/"

                 }

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
     const orders = new Order({
         nameOfItem: req.body.nameOfItem,
         unitPrice: req.body.unitPrice,
         totalPrice: req.body.totalPrice,
         quantity: req.body.quantity
     });
     orders.save()
         .then(result => {
             console.log(result);
             res.status(201).json({
                 message: "Order Created Successfully!!!",
                 data: result,
                 require: {
                     type: "POST",
                     url: "localhost:7000/orders/"

                 }
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
             //  console.log("From Database", data)
             if (data) {
                 res.status(200).json({
                     description: "Get Single Order",
                     nameOfItem: data.nameOfItem,
                     unitPrice: data.unitPrice,
                     totalPrice: data.totalPrice,
                     quantity: data.quantity,
                     require: {
                         type: "GET",
                         url: "localhost:7000/orders/" + id

                     }
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
     const id = req.params.ordersId;
     const updateOps = {};
     for (const ops of req.body) {
         updateOps[ops.propNameOfItem] = ops.nameOfItem;
         updateOps[ops.propUnitPrice] = ops.unitPrice;
         updateOps[ops.propTotalPrice] = ops.totalPrice;
         updateOps[ops.propQuantity] = ops.quantity;
     }
     Order.updateOne({
             _id: id
         }, {
             $set: updateOps
         })
         .exec()
         .then(result => {
             //  console.log(result);
             res.status(200).json({
                 description: "An Order was Updated Successfully!!",
                 require: {
                     type: "UPDATE",
                     url: "localhost:7000/orders/" + id

                 }
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
                 description: "One Product Successfully Deleted!!!",
                 request: {
                     type: "DELETE",
                     url: "localhost:2000/orders/" + id
                 }
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