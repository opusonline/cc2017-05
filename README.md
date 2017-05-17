# Craft-IT Coding (Beer) Challenge

Welcome to our Front End Development Challenge!

The aim of this challenge is to create a nice single page application and find
the right beer for your current mood :D

_Weekend, May 19 to May 21 2017_

__Receive €150 for a weekend of programming!__

_All_ the best selected submissions receive the money.

## Rules
The following is a requirement:

* When finished, publish your work somewhere on github
* Do it __on your own__ - this is not a group task
* and submit it __not later than May 21 2017, 23:59:59__ and notify stefan@craft-it.co or add `opusonline` to your github (`stefanbenicke` on bitbucket)!
* When your code is selected as one of the winners, you have to come in and prove it during a code review
* Be (at least) open to a fulltime/parttime position in our team __and take part in an interview__. You receive the bounty no matter if you are really becoming a team-member or not.
* By participating you accept that sending out invitations on submissions is at Craft-IT's solely discretion. No submissions will be accepted later than Sunday, May 21 2017, 23:59:59 CET!

## Workflow
Use the API of [BreweryDB](http://www.brewerydb.com/developers/docs) to get a
list of all beer styles.

Let the user select one to multiple styles and additionally choose
[ABV](https://en.wikipedia.org/wiki/Alcohol_by_volume) (min, max, no limit) and
[IBU](https://en.wikipedia.org/wiki/Beer_measurement#Bitterness) (min, max, no limit) to
present a condensed collection of appropriate beers.

The design is completely up to you. There are no restrictions for which framework to use
or how it should look like. But please note that this challenge is used to evaluate
your programming skills, so don't make it too easy for you.

We are looking into your code the following week/weeks and get back to you as soon as possible.
We are all just humans here, so please add any documentation/instruction in a way that we understand it.

## Bonus Features
- add a filter for list of styles (e.g. "Wit" hides all except "Witbier")
- selecting a beer from the collection opens a popup with more detailed information
- add filter by brewery
- sort by Name/ABV/IBU/whatever
- take care of responsiveness

## BreweryDB API
[Register at BreweryDB.com](https://www.brewerydb.com/auth/signup) and create your API key.
The API is free with up to 400 requests per day, so be wise and cache where possible!

Since BreweryDB API requests do not support CORS including "Access-Control-Allow-Origin"
header and others, we created a simple node application that maps
[brewerydb-node](https://github.com/ronandi/brewerydb-node) calls to a local server application (endpoint `/beer`).

Enter the API Key to `config.json: "brewerydb_api_key"`.

To use the local server, type once `npm install`, then for every usage `npm start` and visit `localhost:9696` in your browser.

If you prefer another way to fetch data from BreweryDB API you can do so, but you can also use
the provided application. You are even free to adjust or extend this server application like you wish.

Considering the limitation of requests per day, the provided wrapper has a built-in cache as JSON files.
Use `npm run cleanup` to remove all the stored cache files.

### API for Styles
[BreweryDB API](http://www.brewerydb.com/developers/docs-endpoint/style_index) should look like

```
/styles?key=<key>
```

Using the provided wrapper:

```
/beer/styles
```

Both are returning the same object with `data` as an array of styles.

### API for beers
[BreweryDB API](http://www.brewerydb.com/developers/docs-endpoint/beer_index) should look like

```
/beers?styleId=<styleId>&p=<page>&withBreweries=Y&key=<key>
```

Using the provided wrapper:

```
/beer/style/<styleId>
/beer/style/<styleId>/page/<page>
```


Both are returning an object with `data` as an array of beers.

*Notice a difference:*

- `numberOfPages` (BreweryDB API) is called `numPages` (Wrapper)
- `currentPage` (BreweryDB API) is called `page` (Wrapper)

Keep in mind that not every entry has all parameters! For example, some beers have
a `labels` entry for icons. Some beers are missing the fields `abv` and/or `ibu`,
which has to be reflected when the user selects an according filter!

There are at maximum 50 beers per request and that's why there *can* be multiple pages.
To keep the amount of requests low, you *only need to load the first 3 pages* if there are more than 1!

## About us
[Craft IT](http://www.craft-it.co/) is a small boutique web development company
located in Graz, Austria. We are passionate full-stack developers and serve
international clients, with a focus on financial and analytics applications. We
do work with a number of APIs from e.g. cloud accounting providers. We mostly do
very custom tailored software which (more often than not) exceeds the possibilities
of existing frameworks and libraries.

We are looking for new team-members who love hands-on, enjoy great teams, long
term projects, a fun work-environment, tabletennis and coffee (not a must, we also have tee).

If you are looking for a job, this is the kind of work you can expect with us.
If you want to join us, here's your chance (or send us your CV)!
