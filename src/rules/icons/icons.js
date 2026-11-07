/**
 * =========================================================================
 * SUTAIRU FRAMEWORK - ICON TAXONOMY & CLASSIFICATION SYSTEM
 * =========================================================================
 * 
 * Category File        | Description / Typical Use Cases                  | Example Icons
 * ---------------------|--------------------------------------------------|------------------------------------
 * actions.js           | CRUD operations, clipboard tasks, state triggers | edit, trash, save, copy, search
 * agriculture.js       | Farming, gardening, plants, ecology, nature      | seedling, leaf, plant, tractor
 * animals.js           | Fauna, pets, wildlife, insects, veterinary       | dog, cat, bug, fish
 * brands.js            | Social network logos, tech ecosystems, trademarks| github, twitter, discord, figma
 * commerce.js          | E-commerce, transactions, shopping, finance      | shopping-cart, credit-card, tag, wallet
 * communication.js     | Messaging, social interactions, email, broadcast | mail, chat, phone, send, megaphone
 * construction.js      | Building, architecture, tools, hardware, DIY     | hammer, wrench, screwdriver, hard-hat
 * design.js            | Vector editing, layers, brushes, typography      | pen-tool, crop, layers
 * development.js       | Software engineering, version control, terminal  | code, terminal, git-branch, database
 * devices.js           | Hardware, electronics, peripherals, viewports    | monitor, smartphone, laptop, server
 * education.js         | Learning, academic, science, math, laboratory    | book, atom, flask, calculator
 * files.js             | Document management, folders, storage, archives  | file, folder, archive, clipboard
 * food.js              | Culinary, beverages, restaurant, kitchen utensils| utensils, coffee, apple, pizza
 * games.js             | Gaming, entertainment, toys, party celebration   | dice, trophy, gift, party-popper, gamepad
 * health.js            | Medical care, healthcare, wellness, fitness      | syringe, pill, stethoscope, heart-pulse
 * legal.js             | Law, justice, scales, contracts, governance      | scale, gavel, certificate, courthouse
 * map.js               | Geolocation, navigation pins, travel, places     | map-pin, compass, globe, building
 * media.js             | Audio, video playback, photography, music        | play, pause, camera, music, mic
 * navigation.js        | Movement, directions, pagination, controls       | arrow-left, chevron-down, menu
 * religion.js          | Faith, places of worship, spiritual, culture     | cross, crescent, om, church
 * security.js          | Authentication, authorization, privacy, crypto   | lock, key, shield, eye, fingerprint
 * status.js            | Feedback indicators, validation states, alerts   | check, x, info, alert-triangle, loader
 * time.js              | Chronological data, scheduling, calendars, weather| calendar, clock, sun, moon, cloud
 * ui.js                | General interface primitives, profiles, widgets  | user, cog, home, grid
 * =========================================================================
 */

import { actionsIcons } from "./data/actions.js";
import { agricultureIcons } from "./data/agriculture.js";
import { animalsIcons } from "./data/animals.js";
import { brandsIcons } from "./data/brands.js";
import { commerceIcons } from "./data/commerce.js";
import { communicationIcons } from "./data/communication.js";
import { constructionIcons } from "./data/construction.js";
import { designIcons } from "./data/design.js";
import { developmentIcons } from "./data/development.js";
import { devicesIcons } from "./data/devices.js";
import { educationIcons } from "./data/education.js";
import { filesIcons } from "./data/files.js";
import { foodIcons } from "./data/food.js";
import { gamesIcons } from "./data/games.js";
import { healthIcons } from "./data/health.js";
import { legalIcons } from "./data/legal.js";
import { mapIcons } from "./data/map.js";
import { mediaIcons } from "./data/media.js";
import { navigationIcons } from "./data/navigation.js";
import { religionIcons } from "./data/religion.js";
import { securityIcons } from "./data/security.js";
import { statusIcons } from "./data/status.js";
import { timeIcons } from "./data/time.js";
import { uiIcons } from "./data/ui.js";

// Unified dictionary for fast runtime lookups
export const iconRegistry = {
  ...actionsIcons,
  ...agricultureIcons,
  ...animalsIcons,
  ...brandsIcons,
  ...commerceIcons,
  ...communicationIcons,
  ...constructionIcons,
  ...designIcons,
  ...developmentIcons,
  ...devicesIcons,
  ...educationIcons,
  ...filesIcons,
  ...foodIcons,
  ...gamesIcons,
  ...healthIcons,
  ...legalIcons,
  ...mapIcons,
  ...mediaIcons,
  ...navigationIcons,
  ...religionIcons,
  ...securityIcons,
  ...statusIcons,
  ...timeIcons,
  ...uiIcons,
};
const iconsData = iconRegistry;
export default iconsData;