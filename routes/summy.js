const summary = require("../models/summary");
const { verifyTokenAuthazrization } = require("./verifyToken");
const { v1: uuidv1 } = require('uuid');
const { spawn } = require('child_process');
const fs = require('fs');

const router = require("express").Router();
//Testmodule
router.post("/test", (req, res) => {
    res.send("working")
})
//SummaryintoDB
router.post("/", verifyTokenAuthazrization, async (req, res) => {
    // console.log(req.user);
    const newsummy = new summary(
        {
            title: req.body.title,
            // summary: req.body.summary,
            user: req.user.id,
        }
    );
    try {
        if (req.body.summary == "" || req.body.title == "") {
            res.status(500).json("Title and text are mandatory!");
        }
        else {
            // console.log('title:', req.body.title);
            // console.log('summary:', req.body.summary);
            const texttofile = req.body.summary
            const filename = uuidv1() + "." + "txt"
            const paths = './python/texttmp/' + filename
            console.log(paths);
            fs.appendFile(paths, texttofile, function (err) {
                if (err) throw err;
                console.log('Saved!', err);
            });
            const child = spawn(process.env.PYTHON_BINARY || 'python', ['./python/summy.py', paths]);
            child.stdout.on('data', async (data) => {
                extracted = data.toString();
                // console.log('safe',filename, extracted)
                myextracted = JSON.parse(extracted).data
                newsummy.summary = myextracted;
                if (fs.existsSync(paths)) {
                    fs.unlink(paths, function (err) {
                        if (err) throw err;
                        // res.status(200).send("DELETED")
                    });
                }
                const savedSummy = await newsummy.save()
                res.status(200).send(savedSummy)
            });
            // res.status(201).json( extracted);
        }
    } catch (error) {
        res.status(500).json(error.message || "Somethinge Went wrong");
    }
});

//update summary
router.put("/update/:id", verifyTokenAuthazrization, async (req, res) => {
    try {
        if (req.body.summary == "" || req.body.title == "") {
            res.status(500).json("Title and text are mandatory!");
        }
        else {
            const updatedSummary = await summary.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.id,
                },
                {
                    $set: {
                        title: req.body.title,
                        summary: req.body.summary
                    }
                },
                {
                    new: true,
                }
            );
            res.status(200).json(updatedSummary);
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/delete/:id", verifyTokenAuthazrization, async (req, res) => {
    try {
        const deletes = await summary.findOneAndDelete(
            {
                _id: req.params.id,
                user: req.user.id,
            }
        );
        res.status(200).json(deletes);

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router