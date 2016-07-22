import express from 'express';
import bodyParser from 'body-parser';
import * as API from './scanner';
import * as Slack from './slack';
import * as PokemonUtils from './utils/pokemon';

export function buildServer ({latitude, longitude}) {
  const app = express();

  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.post('/hooks', (req, res) => {
    Slack.send({
      channel: `#${req.body.channel_name}`,
      username: req.body.user_name,
      text: req.body.command
    });

    API.getAllPokemonByLatLng(latitude, longitude)
      .then(pokemon => PokemonUtils.withDistance(pokemon, latitude, longitude))
      .then(pokemon => PokemonUtils.closestUniquePokemon(pokemon))
      .then(pokemon => PokemonUtils.toDistanceGroups(pokemon))
      .then(groups => Slack.buildDistanceGroupsAttachment(groups))
      .then(attachments => {
        var text = ':oak: There doesn\'t appear to be any Pokemon nearby!';
        if (attachments.length > 0) {
          text = ':oak: I\'ve spotted a few nearby Pokemon!';
        }
        Slack.send({
          text,
          attachments,
          channel: `#${req.body.channel_name}`
        });
      })
      .catch(console.warn);
      res.send();
  });

  return app;

  return app.listen(4888, () => {
    console.log('server listening');
  })
}
