"use strict";

module.exports = ({ strapi }) => {
  strapi.plugins[
    "users-permissions"
  ].contentTypes.user.attributes.auth_steps_number = {
    type: "integer",
    default: Number(process.env.AUTH_EXT_DEFAULT_STEPS || 1),
    min: 1,
    configurable: true,
  };
  strapi.plugins[
    "users-permissions"
  ].contentTypes.user.attributes.auth_providers = {
    type: "relation",
    relation: "oneToMany",
    target: "plugin::auth-ext.auth-provider",
    mappedBy: "user",
    configurable: false,
  };
  strapi.plugins["auth-ext"].contentTypes["auth-provider"].attributes.user = {
    type: "relation",
    relation: "manyToOne",
    target: "plugin::users-permissions.user",
    inversedBy: "auth_providers",
    configurable: false,
  };
  // registeration phase
};
