import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  RichTextAttribute,
  MediaAttribute,
  FloatAttribute,
  UIDAttribute,
  ComponentSchema,
} from "@strapi/strapi";

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<"admin::permission", "manyToOne", "admin::role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<"admin::user", "manyToMany", "admin::role"> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<"admin::role", "manyToMany", "admin::user">;
    permissions: RelationAttribute<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"">;
    type: EnumerationAttribute<["read-only", "full-access", "custom"]> &
      RequiredAttribute &
      DefaultTo<"read-only">;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      "admin::api-token",
      "oneToMany",
      "admin::api-token-permission"
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: "API Token Permission";
    description: "";
    singularName: "api-token-permission";
    pluralName: "api-token-permissions";
    displayName: "API Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      "admin::api-token-permission",
      "manyToOne",
      "admin::api-token"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<"plugin::upload.file", "morphToMany">;
    folder: RelationAttribute<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >;
    children: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >;
    files: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginAuthExtAuthProvider extends CollectionTypeSchema {
  info: {
    tableName: "auth-provider";
    singularName: "auth-provider";
    pluralName: "auth-providers";
    displayName: "AuthProvider";
    description: "A regular content-type";
    kind: "collectionType";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: true;
    };
    "content-type-builder": {
      visible: true;
    };
  };
  attributes: {
    provider: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    provider_owner: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    username: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    email: EmailAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    enable_as_first_step: BooleanAttribute & DefaultTo<true>;
    enable_as_second_step: BooleanAttribute & DefaultTo<true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::auth-ext.auth-provider",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::auth-ext.auth-provider",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    user: RelationAttribute<
      "plugin::auth-ext.auth-provider",
      "manyToOne",
      "plugin::users-permissions.user"
    >;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: "permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      "plugin::users-permissions.permission",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: "role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.user"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: "user";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      "plugin::users-permissions.user",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    results: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToMany",
      "api::result.result"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    auth_steps_number: IntegerAttribute &
      SetMinMax<{
        min: 1;
      }> &
      DefaultTo<2>;
    auth_providers: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToMany",
      "plugin::auth-ext.auth-provider"
    >;
  };
}

export interface ApiAnalysisResultAnalysisResult extends CollectionTypeSchema {
  info: {
    singularName: "analysis-result";
    pluralName: "analysis-results";
    displayName: "AnalysisResult";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    users_result: RelationAttribute<
      "api::analysis-result.analysis-result",
      "manyToOne",
      "api::result.result"
    >;
    spatial_grid_cell: RelationAttribute<
      "api::analysis-result.analysis-result",
      "manyToOne",
      "api::map.map-spatial-grid-cell"
    >;
    analysis_type: EnumerationAttribute<
      [
        "data",
        "population",
        "survival",
        "classification",
        "migration",
        "vulnerability"
      ]
    >;
    analysis_data: JSONAttribute;
    admin_comment: RichTextAttribute & PrivateAttribute;
    parent_results: RelationAttribute<
      "api::analysis-result.analysis-result",
      "manyToMany",
      "api::analysis-result.analysis-result"
    >;
    children_results: RelationAttribute<
      "api::analysis-result.analysis-result",
      "manyToMany",
      "api::analysis-result.analysis-result"
    >;
    attachments: MediaAttribute;
    species: RelationAttribute<
      "api::analysis-result.analysis-result",
      "oneToOne",
      "api::species.species"
    >;
    spatial_grid: RelationAttribute<
      "api::analysis-result.analysis-result",
      "oneToOne",
      "api::map.map-spatial-grid"
    >;
    bbox_left: FloatAttribute;
    bbox_top: FloatAttribute;
    bbox_right: FloatAttribute;
    bbox_bottom: FloatAttribute;
    polygon: JSONAttribute;
    published: BooleanAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::analysis-result.analysis-result",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::analysis-result.analysis-result",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiResultResult extends CollectionTypeSchema {
  info: {
    singularName: "result";
    pluralName: "results";
    displayName: "UsersResult";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    status: EnumerationAttribute<["processing", "completed", "error"]>;
    uid: UIDAttribute;
    user: RelationAttribute<
      "api::result.result",
      "manyToOne",
      "plugin::users-permissions.user"
    >;
    type: EnumerationAttribute<
      [
        "data",
        "population",
        "survival",
        "maxent",
        "random-forest",
        "migration",
        "vulnerability"
      ]
    >;
    finished_at: DateTimeAttribute;
    logs: RichTextAttribute;
    spatial_grid_cell: RelationAttribute<
      "api::result.result",
      "manyToOne",
      "api::map.map-spatial-grid-cell"
    >;
    analysis_results: RelationAttribute<
      "api::result.result",
      "oneToMany",
      "api::analysis-result.analysis-result"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::result.result",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::result.result",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiSpatialGridSpatialGrid extends CollectionTypeSchema {
  info: {
    singularName: "map-spatial-grid";
    pluralName: "map-spatial-grids";
    displayName: "SpatialGrid";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    bbox_left: FloatAttribute;
    bbox_top: FloatAttribute;
    bbox_right: FloatAttribute;
    bbox_bottom: FloatAttribute;
    polygon: JSONAttribute;
    spatial_grid_cells: RelationAttribute<
      "api::map.map-spatial-grid",
      "oneToMany",
      "api::map.map-spatial-grid-cell"
    >;
    slug: StringAttribute;
    cell_size: FloatAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 5;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::map.map-spatial-grid",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::map.map-spatial-grid",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiSpatialGridCellSpatialGridCell
  extends CollectionTypeSchema {
  info: {
    singularName: "map-spatial-grid-cell";
    pluralName: "map-spatial-grid-cells";
    displayName: "SpatialGridCell";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    spatial_grid: RelationAttribute<
      "api::map.map-spatial-grid-cell",
      "manyToOne",
      "api::map.map-spatial-grid"
    >;
    bbox_left: FloatAttribute;
    bbox_top: FloatAttribute;
    bbox_right: FloatAttribute;
    bbox_bottom: FloatAttribute;
    polygon: JSONAttribute;
    results: RelationAttribute<
      "api::map.map-spatial-grid-cell",
      "oneToMany",
      "api::result.result"
    >;
    analysis_results: RelationAttribute<
      "api::map.map-spatial-grid-cell",
      "oneToMany",
      "api::analysis-result.analysis-result"
    >;
    vulnerability_infos: RelationAttribute<
      "api::map.map-spatial-grid-cell",
      "oneToMany",
      "api::vulnerability-info.vulnerability-info"
    >;
    total_vulnerability: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::map.map-spatial-grid-cell",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::spatial-grid-cell.spatial-grid-cell",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiSpeciesSpecies extends CollectionTypeSchema {
  info: {
    singularName: "species";
    pluralName: "species-many";
    displayName: "Species";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::species.species",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::species.species",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiVulnerabilityInfoVulnerabilityInfo
  extends CollectionTypeSchema {
  info: {
    singularName: "vulnerability-info";
    pluralName: "vulnerability-infos";
    displayName: "vulnerability Info";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    spatial_grid_cell: RelationAttribute<
      "api::vulnerability-info.vulnerability-info",
      "manyToOne",
      "api::spatial-grid-cell.spatial-grid-cell"
    >;
    species: RelationAttribute<
      "api::vulnerability-info.vulnerability-info",
      "oneToOne",
      "api::species.species"
    >;
    type: EnumerationAttribute<["wind"]>;
    analysis_results: RelationAttribute<
      "api::vulnerability-info.vulnerability-info",
      "oneToMany",
      "api::analysis-result.analysis-result"
    >;
    vulnerability: FloatAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::vulnerability-info.vulnerability-info",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::vulnerability-info.vulnerability-info",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface GeometryBbox extends ComponentSchema {
  info: {
    displayName: "bbox";
  };
  attributes: {
    left: FloatAttribute;
    top: FloatAttribute;
    right: FloatAttribute;
    bottom: FloatAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "admin::api-token-permission": AdminApiTokenPermission;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::auth-ext.auth-provider": PluginAuthExtAuthProvider;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "api::analysis-result.analysis-result": ApiAnalysisResultAnalysisResult;
      "api::result.result": ApiResultResult;
      "api::spatial-grid.spatial-grid": ApiSpatialGridSpatialGrid;
      "api::spatial-grid-cell.spatial-grid-cell": ApiSpatialGridCellSpatialGridCell;
      "api::species.species": ApiSpeciesSpecies;
      "api::vulnerability-info.vulnerability-info": ApiVulnerabilityInfoVulnerabilityInfo;
      "geometry.bbox": GeometryBbox;
    }
  }
}
