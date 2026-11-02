/**
 * =========================================================================
 * SUTAIRU FRAMEWORK - ICON TAXONOMY & CLASSIFICATION SYSTEM
 * =========================================================================
 * 
 * Category File        | Description / Typical Use Cases                  | Example Icons
 * ---------------------|--------------------------------------------------|------------------------------------
 
 * actions.js           | CRUD operations, clipboard tasks, state triggers | edit, trash, save, copy, search
 * brands.js            | Social network logos, tech ecosystems, trademarks| github, twitter, discord, figma
 * 
 * ui.js                | General interface primitives, profiles, widgets  | user, cog, home, grid, dashboard
 * navigation.js        | Movement, directions, pagination, controls       | arrow-left, chevron-down, menu
 * communication.js     | Messaging, social interactions, email, broadcast | mail, chat, phone, send, megaphone
 * media.js             | Audio, video playback, photography, streaming    | play, pause, camera, image, mic
 * files.js             | Document management, folders, storage, archives  | file, folder, archive, clipboard
 * commerce.js          | E-commerce, transactions, shopping, finance      | shopping-cart, credit-card, tag, wallet
 * devices.js           | Hardware, electronics, peripherals, viewports    | monitor, smartphone, laptop, server
 * security.js          | Authentication, authorization, privacy, crypto   | lock, key, shield, eye, fingerprint
 * time.js              | Chronological data, scheduling, calendars        | calendar, clock, watch, history
 * development.js       | Software engineering, version control, terminal  | code, terminal, git-branch, database
 * map.js               | Geolocation, navigation pins, travel, building   | map-pin, compass, globe, building
 * 
 * status.js            | Feedback indicators, validation states, alerts   | check, x, info, alert-triangle, loader 
 * weather.js           | Climate indicators, nature, elements             | sun, moon, cloud, fire, droplet 
 * =========================================================================
 */

import { actionIcons } from "./data/actions.js";
import { brandIcons } from "./data/brands.js";
import { navigationIcons } from "./data/navigation.js";
import { statusIcons } from "./data/status.js";
import { uiIcons } from "./data/ui.js";

// Unified dictionary for fast runtime lookups
export const iconRegistry = {
  ...actionIcons,
  ...brandIcons,
  ...navigationIcons,
  ...statusIcons,
  ...uiIcons,
};
