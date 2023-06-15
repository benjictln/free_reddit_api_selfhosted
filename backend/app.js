const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const cheerio = require('cheerio');
var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/mainPage', async (req, res) => {

    // Make a request to the Reddit website
    const response = await axios.get('https://www.reddit.com/');

    // Load the response HTML into cheerio
    const $ = cheerio.load(response.data);

    const subredditsHTML = $('a[data-click-id="subreddit"]');
    const titlesHTML = $('div[data-adclicklocation="title"] h3')
    const upvoteHTML = $('button[data-click-id="upvote"]')

    const posts = [];

    subredditsHTML.each((index, element) => {
        const subreddit = $(element).attr('href');
        const title = $(titlesHTML[index]).text();
        const vote = $(upvoteHTML[index]).parent().find('div').text().replace("Vote", "");
        posts.push({subreddit, title, vote});
    });

    res.json({posts});
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})








app.get('/crawl', async (req, res) => {
    try {
        // Make a request to the Reddit website
        const response = await axios.get('https://www.reddit.com/');

        // Load the response HTML into cheerio
        const $ = cheerio.load(response.data);


        const subreddits = [];
        $('a[data-click-id="subreddit"]').each((index, element) => {
            const subreddit = $(element).attr('href').replace(/\//g, '');
            subreddits.push(subreddit);
            console.log(subreddit); // outputs: r/AskReddit, r/HelloMister for each iteration
        });
        res.json({subreddits});
        return;
    } catch (error) {
        console.error(error);
    }
});