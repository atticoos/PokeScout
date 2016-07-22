import Slack from 'node-slack';
import {DistanceTypes} from './utils/distance';
import * as PokemonUtils from './utils/pokemon';

const HOOK_URL = process.env.POKESCOUT_HOOK_URL;
const slack = new Slack(HOOK_URL);

/**
 * Mapping from distance type to attachment color.
 */
const DistanceTypeToAttachmentColor = {
  [DistanceTypes.NEARBY]: 'good',
  [DistanceTypes.FAR]: 'warning'
};

/**
 * Mapping from distance type to attachment title.
 */
const DistanceTypeToAttachmentTitle = {
  [DistanceTypes.NEARBY]: 'Nearby',
  [DistanceTypes.FAR]: 'Farther out'
}

/**
 * Builds message attachments containing groups of nearby pokemon.
 *
 * @param  {Object} groups Pokemon structured into distance groups.
 * @return {Object}        Formatted Slack attachments.
 */
export function buildDistanceGroupsAttachment (groups) {
  return Object.keys(DistanceTypes).reduce((attachments, group) => {
    if (groups[group].length > 0) {
      return attachments.concat({
        color: DistanceTypeToAttachmentColor[group],
        title: DistanceTypeToAttachmentTitle[group],
        text: groups[group].map(PokemonUtils.pokemonToName).join(', ')
      });
    }
    return attachments;
  }, []);
}

export const respond = slack.respond;
export const send = (payload) => slack.send(payload);
