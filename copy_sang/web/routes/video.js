// index.html을 가져오기 위함
var fs = require('fs');
var path = require('path');

// 라우터를 연결해주기 위함
var express = require('express');
const router = express.Router();

// 홈페이지를 열어준다
router.get('/', function (req, res) {
    console.log(path.join(__dirname, './set_html/video_record.html'));

    fs.readFile(path.join(__dirname, './set_html/video_record.html'), function (error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
})

/* DB에 접근해야 하는 호출들 */
var WeekTime = require('../models/week_time');
var mongoose = require('mongoose');

// 시간 누적 기능
router.post('/add_weekly', (req, res) => {
    if (req.body.my_email === "") {
        return res.status(400).json({
            error: "EMPTY EMAIL",
            code: 2
        });
    }

    if (req.body.current_time === 0) {
        return res.status(400).json({
            error: "EMPTY CURRENT TIME",
            code: 2
        });
    }

    let given_time = req.body.current_time;
    WeekTime.findOne({ "my_email": req.body.my_email }, function (err, weekTime) {
        if (err)
            return res.status(500).json({ error: 'Internal Error' });
        // 존재하지 않는 이메일 - 새로 만들어줘야 한다
        if (weekTime == null) {
            // 새 document를 저장해주기 위해 임시 document 객체를 받는다
            var tmp_weekTime = new WeekTime({
                my_email: req.body.my_email,
                my_today_time: req.body.current_time,
                my_week_time: req.body.current_time
            });
            // 저장해준다
            tmp_weekTime.save(err => {
                if (err) throw err;
                return res.json({ success: true });
            });
        }
        else {
            WeekTime.updateMany({ "my_email": req.body.my_email }, { $inc: { "my_today_time": given_time, "my_week_time": given_time } }, function (err, time) {
                if (err) {
                    return res.json("can't update time");
                }
                else {
                    return res.json("time updated");
                }
            });
        }
    });
});

module.exports = router;