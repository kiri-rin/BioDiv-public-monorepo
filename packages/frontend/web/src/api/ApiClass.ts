import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Types from "./types/types";
export class Api {
  axiosInstance: AxiosInstance;
  authExt = {
    putAuthExtProvidersStep: (
      step: string,
      data: Types["authExt"]["putAuthExtProvidersStep"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["authExt"]["putAuthExtProvidersStep"]["output"]>
      >(`/auth-ext/providers/${step}`, data, options),

    getAuthExtProvidersSteps: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["authExt"]["getAuthExtProvidersSteps"]["output"]>
      >(`/auth-ext/providers-steps`, options),

    getAuthExtProvidersStep: (step: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["authExt"]["getAuthExtProvidersStep"]["output"]>
      >(`/auth-ext/providers/${step}`, options),

    postAuthExtAddProvidersStep: (
      data: Types["authExt"]["postAuthExtAddProvidersStep"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["authExt"]["postAuthExtAddProvidersStep"]["output"]>
      >(`/auth-ext/add-providers-step`, data, options),

    postAuthExtRemoveProvidersStep: (
      data: Types["authExt"]["postAuthExtRemoveProvidersStep"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["authExt"]["postAuthExtRemoveProvidersStep"]["output"]
        >
      >(`/auth-ext/remove-providers-step`, data, options),

    postApiAuthExtAuthProviderAuthStepStep: (
      provider: string,
      step: string,
      data: Types["authExt"]["postApiAuthExtAuthProviderAuthStepStep"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["authExt"]["postApiAuthExtAuthProviderAuthStepStep"]["output"]
        >
      >(`/api/auth-ext/auth/${provider}/auth-step/${step}`, data, options),

    postApiAuthExtAuthProviderReset: (
      provider: string,
      data: Types["authExt"]["postApiAuthExtAuthProviderReset"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["authExt"]["postApiAuthExtAuthProviderReset"]["output"]
        >
      >(`/api/auth-ext/auth/${provider}/reset`, data, options),
  };

  contentTypeBuilder = {
    getApiContentTypeBuilderContentTypes: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getApiContentTypeBuilderContentTypes"]["output"]
        >
      >(`/api/content-type-builder/content-types`, options),

    getApiContentTypeBuilderContentTypesUid: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getApiContentTypeBuilderContentTypesUid"]["output"]
        >
      >(`/api/content-type-builder/content-types/${uid}`, options),

    getApiContentTypeBuilderComponents: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getApiContentTypeBuilderComponents"]["output"]
        >
      >(`/api/content-type-builder/components`, options),

    getApiContentTypeBuilderComponentsUid: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getApiContentTypeBuilderComponentsUid"]["output"]
        >
      >(`/api/content-type-builder/components/${uid}`, options),

    getContentTypeBuilderReservedNames: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getContentTypeBuilderReservedNames"]["output"]
        >
      >(`/content-type-builder/reserved-names`, options),

    getContentTypeBuilderContentTypes: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getContentTypeBuilderContentTypes"]["output"]
        >
      >(`/content-type-builder/content-types`, options),

    getContentTypeBuilderContentTypesUid: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getContentTypeBuilderContentTypesUid"]["output"]
        >
      >(`/content-type-builder/content-types/${uid}`, options),

    postContentTypeBuilderContentTypes: (
      data: Types["contentTypeBuilder"]["postContentTypeBuilderContentTypes"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["postContentTypeBuilderContentTypes"]["output"]
        >
      >(`/content-type-builder/content-types`, data, options),

    putContentTypeBuilderContentTypesUid: (
      uid: string,
      data: Types["contentTypeBuilder"]["putContentTypeBuilderContentTypesUid"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["putContentTypeBuilderContentTypesUid"]["output"]
        >
      >(`/content-type-builder/content-types/${uid}`, data, options),

    deleteContentTypeBuilderContentTypesUid: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["deleteContentTypeBuilderContentTypesUid"]["output"]
        >
      >(`/content-type-builder/content-types/${uid}`, options),

    getContentTypeBuilderComponents: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getContentTypeBuilderComponents"]["output"]
        >
      >(`/content-type-builder/components`, options),

    getContentTypeBuilderComponentsUid: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["getContentTypeBuilderComponentsUid"]["output"]
        >
      >(`/content-type-builder/components/${uid}`, options),

    postContentTypeBuilderComponents: (
      data: Types["contentTypeBuilder"]["postContentTypeBuilderComponents"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["postContentTypeBuilderComponents"]["output"]
        >
      >(`/content-type-builder/components`, data, options),

    putContentTypeBuilderComponentsUid: (
      uid: string,
      data: Types["contentTypeBuilder"]["putContentTypeBuilderComponentsUid"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["putContentTypeBuilderComponentsUid"]["output"]
        >
      >(`/content-type-builder/components/${uid}`, data, options),

    deleteContentTypeBuilderComponentsUid: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["deleteContentTypeBuilderComponentsUid"]["output"]
        >
      >(`/content-type-builder/components/${uid}`, options),

    putContentTypeBuilderComponentCategoriesName: (
      name: string,
      data: Types["contentTypeBuilder"]["putContentTypeBuilderComponentCategoriesName"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["putContentTypeBuilderComponentCategoriesName"]["output"]
        >
      >(`/content-type-builder/component-categories/${name}`, data, options),

    deleteContentTypeBuilderComponentCategoriesName: (
      name: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["contentTypeBuilder"]["deleteContentTypeBuilderComponentCategoriesName"]["output"]
        >
      >(`/content-type-builder/component-categories/${name}`, options),
  };

  email = {
    postEmail: (
      data: Types["email"]["postEmail"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["email"]["postEmail"]["output"]>
      >(`/email/`, data, options),

    postEmailTest: (
      data: Types["email"]["postEmailTest"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["email"]["postEmailTest"]["output"]>
      >(`/email/test`, data, options),

    getEmailSettings: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["email"]["getEmailSettings"]["output"]>
      >(`/email/settings`, options),

    postApiEmail: (
      data: Types["email"]["postApiEmail"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["email"]["postApiEmail"]["output"]>
      >(`/api/email/`, data, options),
  };

  i18N = {
    getI18NIsoLocales: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["i18N"]["getI18NIsoLocales"]["output"]>
      >(`/i18n/iso-locales`, options),

    getI18NLocales: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["i18N"]["getI18NLocales"]["output"]>
      >(`/i18n/locales`, options),

    postI18NLocales: (
      data: Types["i18N"]["postI18NLocales"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["i18N"]["postI18NLocales"]["output"]>
      >(`/i18n/locales`, data, options),

    putI18NLocalesId: (
      id: string,
      data: Types["i18N"]["putI18NLocalesId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["i18N"]["putI18NLocalesId"]["output"]>
      >(`/i18n/locales/${id}`, data, options),

    deleteI18NLocalesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["i18N"]["deleteI18NLocalesId"]["output"]>
      >(`/i18n/locales/${id}`, options),

    postI18NContentManagerActionsGetNonLocalizedFields: (
      data: Types["i18N"]["postI18NContentManagerActionsGetNonLocalizedFields"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["i18N"]["postI18NContentManagerActionsGetNonLocalizedFields"]["output"]
        >
      >(
        `/i18n/content-manager/actions/get-non-localized-fields`,
        data,
        options
      ),

    getApiI18NLocales: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["i18N"]["getApiI18NLocales"]["output"]>
      >(`/api/i18n/locales`, options),
  };

  upload = {
    postApiUpload: (
      data: Types["upload"]["postApiUpload"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["upload"]["postApiUpload"]["output"]>
      >(`/api/upload/`, data, options),

    getApiUploadFiles: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getApiUploadFiles"]["output"]>
      >(`/api/upload/files`, options),

    getApiUploadFilesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getApiUploadFilesId"]["output"]>
      >(`/api/upload/files/${id}`, options),

    deleteApiUploadFilesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["upload"]["deleteApiUploadFilesId"]["output"]>
      >(`/api/upload/files/${id}`, options),

    getUploadSettings: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getUploadSettings"]["output"]>
      >(`/upload/settings`, options),

    putUploadSettings: (
      data: Types["upload"]["putUploadSettings"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["upload"]["putUploadSettings"]["output"]>
      >(`/upload/settings`, data, options),

    postUpload: (
      data: Types["upload"]["postUpload"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["upload"]["postUpload"]["output"]>
      >(`/upload/`, data, options),

    getUploadFiles: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getUploadFiles"]["output"]>
      >(`/upload/files`, options),

    getUploadFilesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getUploadFilesId"]["output"]>
      >(`/upload/files/${id}`, options),

    deleteUploadFilesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["upload"]["deleteUploadFilesId"]["output"]>
      >(`/upload/files/${id}`, options),

    getUploadFoldersId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getUploadFoldersId"]["output"]>
      >(`/upload/folders/${id}`, options),

    getUploadFolders: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getUploadFolders"]["output"]>
      >(`/upload/folders`, options),

    postUploadFolders: (
      data: Types["upload"]["postUploadFolders"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["upload"]["postUploadFolders"]["output"]>
      >(`/upload/folders`, data, options),

    putUploadFoldersId: (
      id: string,
      data: Types["upload"]["putUploadFoldersId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["upload"]["putUploadFoldersId"]["output"]>
      >(`/upload/folders/${id}`, data, options),

    getUploadFolderStructure: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getUploadFolderStructure"]["output"]>
      >(`/upload/folder-structure`, options),

    postUploadActionsBulkDelete: (
      data: Types["upload"]["postUploadActionsBulkDelete"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["upload"]["postUploadActionsBulkDelete"]["output"]>
      >(`/upload/actions/bulk-delete`, data, options),

    postUploadActionsBulkMove: (
      data: Types["upload"]["postUploadActionsBulkMove"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["upload"]["postUploadActionsBulkMove"]["output"]>
      >(`/upload/actions/bulk-move`, data, options),

    getUploadConfiguration: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["upload"]["getUploadConfiguration"]["output"]>
      >(`/upload/configuration`, options),

    putUploadConfiguration: (
      data: Types["upload"]["putUploadConfiguration"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["upload"]["putUploadConfiguration"]["output"]>
      >(`/upload/configuration`, data, options),
  };

  contentManager = {
    getContentManagerContentTypes: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerContentTypes"]["output"]
        >
      >(`/content-manager/content-types`, options),

    getContentManagerContentTypesSettings: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerContentTypesSettings"]["output"]
        >
      >(`/content-manager/content-types-settings`, options),

    getContentManagerContentTypesUidConfiguration: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerContentTypesUidConfiguration"]["output"]
        >
      >(`/content-manager/content-types/${uid}/configuration`, options),

    putContentManagerContentTypesUidConfiguration: (
      uid: string,
      data: Types["contentManager"]["putContentManagerContentTypesUidConfiguration"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["contentManager"]["putContentManagerContentTypesUidConfiguration"]["output"]
        >
      >(`/content-manager/content-types/${uid}/configuration`, data, options),

    getContentManagerComponents: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerComponents"]["output"]
        >
      >(`/content-manager/components`, options),

    getContentManagerComponentsUidConfiguration: (
      uid: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerComponentsUidConfiguration"]["output"]
        >
      >(`/content-manager/components/${uid}/configuration`, options),

    putContentManagerComponentsUidConfiguration: (
      uid: string,
      data: Types["contentManager"]["putContentManagerComponentsUidConfiguration"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["contentManager"]["putContentManagerComponentsUidConfiguration"]["output"]
        >
      >(`/content-manager/components/${uid}/configuration`, data, options),

    postContentManagerUidGenerate: (
      data: Types["contentManager"]["postContentManagerUidGenerate"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerUidGenerate"]["output"]
        >
      >(`/content-manager/uid/generate`, data, options),

    postContentManagerUidCheckAvailability: (
      data: Types["contentManager"]["postContentManagerUidCheckAvailability"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerUidCheckAvailability"]["output"]
        >
      >(`/content-manager/uid/check-availability`, data, options),

    getContentManagerRelationsModelTargetField: (
      model: string,
      targetField: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerRelationsModelTargetField"]["output"]
        >
      >(`/content-manager/relations/${model}/${targetField}`, options),

    getContentManagerRelationsModelIdTargetField: (
      model: string,
      id: string,
      targetField: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerRelationsModelIdTargetField"]["output"]
        >
      >(`/content-manager/relations/${model}/${id}/${targetField}`, options),

    getContentManagerSingleTypesModel: (
      model: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerSingleTypesModel"]["output"]
        >
      >(`/content-manager/single-types/${model}`, options),

    putContentManagerSingleTypesModel: (
      model: string,
      data: Types["contentManager"]["putContentManagerSingleTypesModel"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["contentManager"]["putContentManagerSingleTypesModel"]["output"]
        >
      >(`/content-manager/single-types/${model}`, data, options),

    deleteContentManagerSingleTypesModel: (
      model: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["contentManager"]["deleteContentManagerSingleTypesModel"]["output"]
        >
      >(`/content-manager/single-types/${model}`, options),

    postContentManagerSingleTypesModelActionsPublish: (
      model: string,
      data: Types["contentManager"]["postContentManagerSingleTypesModelActionsPublish"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerSingleTypesModelActionsPublish"]["output"]
        >
      >(
        `/content-manager/single-types/${model}/actions/publish`,
        data,
        options
      ),

    postContentManagerSingleTypesModelActionsUnpublish: (
      model: string,
      data: Types["contentManager"]["postContentManagerSingleTypesModelActionsUnpublish"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerSingleTypesModelActionsUnpublish"]["output"]
        >
      >(
        `/content-manager/single-types/${model}/actions/unpublish`,
        data,
        options
      ),

    getContentManagerSingleTypesModelActionsNumberOfDraftRelations: (
      model: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerSingleTypesModelActionsNumberOfDraftRelations"]["output"]
        >
      >(
        `/content-manager/single-types/${model}/actions/numberOfDraftRelations`,
        options
      ),

    getContentManagerCollectionTypesModel: (
      model: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerCollectionTypesModel"]["output"]
        >
      >(`/content-manager/collection-types/${model}`, options),

    postContentManagerCollectionTypesModel: (
      model: string,
      data: Types["contentManager"]["postContentManagerCollectionTypesModel"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerCollectionTypesModel"]["output"]
        >
      >(`/content-manager/collection-types/${model}`, data, options),

    getContentManagerCollectionTypesModelId: (
      model: string,
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerCollectionTypesModelId"]["output"]
        >
      >(`/content-manager/collection-types/${model}/${id}`, options),

    putContentManagerCollectionTypesModelId: (
      model: string,
      id: string,
      data: Types["contentManager"]["putContentManagerCollectionTypesModelId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["contentManager"]["putContentManagerCollectionTypesModelId"]["output"]
        >
      >(`/content-manager/collection-types/${model}/${id}`, data, options),

    deleteContentManagerCollectionTypesModelId: (
      model: string,
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["contentManager"]["deleteContentManagerCollectionTypesModelId"]["output"]
        >
      >(`/content-manager/collection-types/${model}/${id}`, options),

    postContentManagerCollectionTypesModelIdActionsPublish: (
      model: string,
      id: string,
      data: Types["contentManager"]["postContentManagerCollectionTypesModelIdActionsPublish"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerCollectionTypesModelIdActionsPublish"]["output"]
        >
      >(
        `/content-manager/collection-types/${model}/${id}/actions/publish`,
        data,
        options
      ),

    postContentManagerCollectionTypesModelIdActionsUnpublish: (
      model: string,
      id: string,
      data: Types["contentManager"]["postContentManagerCollectionTypesModelIdActionsUnpublish"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerCollectionTypesModelIdActionsUnpublish"]["output"]
        >
      >(
        `/content-manager/collection-types/${model}/${id}/actions/unpublish`,
        data,
        options
      ),

    postContentManagerCollectionTypesModelActionsBulkDelete: (
      model: string,
      data: Types["contentManager"]["postContentManagerCollectionTypesModelActionsBulkDelete"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["contentManager"]["postContentManagerCollectionTypesModelActionsBulkDelete"]["output"]
        >
      >(
        `/content-manager/collection-types/${model}/actions/bulkDelete`,
        data,
        options
      ),

    getContentManagerCollectionTypesModelIdActionsNumberOfDraftRelations: (
      model: string,
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["contentManager"]["getContentManagerCollectionTypesModelIdActionsNumberOfDraftRelations"]["output"]
        >
      >(
        `/content-manager/collection-types/${model}/${id}/actions/numberOfDraftRelations`,
        options
      ),
  };

  analysis = {
    postApiAnalysisProcess: (
      data: Types["analysis"]["postApiAnalysisProcess"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["analysis"]["postApiAnalysisProcess"]["output"]>
      >(`/api/analysis/process`, data, options),

    getApiAnalysisScripts: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["analysis"]["getApiAnalysisScripts"]["output"]>
      >(`/api/analysis/scripts`, options),
  };

  analysisResult = {
    getApiAnalysisResults: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["analysisResult"]["getApiAnalysisResults"]["output"]
        >
      >(`/api/analysis-results`, options),

    getApiAnalysisResultsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["analysisResult"]["getApiAnalysisResultsId"]["output"]
        >
      >(`/api/analysis-results/${id}`, options),

    postApiAnalysisResults: (
      data: Types["analysisResult"]["postApiAnalysisResults"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["analysisResult"]["postApiAnalysisResults"]["output"]
        >
      >(`/api/analysis-results`, data, options),

    putApiAnalysisResultsId: (
      id: string,
      data: Types["analysisResult"]["putApiAnalysisResultsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["analysisResult"]["putApiAnalysisResultsId"]["output"]
        >
      >(`/api/analysis-results/${id}`, data, options),

    deleteApiAnalysisResultsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["analysisResult"]["deleteApiAnalysisResultsId"]["output"]
        >
      >(`/api/analysis-results/${id}`, options),
  };

  birdTrack = {
    getApiBirdTracks: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["birdTrack"]["getApiBirdTracks"]["output"]>
      >(`/api/bird-tracks`, options),

    getApiBirdTracksId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["birdTrack"]["getApiBirdTracksId"]["output"]>
      >(`/api/bird-tracks/${id}`, options),

    postApiBirdTracks: (
      data: Types["birdTrack"]["postApiBirdTracks"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["birdTrack"]["postApiBirdTracks"]["output"]>
      >(`/api/bird-tracks`, data, options),

    putApiBirdTracksId: (
      id: string,
      data: Types["birdTrack"]["putApiBirdTracksId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["birdTrack"]["putApiBirdTracksId"]["output"]>
      >(`/api/bird-tracks/${id}`, data, options),

    deleteApiBirdTracksId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["birdTrack"]["deleteApiBirdTracksId"]["output"]>
      >(`/api/bird-tracks/${id}`, options),

    postApiBirdTracksIdLocalizations: (
      id: string,
      data: Types["birdTrack"]["postApiBirdTracksIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["birdTrack"]["postApiBirdTracksIdLocalizations"]["output"]
        >
      >(`/api/bird-tracks/${id}/localizations`, data, options),

    postApiBirdTracksUploadMany: (
      data: Types["birdTrack"]["postApiBirdTracksUploadMany"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["birdTrack"]["postApiBirdTracksUploadMany"]["output"]
        >
      >(`/api/bird-tracks/uploadMany`, data, options),
  };

  classifiers = {
    postApiClassifiersRandomForest: (
      data: Types["classifiers"]["postApiClassifiersRandomForest"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["classifiers"]["postApiClassifiersRandomForest"]["output"]
        >
      >(`/api/classifiers/randomForest`, data, options),
  };

  eeData = {
    postApiEeDataExtract: (
      data: Types["eeData"]["postApiEeDataExtract"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["eeData"]["postApiEeDataExtract"]["output"]>
      >(`/api/ee-data/extract`, data, options),

    getApiEeDataScripts: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["eeData"]["getApiEeDataScripts"]["output"]>
      >(`/api/ee-data/scripts`, options),
  };

  generatedTrack = {
    getApiGeneratedTracks: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["generatedTrack"]["getApiGeneratedTracks"]["output"]
        >
      >(`/api/generated-tracks`, options),

    getApiGeneratedTracksId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["generatedTrack"]["getApiGeneratedTracksId"]["output"]
        >
      >(`/api/generated-tracks/${id}`, options),

    postApiGeneratedTracks: (
      data: Types["generatedTrack"]["postApiGeneratedTracks"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["generatedTrack"]["postApiGeneratedTracks"]["output"]
        >
      >(`/api/generated-tracks`, data, options),

    putApiGeneratedTracksId: (
      id: string,
      data: Types["generatedTrack"]["putApiGeneratedTracksId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["generatedTrack"]["putApiGeneratedTracksId"]["output"]
        >
      >(`/api/generated-tracks/${id}`, data, options),

    deleteApiGeneratedTracksId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["generatedTrack"]["deleteApiGeneratedTracksId"]["output"]
        >
      >(`/api/generated-tracks/${id}`, options),
  };

  habitatArea = {
    getApiHabitatAreas: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["habitatArea"]["getApiHabitatAreas"]["output"]>
      >(`/api/habitat-areas`, options),

    getApiHabitatAreasId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["habitatArea"]["getApiHabitatAreasId"]["output"]>
      >(`/api/habitat-areas/${id}`, options),

    postApiHabitatAreas: (
      data: Types["habitatArea"]["postApiHabitatAreas"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["habitatArea"]["postApiHabitatAreas"]["output"]>
      >(`/api/habitat-areas`, data, options),

    putApiHabitatAreasId: (
      id: string,
      data: Types["habitatArea"]["putApiHabitatAreasId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["habitatArea"]["putApiHabitatAreasId"]["output"]>
      >(`/api/habitat-areas/${id}`, data, options),

    deleteApiHabitatAreasId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["habitatArea"]["deleteApiHabitatAreasId"]["output"]>
      >(`/api/habitat-areas/${id}`, options),

    postApiHabitatAreasIdLocalizations: (
      id: string,
      data: Types["habitatArea"]["postApiHabitatAreasIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["habitatArea"]["postApiHabitatAreasIdLocalizations"]["output"]
        >
      >(`/api/habitat-areas/${id}/localizations`, data, options),
  };

  habitatAreaPopuation = {
    getApiHabitatAreaPopuations: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["habitatAreaPopuation"]["getApiHabitatAreaPopuations"]["output"]
        >
      >(`/api/habitat-area-popuations`, options),

    getApiHabitatAreaPopuationsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["habitatAreaPopuation"]["getApiHabitatAreaPopuationsId"]["output"]
        >
      >(`/api/habitat-area-popuations/${id}`, options),

    postApiHabitatAreaPopuations: (
      data: Types["habitatAreaPopuation"]["postApiHabitatAreaPopuations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["habitatAreaPopuation"]["postApiHabitatAreaPopuations"]["output"]
        >
      >(`/api/habitat-area-popuations`, data, options),

    putApiHabitatAreaPopuationsId: (
      id: string,
      data: Types["habitatAreaPopuation"]["putApiHabitatAreaPopuationsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["habitatAreaPopuation"]["putApiHabitatAreaPopuationsId"]["output"]
        >
      >(`/api/habitat-area-popuations/${id}`, data, options),

    deleteApiHabitatAreaPopuationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["habitatAreaPopuation"]["deleteApiHabitatAreaPopuationsId"]["output"]
        >
      >(`/api/habitat-area-popuations/${id}`, options),
  };

  habitatAreaPopulation = {
    getApiHabitatAreaPopulations: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["habitatAreaPopulation"]["getApiHabitatAreaPopulations"]["output"]
        >
      >(`/api/habitat-area-populations`, options),

    getApiHabitatAreaPopulationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["habitatAreaPopulation"]["getApiHabitatAreaPopulationsId"]["output"]
        >
      >(`/api/habitat-area-populations/${id}`, options),

    postApiHabitatAreaPopulations: (
      data: Types["habitatAreaPopulation"]["postApiHabitatAreaPopulations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["habitatAreaPopulation"]["postApiHabitatAreaPopulations"]["output"]
        >
      >(`/api/habitat-area-populations`, data, options),

    putApiHabitatAreaPopulationsId: (
      id: string,
      data: Types["habitatAreaPopulation"]["putApiHabitatAreaPopulationsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["habitatAreaPopulation"]["putApiHabitatAreaPopulationsId"]["output"]
        >
      >(`/api/habitat-area-populations/${id}`, data, options),

    deleteApiHabitatAreaPopulationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["habitatAreaPopulation"]["deleteApiHabitatAreaPopulationsId"]["output"]
        >
      >(`/api/habitat-area-populations/${id}`, options),
  };

  mapMigrationTrack = {
    getApiMapMigrationTracks: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["mapMigrationTrack"]["getApiMapMigrationTracks"]["output"]
        >
      >(`/api/map-migration-tracks`, options),

    getApiMapMigrationTracksId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["mapMigrationTrack"]["getApiMapMigrationTracksId"]["output"]
        >
      >(`/api/map-migration-tracks/${id}`, options),

    postApiMapMigrationTracks: (
      data: Types["mapMigrationTrack"]["postApiMapMigrationTracks"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["mapMigrationTrack"]["postApiMapMigrationTracks"]["output"]
        >
      >(`/api/map-migration-tracks`, data, options),

    putApiMapMigrationTracksId: (
      id: string,
      data: Types["mapMigrationTrack"]["putApiMapMigrationTracksId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["mapMigrationTrack"]["putApiMapMigrationTracksId"]["output"]
        >
      >(`/api/map-migration-tracks/${id}`, data, options),

    deleteApiMapMigrationTracksId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["mapMigrationTrack"]["deleteApiMapMigrationTracksId"]["output"]
        >
      >(`/api/map-migration-tracks/${id}`, options),
  };

  mapVulnerabilityTracksConfigCalculation = {
    getApiMapVulnerabilityTracksConfigCalculations: (
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["mapVulnerabilityTracksConfigCalculation"]["getApiMapVulnerabilityTracksConfigCalculations"]["output"]
        >
      >(`/api/map-vulnerability-tracks-config-calculations`, options),

    getApiMapVulnerabilityTracksConfigCalculationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["mapVulnerabilityTracksConfigCalculation"]["getApiMapVulnerabilityTracksConfigCalculationsId"]["output"]
        >
      >(`/api/map-vulnerability-tracks-config-calculations/${id}`, options),

    postApiMapVulnerabilityTracksConfigCalculations: (
      data: Types["mapVulnerabilityTracksConfigCalculation"]["postApiMapVulnerabilityTracksConfigCalculations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["mapVulnerabilityTracksConfigCalculation"]["postApiMapVulnerabilityTracksConfigCalculations"]["output"]
        >
      >(`/api/map-vulnerability-tracks-config-calculations`, data, options),

    putApiMapVulnerabilityTracksConfigCalculationsId: (
      id: string,
      data: Types["mapVulnerabilityTracksConfigCalculation"]["putApiMapVulnerabilityTracksConfigCalculationsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["mapVulnerabilityTracksConfigCalculation"]["putApiMapVulnerabilityTracksConfigCalculationsId"]["output"]
        >
      >(
        `/api/map-vulnerability-tracks-config-calculations/${id}`,
        data,
        options
      ),

    deleteApiMapVulnerabilityTracksConfigCalculationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["mapVulnerabilityTracksConfigCalculation"]["deleteApiMapVulnerabilityTracksConfigCalculationsId"]["output"]
        >
      >(`/api/map-vulnerability-tracks-config-calculations/${id}`, options),
  };

  migrationsTracksInput = {
    getApiMigrationsTracksInputs: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["migrationsTracksInput"]["getApiMigrationsTracksInputs"]["output"]
        >
      >(`/api/migrations-tracks-inputs`, options),

    getApiMigrationsTracksInputsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["migrationsTracksInput"]["getApiMigrationsTracksInputsId"]["output"]
        >
      >(`/api/migrations-tracks-inputs/${id}`, options),

    postApiMigrationsTracksInputs: (
      data: Types["migrationsTracksInput"]["postApiMigrationsTracksInputs"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["migrationsTracksInput"]["postApiMigrationsTracksInputs"]["output"]
        >
      >(`/api/migrations-tracks-inputs`, data, options),

    putApiMigrationsTracksInputsId: (
      id: string,
      data: Types["migrationsTracksInput"]["putApiMigrationsTracksInputsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["migrationsTracksInput"]["putApiMigrationsTracksInputsId"]["output"]
        >
      >(`/api/migrations-tracks-inputs/${id}`, data, options),

    deleteApiMigrationsTracksInputsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["migrationsTracksInput"]["deleteApiMigrationsTracksInputsId"]["output"]
        >
      >(`/api/migrations-tracks-inputs/${id}`, options),
  };

  migration = {
    postApiMigrationGenerateTracks: (
      data: Types["migration"]["postApiMigrationGenerateTracks"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["migration"]["postApiMigrationGenerateTracks"]["output"]
        >
      >(`/api/migration/generate-tracks`, data, options),
  };

  result = {
    getApiResultDownloadResultId: (
      resultId: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["result"]["getApiResultDownloadResultId"]["output"]>
      >(`/api/result/download/${resultId}`, options),

    getApiResultLoadingResultId: (
      resultId: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["result"]["getApiResultLoadingResultId"]["output"]>
      >(`/api/result/loading/${resultId}`, options),

    getApiResultLogsResultId: (
      resultId: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["result"]["getApiResultLogsResultId"]["output"]>
      >(`/api/result/logs/${resultId}`, options),

    getApiResultMy: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["result"]["getApiResultMy"]["output"]>
      >(`/api/result/my`, options),

    getApiResults: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["result"]["getApiResults"]["output"]>
      >(`/api/results`, options),

    getApiResultsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["result"]["getApiResultsId"]["output"]>
      >(`/api/results/${id}`, options),

    postApiResults: (
      data: Types["result"]["postApiResults"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["result"]["postApiResults"]["output"]>
      >(`/api/results`, data, options),

    putApiResultsId: (
      id: string,
      data: Types["result"]["putApiResultsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["result"]["putApiResultsId"]["output"]>
      >(`/api/results/${id}`, data, options),

    deleteApiResultsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["result"]["deleteApiResultsId"]["output"]>
      >(`/api/results/${id}`, options),
  };

  sensitiveAreaSource = {
    getApiSensitiveAreaSources: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["sensitiveAreaSource"]["getApiSensitiveAreaSources"]["output"]
        >
      >(`/api/sensitive-area-sources`, options),

    getApiSensitiveAreaSourcesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["sensitiveAreaSource"]["getApiSensitiveAreaSourcesId"]["output"]
        >
      >(`/api/sensitive-area-sources/${id}`, options),

    postApiSensitiveAreaSources: (
      data: Types["sensitiveAreaSource"]["postApiSensitiveAreaSources"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["sensitiveAreaSource"]["postApiSensitiveAreaSources"]["output"]
        >
      >(`/api/sensitive-area-sources`, data, options),

    putApiSensitiveAreaSourcesId: (
      id: string,
      data: Types["sensitiveAreaSource"]["putApiSensitiveAreaSourcesId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["sensitiveAreaSource"]["putApiSensitiveAreaSourcesId"]["output"]
        >
      >(`/api/sensitive-area-sources/${id}`, data, options),

    deleteApiSensitiveAreaSourcesId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["sensitiveAreaSource"]["deleteApiSensitiveAreaSourcesId"]["output"]
        >
      >(`/api/sensitive-area-sources/${id}`, options),
  };

  sensitiveArea = {
    getApiSensitiveAreas: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["sensitiveArea"]["getApiSensitiveAreas"]["output"]>
      >(`/api/sensitive-areas`, options),

    getApiSensitiveAreasId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["sensitiveArea"]["getApiSensitiveAreasId"]["output"]
        >
      >(`/api/sensitive-areas/${id}`, options),

    postApiSensitiveAreas: (
      data: Types["sensitiveArea"]["postApiSensitiveAreas"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["sensitiveArea"]["postApiSensitiveAreas"]["output"]>
      >(`/api/sensitive-areas`, data, options),

    putApiSensitiveAreasId: (
      id: string,
      data: Types["sensitiveArea"]["putApiSensitiveAreasId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["sensitiveArea"]["putApiSensitiveAreasId"]["output"]
        >
      >(`/api/sensitive-areas/${id}`, data, options),

    deleteApiSensitiveAreasId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["sensitiveArea"]["deleteApiSensitiveAreasId"]["output"]
        >
      >(`/api/sensitive-areas/${id}`, options),

    postApiSensitiveAreasIdLocalizations: (
      id: string,
      data: Types["sensitiveArea"]["postApiSensitiveAreasIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["sensitiveArea"]["postApiSensitiveAreasIdLocalizations"]["output"]
        >
      >(`/api/sensitive-areas/${id}/localizations`, data, options),
  };

  spatialGrid = {
    getApiSpatialGrids: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["spatialGrid"]["getApiSpatialGrids"]["output"]>
      >(`/api/spatial-grids`, options),

    getApiSpatialGridsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["spatialGrid"]["getApiSpatialGridsId"]["output"]>
      >(`/api/spatial-grids/${id}`, options),

    postApiSpatialGrids: (
      data: Types["spatialGrid"]["postApiSpatialGrids"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["spatialGrid"]["postApiSpatialGrids"]["output"]>
      >(`/api/spatial-grids`, data, options),

    putApiSpatialGridsId: (
      id: string,
      data: Types["spatialGrid"]["putApiSpatialGridsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["spatialGrid"]["putApiSpatialGridsId"]["output"]>
      >(`/api/spatial-grids/${id}`, data, options),

    deleteApiSpatialGridsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["spatialGrid"]["deleteApiSpatialGridsId"]["output"]>
      >(`/api/spatial-grids/${id}`, options),

    postApiSpatialGridsIdLocalizations: (
      id: string,
      data: Types["spatialGrid"]["postApiSpatialGridsIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["spatialGrid"]["postApiSpatialGridsIdLocalizations"]["output"]
        >
      >(`/api/spatial-grids/${id}/localizations`, data, options),
  };

  spatialGridCell = {
    getApiSpatialGridCells: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["spatialGridCell"]["getApiSpatialGridCells"]["output"]
        >
      >(`/api/spatial-grid-cells`, options),

    getApiSpatialGridCellsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["spatialGridCell"]["getApiSpatialGridCellsId"]["output"]
        >
      >(`/api/spatial-grid-cells/${id}`, options),

    postApiSpatialGridCells: (
      data: Types["spatialGridCell"]["postApiSpatialGridCells"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["spatialGridCell"]["postApiSpatialGridCells"]["output"]
        >
      >(`/api/spatial-grid-cells`, data, options),

    putApiSpatialGridCellsId: (
      id: string,
      data: Types["spatialGridCell"]["putApiSpatialGridCellsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["spatialGridCell"]["putApiSpatialGridCellsId"]["output"]
        >
      >(`/api/spatial-grid-cells/${id}`, data, options),

    deleteApiSpatialGridCellsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["spatialGridCell"]["deleteApiSpatialGridCellsId"]["output"]
        >
      >(`/api/spatial-grid-cells/${id}`, options),
  };

  spatialServices = {
    postApiSpatialServicesGeneralizeAreaPoints: (
      data: Types["spatialServices"]["postApiSpatialServicesGeneralizeAreaPoints"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["spatialServices"]["postApiSpatialServicesGeneralizeAreaPoints"]["output"]
        >
      >(`/api/spatial-services/generalize-area-points`, data, options),

    postApiSpatialServicesFindBuffersDistances: (
      data: Types["spatialServices"]["postApiSpatialServicesFindBuffersDistances"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["spatialServices"]["postApiSpatialServicesFindBuffersDistances"]["output"]
        >
      >(`/api/spatial-services/find-buffers-distances`, data, options),
  };

  species = {
    getApiSpeciesMany: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["species"]["getApiSpeciesMany"]["output"]>
      >(`/api/species-many`, options),

    getApiSpeciesManyId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["species"]["getApiSpeciesManyId"]["output"]>
      >(`/api/species-many/${id}`, options),

    postApiSpeciesMany: (
      data: Types["species"]["postApiSpeciesMany"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["species"]["postApiSpeciesMany"]["output"]>
      >(`/api/species-many`, data, options),

    putApiSpeciesManyId: (
      id: string,
      data: Types["species"]["putApiSpeciesManyId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["species"]["putApiSpeciesManyId"]["output"]>
      >(`/api/species-many/${id}`, data, options),

    deleteApiSpeciesManyId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["species"]["deleteApiSpeciesManyId"]["output"]>
      >(`/api/species-many/${id}`, options),

    postApiSpeciesManyIdLocalizations: (
      id: string,
      data: Types["species"]["postApiSpeciesManyIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["species"]["postApiSpeciesManyIdLocalizations"]["output"]
        >
      >(`/api/species-many/${id}/localizations`, data, options),
  };

  spatialGridDistrict = {
    getApiSpatialGridDistricts: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["spatialGridDistrict"]["getApiSpatialGridDistricts"]["output"]
        >
      >(`/api/spatial-grid-districts`, options),

    getApiSpatialGridDistrictsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["spatialGridDistrict"]["getApiSpatialGridDistrictsId"]["output"]
        >
      >(`/api/spatial-grid-districts/${id}`, options),

    postApiSpatialGridDistricts: (
      data: Types["spatialGridDistrict"]["postApiSpatialGridDistricts"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["spatialGridDistrict"]["postApiSpatialGridDistricts"]["output"]
        >
      >(`/api/spatial-grid-districts`, data, options),

    putApiSpatialGridDistrictsId: (
      id: string,
      data: Types["spatialGridDistrict"]["putApiSpatialGridDistrictsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["spatialGridDistrict"]["putApiSpatialGridDistrictsId"]["output"]
        >
      >(`/api/spatial-grid-districts/${id}`, data, options),

    deleteApiSpatialGridDistrictsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["spatialGridDistrict"]["deleteApiSpatialGridDistrictsId"]["output"]
        >
      >(`/api/spatial-grid-districts/${id}`, options),

    postApiSpatialGridDistrictsIdLocalizations: (
      id: string,
      data: Types["spatialGridDistrict"]["postApiSpatialGridDistrictsIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["spatialGridDistrict"]["postApiSpatialGridDistrictsIdLocalizations"]["output"]
        >
      >(`/api/spatial-grid-districts/${id}/localizations`, data, options),
  };

  speciesCellPopulation = {
    getApiSpeciesCellPopulations: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["speciesCellPopulation"]["getApiSpeciesCellPopulations"]["output"]
        >
      >(`/api/species-cell-populations`, options),

    getApiSpeciesCellPopulationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["speciesCellPopulation"]["getApiSpeciesCellPopulationsId"]["output"]
        >
      >(`/api/species-cell-populations/${id}`, options),

    postApiSpeciesCellPopulations: (
      data: Types["speciesCellPopulation"]["postApiSpeciesCellPopulations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["speciesCellPopulation"]["postApiSpeciesCellPopulations"]["output"]
        >
      >(`/api/species-cell-populations`, data, options),

    putApiSpeciesCellPopulationsId: (
      id: string,
      data: Types["speciesCellPopulation"]["putApiSpeciesCellPopulationsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["speciesCellPopulation"]["putApiSpeciesCellPopulationsId"]["output"]
        >
      >(`/api/species-cell-populations/${id}`, data, options),

    deleteApiSpeciesCellPopulationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["speciesCellPopulation"]["deleteApiSpeciesCellPopulationsId"]["output"]
        >
      >(`/api/species-cell-populations/${id}`, options),
  };

  vulnerabilityInfo = {
    getApiVulnerabilityInfos: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["vulnerabilityInfo"]["getApiVulnerabilityInfos"]["output"]
        >
      >(`/api/vulnerability-infos`, options),

    getApiVulnerabilityInfosId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["vulnerabilityInfo"]["getApiVulnerabilityInfosId"]["output"]
        >
      >(`/api/vulnerability-infos/${id}`, options),

    postApiVulnerabilityInfos: (
      data: Types["vulnerabilityInfo"]["postApiVulnerabilityInfos"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["vulnerabilityInfo"]["postApiVulnerabilityInfos"]["output"]
        >
      >(`/api/vulnerability-infos`, data, options),

    putApiVulnerabilityInfosId: (
      id: string,
      data: Types["vulnerabilityInfo"]["putApiVulnerabilityInfosId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["vulnerabilityInfo"]["putApiVulnerabilityInfosId"]["output"]
        >
      >(`/api/vulnerability-infos/${id}`, data, options),

    deleteApiVulnerabilityInfosId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["vulnerabilityInfo"]["deleteApiVulnerabilityInfosId"]["output"]
        >
      >(`/api/vulnerability-infos/${id}`, options),
  };

  vulnerabilityResult = {
    getApiVulnerabilityResults: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["vulnerabilityResult"]["getApiVulnerabilityResults"]["output"]
        >
      >(`/api/vulnerability-results`, options),

    getApiVulnerabilityResultsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["vulnerabilityResult"]["getApiVulnerabilityResultsId"]["output"]
        >
      >(`/api/vulnerability-results/${id}`, options),

    postApiVulnerabilityResults: (
      data: Types["vulnerabilityResult"]["postApiVulnerabilityResults"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["vulnerabilityResult"]["postApiVulnerabilityResults"]["output"]
        >
      >(`/api/vulnerability-results`, data, options),

    putApiVulnerabilityResultsId: (
      id: string,
      data: Types["vulnerabilityResult"]["putApiVulnerabilityResultsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["vulnerabilityResult"]["putApiVulnerabilityResultsId"]["output"]
        >
      >(`/api/vulnerability-results/${id}`, data, options),

    deleteApiVulnerabilityResultsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["vulnerabilityResult"]["deleteApiVulnerabilityResultsId"]["output"]
        >
      >(`/api/vulnerability-results/${id}`, options),
  };

  windfarm = {
    getApiWindfarms: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["windfarm"]["getApiWindfarms"]["output"]>
      >(`/api/windfarms`, options),

    getApiWindfarmsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["windfarm"]["getApiWindfarmsId"]["output"]>
      >(`/api/windfarms/${id}`, options),

    postApiWindfarms: (
      data: Types["windfarm"]["postApiWindfarms"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["windfarm"]["postApiWindfarms"]["output"]>
      >(`/api/windfarms`, data, options),

    putApiWindfarmsId: (
      id: string,
      data: Types["windfarm"]["putApiWindfarmsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["windfarm"]["putApiWindfarmsId"]["output"]>
      >(`/api/windfarms/${id}`, data, options),

    deleteApiWindfarmsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["windfarm"]["deleteApiWindfarmsId"]["output"]>
      >(`/api/windfarms/${id}`, options),
  };

  usersPermissions = {
    getApiConnect: (arg0: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["usersPermissions"]["getApiConnect"]["output"]>
      >(`/api/connect/${arg0}`, options),

    postApiAuthLocal: (
      data: Types["usersPermissions"]["postApiAuthLocal"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["usersPermissions"]["postApiAuthLocal"]["output"]>
      >(`/api/auth/local`, data, options),

    postApiAuthLocalRegister: (
      data: Types["usersPermissions"]["postApiAuthLocalRegister"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["usersPermissions"]["postApiAuthLocalRegister"]["output"]
        >
      >(`/api/auth/local/register`, data, options),

    getApiAuthProviderCallback: (
      provider: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getApiAuthProviderCallback"]["output"]
        >
      >(`/api/auth/${provider}/callback`, options),

    postApiAuthForgotPassword: (
      data: Types["usersPermissions"]["postApiAuthForgotPassword"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["usersPermissions"]["postApiAuthForgotPassword"]["output"]
        >
      >(`/api/auth/forgot-password`, data, options),

    postApiAuthResetPassword: (
      data: Types["usersPermissions"]["postApiAuthResetPassword"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["usersPermissions"]["postApiAuthResetPassword"]["output"]
        >
      >(`/api/auth/reset-password`, data, options),

    getApiAuthEmailConfirmation: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getApiAuthEmailConfirmation"]["output"]
        >
      >(`/api/auth/email-confirmation`, options),

    postApiAuthSendEmailConfirmation: (
      data: Types["usersPermissions"]["postApiAuthSendEmailConfirmation"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["usersPermissions"]["postApiAuthSendEmailConfirmation"]["output"]
        >
      >(`/api/auth/send-email-confirmation`, data, options),

    postApiAuthChangePassword: (
      data: Types["usersPermissions"]["postApiAuthChangePassword"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["usersPermissions"]["postApiAuthChangePassword"]["output"]
        >
      >(`/api/auth/change-password`, data, options),

    getApiUsersCount: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["usersPermissions"]["getApiUsersCount"]["output"]>
      >(`/api/users/count`, options),

    getApiUsers: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["usersPermissions"]["getApiUsers"]["output"]>
      >(`/api/users`, options),

    getApiUsersMe: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["usersPermissions"]["getApiUsersMe"]["output"]>
      >(`/api/users/me`, options),

    getApiUsersId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["usersPermissions"]["getApiUsersId"]["output"]>
      >(`/api/users/${id}`, options),

    postApiUsers: (
      data: Types["usersPermissions"]["postApiUsers"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["usersPermissions"]["postApiUsers"]["output"]>
      >(`/api/users`, data, options),

    putApiUsersId: (
      id: string,
      data: Types["usersPermissions"]["putApiUsersId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["usersPermissions"]["putApiUsersId"]["output"]>
      >(`/api/users/${id}`, data, options),

    deleteApiUsersId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["usersPermissions"]["deleteApiUsersId"]["output"]>
      >(`/api/users/${id}`, options),

    getApiUsersPermissionsRolesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getApiUsersPermissionsRolesId"]["output"]
        >
      >(`/api/users-permissions/roles/${id}`, options),

    getApiUsersPermissionsRoles: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getApiUsersPermissionsRoles"]["output"]
        >
      >(`/api/users-permissions/roles`, options),

    postApiUsersPermissionsRoles: (
      data: Types["usersPermissions"]["postApiUsersPermissionsRoles"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["usersPermissions"]["postApiUsersPermissionsRoles"]["output"]
        >
      >(`/api/users-permissions/roles`, data, options),

    putApiUsersPermissionsRolesRole: (
      role: string,
      data: Types["usersPermissions"]["putApiUsersPermissionsRolesRole"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["usersPermissions"]["putApiUsersPermissionsRolesRole"]["output"]
        >
      >(`/api/users-permissions/roles/${role}`, data, options),

    deleteApiUsersPermissionsRolesRole: (
      role: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["usersPermissions"]["deleteApiUsersPermissionsRolesRole"]["output"]
        >
      >(`/api/users-permissions/roles/${role}`, options),

    getApiUsersPermissionsPermissions: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getApiUsersPermissionsPermissions"]["output"]
        >
      >(`/api/users-permissions/permissions`, options),

    getUsersPermissionsRolesId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsRolesId"]["output"]
        >
      >(`/users-permissions/roles/${id}`, options),

    getUsersPermissionsRoles: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsRoles"]["output"]
        >
      >(`/users-permissions/roles`, options),

    postUsersPermissionsRoles: (
      data: Types["usersPermissions"]["postUsersPermissionsRoles"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["usersPermissions"]["postUsersPermissionsRoles"]["output"]
        >
      >(`/users-permissions/roles`, data, options),

    putUsersPermissionsRolesRole: (
      role: string,
      data: Types["usersPermissions"]["putUsersPermissionsRolesRole"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["usersPermissions"]["putUsersPermissionsRolesRole"]["output"]
        >
      >(`/users-permissions/roles/${role}`, data, options),

    deleteUsersPermissionsRolesRole: (
      role: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["usersPermissions"]["deleteUsersPermissionsRolesRole"]["output"]
        >
      >(`/users-permissions/roles/${role}`, options),

    getUsersPermissionsEmailTemplates: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsEmailTemplates"]["output"]
        >
      >(`/users-permissions/email-templates`, options),

    putUsersPermissionsEmailTemplates: (
      data: Types["usersPermissions"]["putUsersPermissionsEmailTemplates"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["usersPermissions"]["putUsersPermissionsEmailTemplates"]["output"]
        >
      >(`/users-permissions/email-templates`, data, options),

    getUsersPermissionsAdvanced: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsAdvanced"]["output"]
        >
      >(`/users-permissions/advanced`, options),

    putUsersPermissionsAdvanced: (
      data: Types["usersPermissions"]["putUsersPermissionsAdvanced"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["usersPermissions"]["putUsersPermissionsAdvanced"]["output"]
        >
      >(`/users-permissions/advanced`, data, options),

    getUsersPermissionsProviders: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsProviders"]["output"]
        >
      >(`/users-permissions/providers`, options),

    putUsersPermissionsProviders: (
      data: Types["usersPermissions"]["putUsersPermissionsProviders"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["usersPermissions"]["putUsersPermissionsProviders"]["output"]
        >
      >(`/users-permissions/providers`, data, options),

    getUsersPermissionsPermissions: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsPermissions"]["output"]
        >
      >(`/users-permissions/permissions`, options),

    getUsersPermissionsPolicies: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsPolicies"]["output"]
        >
      >(`/users-permissions/policies`, options),

    getUsersPermissionsRoutes: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["usersPermissions"]["getUsersPermissionsRoutes"]["output"]
        >
      >(`/users-permissions/routes`, options),
  };

  map = {
    getApiMapHabitatAreas: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapHabitatAreas"]["output"]>
      >(`/api/map-habitat-areas`, options),

    getApiMapHabitatAreasId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapHabitatAreasId"]["output"]>
      >(`/api/map-habitat-areas/${id}`, options),

    postApiMapHabitatAreas: (
      data: Types["map"]["postApiMapHabitatAreas"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["map"]["postApiMapHabitatAreas"]["output"]>
      >(`/api/map-habitat-areas`, data, options),

    putApiMapHabitatAreasId: (
      id: string,
      data: Types["map"]["putApiMapHabitatAreasId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["map"]["putApiMapHabitatAreasId"]["output"]>
      >(`/api/map-habitat-areas/${id}`, data, options),

    deleteApiMapHabitatAreasId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["map"]["deleteApiMapHabitatAreasId"]["output"]>
      >(`/api/map-habitat-areas/${id}`, options),

    postApiMapHabitatAreasIdLocalizations: (
      id: string,
      data: Types["map"]["postApiMapHabitatAreasIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["map"]["postApiMapHabitatAreasIdLocalizations"]["output"]
        >
      >(`/api/map-habitat-areas/${id}/localizations`, data, options),

    getApiMapImportConfigs: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapImportConfigs"]["output"]>
      >(`/api/map-import-configs`, options),

    getApiMapImportConfigsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapImportConfigsId"]["output"]>
      >(`/api/map-import-configs/${id}`, options),

    postApiMapImportConfigs: (
      data: Types["map"]["postApiMapImportConfigs"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["map"]["postApiMapImportConfigs"]["output"]>
      >(`/api/map-import-configs`, data, options),

    putApiMapImportConfigsId: (
      id: string,
      data: Types["map"]["putApiMapImportConfigsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["map"]["putApiMapImportConfigsId"]["output"]>
      >(`/api/map-import-configs/${id}`, data, options),

    deleteApiMapImportConfigsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["map"]["deleteApiMapImportConfigsId"]["output"]>
      >(`/api/map-import-configs/${id}`, options),

    postApiMapImportConfigsIdLocalizations: (
      id: string,
      data: Types["map"]["postApiMapImportConfigsIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["map"]["postApiMapImportConfigsIdLocalizations"]["output"]
        >
      >(`/api/map-import-configs/${id}/localizations`, data, options),

    getApiMapSpatialGridCells: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpatialGridCells"]["output"]>
      >(`/api/map-spatial-grid-cells`, options),

    getApiMapSpatialGridCellsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpatialGridCellsId"]["output"]>
      >(`/api/map-spatial-grid-cells/${id}`, options),

    postApiMapSpatialGridCells: (
      data: Types["map"]["postApiMapSpatialGridCells"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["map"]["postApiMapSpatialGridCells"]["output"]>
      >(`/api/map-spatial-grid-cells`, data, options),

    putApiMapSpatialGridCellsId: (
      id: string,
      data: Types["map"]["putApiMapSpatialGridCellsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["map"]["putApiMapSpatialGridCellsId"]["output"]>
      >(`/api/map-spatial-grid-cells/${id}`, data, options),

    deleteApiMapSpatialGridCellsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["map"]["deleteApiMapSpatialGridCellsId"]["output"]>
      >(`/api/map-spatial-grid-cells/${id}`, options),

    getApiMapSpatialGridDistricts: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpatialGridDistricts"]["output"]>
      >(`/api/map-spatial-grid-districts`, options),

    getApiMapSpatialGridDistrictsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpatialGridDistrictsId"]["output"]>
      >(`/api/map-spatial-grid-districts/${id}`, options),

    postApiMapSpatialGridDistricts: (
      data: Types["map"]["postApiMapSpatialGridDistricts"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["map"]["postApiMapSpatialGridDistricts"]["output"]>
      >(`/api/map-spatial-grid-districts`, data, options),

    putApiMapSpatialGridDistrictsId: (
      id: string,
      data: Types["map"]["putApiMapSpatialGridDistrictsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["map"]["putApiMapSpatialGridDistrictsId"]["output"]>
      >(`/api/map-spatial-grid-districts/${id}`, data, options),

    deleteApiMapSpatialGridDistrictsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["map"]["deleteApiMapSpatialGridDistrictsId"]["output"]
        >
      >(`/api/map-spatial-grid-districts/${id}`, options),

    postApiMapSpatialGridDistrictsIdLocalizations: (
      id: string,
      data: Types["map"]["postApiMapSpatialGridDistrictsIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["map"]["postApiMapSpatialGridDistrictsIdLocalizations"]["output"]
        >
      >(`/api/map-spatial-grid-districts/${id}/localizations`, data, options),

    getApiMapSpatialGrids: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpatialGrids"]["output"]>
      >(`/api/map-spatial-grids`, options),

    getApiMapSpatialGridsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpatialGridsId"]["output"]>
      >(`/api/map-spatial-grids/${id}`, options),

    postApiMapSpatialGrids: (
      data: Types["map"]["postApiMapSpatialGrids"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["map"]["postApiMapSpatialGrids"]["output"]>
      >(`/api/map-spatial-grids`, data, options),

    putApiMapSpatialGridsId: (
      id: string,
      data: Types["map"]["putApiMapSpatialGridsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["map"]["putApiMapSpatialGridsId"]["output"]>
      >(`/api/map-spatial-grids/${id}`, data, options),

    deleteApiMapSpatialGridsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["map"]["deleteApiMapSpatialGridsId"]["output"]>
      >(`/api/map-spatial-grids/${id}`, options),

    postApiMapSpatialGridsIdLocalizations: (
      id: string,
      data: Types["map"]["postApiMapSpatialGridsIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["map"]["postApiMapSpatialGridsIdLocalizations"]["output"]
        >
      >(`/api/map-spatial-grids/${id}/localizations`, data, options),

    getApiMapSpeciesMigrations: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpeciesMigrations"]["output"]>
      >(`/api/map-species-migrations`, options),

    getApiMapSpeciesMigrationsId: (id: string, options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapSpeciesMigrationsId"]["output"]>
      >(`/api/map-species-migrations/${id}`, options),

    postApiMapSpeciesMigrations: (
      data: Types["map"]["postApiMapSpeciesMigrations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["map"]["postApiMapSpeciesMigrations"]["output"]>
      >(`/api/map-species-migrations`, data, options),

    putApiMapSpeciesMigrationsId: (
      id: string,
      data: Types["map"]["putApiMapSpeciesMigrationsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["map"]["putApiMapSpeciesMigrationsId"]["output"]>
      >(`/api/map-species-migrations/${id}`, data, options),

    deleteApiMapSpeciesMigrationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<Types["map"]["deleteApiMapSpeciesMigrationsId"]["output"]>
      >(`/api/map-species-migrations/${id}`, options),

    postApiMapSpeciesMigrationsIdLocalizations: (
      id: string,
      data: Types["map"]["postApiMapSpeciesMigrationsIdLocalizations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["map"]["postApiMapSpeciesMigrationsIdLocalizations"]["output"]
        >
      >(`/api/map-species-migrations/${id}/localizations`, data, options),

    getApiMapVulnerabilityResults: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapVulnerabilityResults"]["output"]>
      >(`/api/map-vulnerability-results`, options),

    getApiMapVulnerabilityResultsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<Types["map"]["getApiMapVulnerabilityResultsId"]["output"]>
      >(`/api/map-vulnerability-results/${id}`, options),

    postApiMapVulnerabilityResults: (
      data: Types["map"]["postApiMapVulnerabilityResults"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<Types["map"]["postApiMapVulnerabilityResults"]["output"]>
      >(`/api/map-vulnerability-results`, data, options),

    putApiMapVulnerabilityResultsId: (
      id: string,
      data: Types["map"]["putApiMapVulnerabilityResultsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<Types["map"]["putApiMapVulnerabilityResultsId"]["output"]>
      >(`/api/map-vulnerability-results/${id}`, data, options),

    deleteApiMapVulnerabilityResultsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["map"]["deleteApiMapVulnerabilityResultsId"]["output"]
        >
      >(`/api/map-vulnerability-results/${id}`, options),

    getApiMapVulnereabilityCalculations: (options?: AxiosRequestConfig) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["map"]["getApiMapVulnereabilityCalculations"]["output"]
        >
      >(`/api/map-vulnereability-calculations`, options),

    getApiMapVulnereabilityCalculationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.get<
        any,
        AxiosResponse<
          Types["map"]["getApiMapVulnereabilityCalculationsId"]["output"]
        >
      >(`/api/map-vulnereability-calculations/${id}`, options),

    postApiMapVulnereabilityCalculations: (
      data: Types["map"]["postApiMapVulnereabilityCalculations"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.post<
        any,
        AxiosResponse<
          Types["map"]["postApiMapVulnereabilityCalculations"]["output"]
        >
      >(`/api/map-vulnereability-calculations`, data, options),

    putApiMapVulnereabilityCalculationsId: (
      id: string,
      data: Types["map"]["putApiMapVulnereabilityCalculationsId"]["input"],
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.put<
        any,
        AxiosResponse<
          Types["map"]["putApiMapVulnereabilityCalculationsId"]["output"]
        >
      >(`/api/map-vulnereability-calculations/${id}`, data, options),

    deleteApiMapVulnereabilityCalculationsId: (
      id: string,
      options?: AxiosRequestConfig
    ) =>
      this.axiosInstance.delete<
        any,
        AxiosResponse<
          Types["map"]["deleteApiMapVulnereabilityCalculationsId"]["output"]
        >
      >(`/api/map-vulnereability-calculations/${id}`, options),
  };

  constructor(instance: AxiosInstance = axios.create()) {
    this.axiosInstance = instance;
  }
}
const api = new Api();
export default api;
