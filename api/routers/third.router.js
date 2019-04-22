const express = require('express');
const router = express.Router();
const unirest = require('unirest');

const placeService = require("../services/place.service");

let webcamsPlaces;

router.get('/webcams', (req, res, next) => {
    unirest.get("https://webcamstravel.p.rapidapi.com/webcams/list/limit=1000,0?lang=en&show=webcams%3Aimage%2Clocation")
        .header("X-RapidAPI-Host", "webcamstravel.p.rapidapi.com")
        .header("X-RapidAPI-Key", "931a6b9624msh1b5a16824b87611p16a310jsnff45986f41ab")
        .end(function (result) {
            webcamsPlaces = result.body.result.webcams;
            webcamsPlaces.forEach(webcamsPlace => {
                let place = {
                    webcamsId: webcamsPlace.id,
                    name: webcamsPlace.title,
                    photo: webcamsPlace.image.current.toenail,
                    location: webcamsPlace.location.region,
                    author: '5cbd91d6df61981c04660738',
                }
                placeService.create(place)
            });
            res.json({ webcamsPlaces })
        });
});

module.exports = router;