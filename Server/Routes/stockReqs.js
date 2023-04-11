const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const StockReq = mongoose.model("stockreq");
const StockReqFarmer = mongoose.model("stockreqfarmer")
const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");
const sendSMS = require('../twilio');
const sendSMSFarmer = require('../twilio1');
const sendSMSCustomer = require('../twilio2');

router.post("/stockreq", (req, res) => {
    const {
        productId,
        productName,
        productPrice,
        productQuantity,
        productState,
        postedBy,
        UserId,
        firstName,
        email,
        phone
      } = req.body;
      if (
        !productId||
        !productName ||
        !productPrice ||
        !productState||
        !postedBy||
        !UserId||
        !firstName||
        !email||
        !phone
      ) {
        return res.status(422).json({ error: "Please add all the details" });
      }
    
      const stockreq = new StockReq({
        productId,
        productName,
        productPrice,
        productQuantity,
        productState,
        postedBy,
        UserId,
        firstName,
        email,
        phone
      });
      stockreq
        .save()
        .then((result) => {
          res.json({ stockreq: result });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    router.get("/allreqs", requireLogin, (req, res) => {
      StockReq.find()
        .populate("postedBy", "_id firstName phone email")
        .then((requests) => {
          res.json({ requests });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    
    router.post("/stockfarmer", (req, res) => {
      const {
          productId,
          productName,
          productPrice,
          productQuantity,
          productState,
          postedBy,
          UserId,
          firstName,
          email,
          phone
        } = req.body;
        if (
          !productId||
          !productName ||
          !productPrice ||
          !productState||
          !postedBy||
          !UserId||
          !firstName||
          !email||
          !phone
        ) {
          return res.status(422).json({ error: "Please add all the details" });
        }
      
        const stockrequestfarmer = new StockReqFarmer({
          productId,
          productName,
          productPrice,
          productQuantity,
          productState,
          postedBy,
          UserId,
          firstName,
          email,
          phone
        });
        stockrequestfarmer
          .save()
          .then((result) => {
            res.json({ stockreq: result });
          })
          .catch((err) => {
            console.log(err);
          });
      });

      router.get("/adminreqs/:id", (req, res) => {
        const { id } = req.params;
        StockReqFarmer.find({postedBy:id})
          .then((farmrrequests) => {
            res.json({ farmrrequests });
          })
          .catch((err) => {
            console.log(err);
          });
      });
     
      router.post('/send-sms',async (req, res) => {
        const { to,message } = req.body;
        sendSMS(to,message);
        res.send('SMS sent!');
      });
      router.post('/send-sms-farmer',async (req, res) => {
        const { to,message } = req.body;
        sendSMSFarmer(to,message);
        res.send('SMS sent!');
      });
      // router.post('/sendRegnsms',async (req, res) => {
      //   const { to,message } = req.body;
      //   sendSMSCustomer(to,message);
      //   res.send('SMS sent!');
      // });
    
module.exports = router;
