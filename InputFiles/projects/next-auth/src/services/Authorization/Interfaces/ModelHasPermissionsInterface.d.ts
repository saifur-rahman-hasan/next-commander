interface ModelHasPermissionsCreateInterface {
  permission_ids?: string[];
  model_type?: string;
  model_id?: string;
}

interface ModelHasPermissionsDeleteInterface {
  id?: string;
  model_type?: ModelType;
}

interface ModelHasPermissionsReadInterface
  extends ModelHasPermissionsCreateInterface {
  id?: string;
}
