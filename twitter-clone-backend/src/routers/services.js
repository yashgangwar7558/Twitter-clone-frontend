const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const Tweets = require('../models/tweets');
const Following = require('../models/following');
const authenticate = require('../middleware/authenticate');

router.post('/register', async (req, res) => {

    const { displayName, userHandle, email, number, profilePic, password } = req.body;

    if (!displayName || !userHandle || !email || !password || !number) {
        return res.status(422).json({ error: 'Plz fill all the fields correctly' })
    }

    try {
        const userExist = await Users.findOne({ user_handle: userHandle })

        console.log(userExist);

        if (userExist) {
            return res.status(422).json({ error: 'Username already exists, provide unique username or login' })
        } else {
            const user = new Users({
                display_name: displayName,
                user_handle: userHandle,
                email: email,
                number: number,
                profile_pic: profilePic,
                password: password,
            })

            await user.save();

            token = await user.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
                sameSite: 'None',
                path: '/',
            });

            res.status(201).json({ message: "user registered successfully", token })
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/signin', async (req, res) => {
    try {
        let token;
        const userHandle = req.body.userHandle;
        const password = req.body.password;

        if (!userHandle || !password) {
            return res.status(400).json({ error: 'Plz fill the data properly' })
        }

        const userLogin = await Users.findOne({ user_handle: userHandle })

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)

            token = await userLogin.generateAuthToken();

            res.cookie('jwtoken', token, {
                httpOnly: true,
                sameSite: 'none', 
                secure: true, 
                domain: '.netlify.app', 
            });

            if (!isMatch) {
                res.status(400).json({ error: 'Invalid Credentials' })
            } else {
                res.status(201).json({ message: 'user Signin successful', token })
            }
        } else {
            res.status(400).json({ error: 'Invalid Credentials!' })
        }

    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/home', authenticate, async (req, res) => {
    res.send(req.rootUser)
})

router.post('/postweet', async (req, res) => {
    try {
        const { uuid, userHandle, tweet, profilePic, userName } = req.body;
        const addTweet = new Tweets({
            user_uuid: uuid,
            name: userName,
            user: userHandle,
            pic: profilePic,
            tweet: tweet
        })
        await addTweet.save();
        res.status(201).json({ message: "Tweet posted successfully" })
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/getweets', authenticate, async (req, res) => {
    try {
        const data = await Tweets.find()
        const reversedData = data.slice().reverse();
        res.status(201).send(reversedData)
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/getusers', authenticate, async (req, res) => {
    try {
        const data = await Users.find()
        const reversedData = data.slice().reverse();
        res.status(201).send(reversedData)
    } catch (err) {
        res.status(400).send(err);
    }
})

router.get('/getuser', authenticate, async (req, res) => {
    res.send(req.rootUser)
})

router.get('/getweets/:handle', authenticate, async (req, res) => {
    try {
        const userHandle = req.params.handle;
        const data = await Tweets.find({ user: userHandle })
        const reversedData = data.slice().reverse();
        res.status(201).send(reversedData)
    } catch (err) {
        res.status(400).send(err);
    }
})

router.patch('/editweet/:tweetid', async (req, res) => {
    try {
        const tweetid = req.params.tweetid;
        const { uuid, userHandle, tweet, profilePic, userName } = req.body;
        const updateFields = new Tweets({
            user_uuid: uuid,
            name: userName,
            user: userHandle,
            pic: profilePic,
            tweet: tweet
        })

        const updatedTweet = await Tweets.findByIdAndUpdate(tweetid, updateFields, { new: true });

        if (!updatedTweet) {
            return res.status(404).json({ message: "Tweet not found" });
        }
        res.status(200).json({ message: "Tweet updated successfully", updatedTweet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete('/delete/:tweetid', async (req, res) => {
    try {
        const tweetid = req.params.tweetid
        const deletedTweet = await Tweets.findByIdAndDelete(tweetid);
        if (!deletedTweet) {
            return res.status(404).json({ message: "Tweet not found" });
        }
        res.status(200).json({ message: "Tweet deleted successfully", deletedTweet });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post('/follow', async (req, res) => {
    try {
        const { followed_by_id, followed_id, followed_name, followed_handle, followed_pic } = req.body;
        const addFollow = new Following({
            followed_by_id,
            followed_id,
            followed_name,
            followed_handle,
            followed_pic
        })
        await addFollow.save();

        const data = await Following.find({ followed_by_id: followed_by_id });
        console.log(data);
        res.status(200).send(data);

    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/unfollow/:id', async (req, res) => {
    try {
        const followed_id = req.params.id
        const deletedFollowing = await Following.findOneAndDelete(followed_id);
        if (!deletedFollowing) {
            return res.status(404).json({ message: "Followed User not found" });
        }
        res.status(200).json({ message: "Following deleted successfully", deletedFollowing });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;